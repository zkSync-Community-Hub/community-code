// ANCHOR: min-script
import { utils, Wallet, Provider, EIP712Signer, types } from 'zksync-ethers';
import * as ethers from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import dotenv from 'dotenv';
dotenv.config();

// Put the address of your AA factory
const AA_FACTORY_ADDRESS = '<FACTORY_ADDRESS>'; //sepolia

export default async function (hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error target network in config file
  const provider = new Provider(hre.network.config.url);
  // Private key of the account used to deploy
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY!).connect(provider);

  const factoryArtifact = await hre.artifacts.readArtifact('AAFactory');

  const aaFactory = new ethers.Contract(AA_FACTORY_ADDRESS, factoryArtifact.abi, wallet);

  // The two owners of the multisig
  const owner1 = Wallet.createRandom();
  const owner2 = Wallet.createRandom();

  // For the simplicity of the tutorial, we will use zero hash as salt
  const salt = ethers.ZeroHash;
  const tx = await aaFactory.deployAccount(salt, owner1.address, owner2.address);

  await tx.wait();

  // Getting the address of the deployed contract account
  // Always use the JS utility methods
  const abiCoder = new ethers.AbiCoder();

  const multisigAddress = utils.create2Address(
    AA_FACTORY_ADDRESS,
    await aaFactory.aaBytecodeHash(),
    salt,
    abiCoder.encode(['address', 'address'], [owner1.address, owner2.address])
  );
  console.log(`Multisig account deployed on address ${multisigAddress}`);
  // ANCHOR_END: min-script

  // ANCHOR: send-funds
  console.log('Sending funds to multisig account');
  // Send funds to the multisig account we just deployed
  await (
    await wallet.sendTransaction({
      to: multisigAddress,
      // You can increase the amount of ETH sent to the multisig
      value: ethers.parseEther('0.008'),
      nonce: await wallet.getNonce(),
    })
  ).wait();

  let multisigBalance = await provider.getBalance(multisigAddress);

  console.log(`Multisig account balance is ${multisigBalance.toString()}`);
  // ANCHOR_END: send-funds

  // ANCHOR: create-deploy-tx
  // Transaction to deploy a new account using the multisig we just deployed
  let aaTx = await aaFactory.deployAccount.populateTransaction(
    salt,
    // These are accounts that will own the newly deployed account
    Wallet.createRandom().address,
    Wallet.createRandom().address
  );
  // ANCHOR_END: create-deploy-tx

  // ANCHOR: tx-gas
  const gasLimit = await provider.estimateGas({ ...aaTx, from: wallet.address });
  const gasPrice = await provider.getGasPrice();

  aaTx = {
    ...aaTx,
    // deploy a new account using the multisig
    from: multisigAddress,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(multisigAddress),
    type: 113,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: BigInt(0),
  };
  // ANCHOR_END: tx-gas

  // ANCHOR: sign-tx
  const signedTxHash = EIP712Signer.getSignedDigest(aaTx);

  // Sign the transaction with both owners
  const signature = ethers.concat([
    ethers.Signature.from(owner1.signingKey.sign(signedTxHash)).serialized,
    ethers.Signature.from(owner2.signingKey.sign(signedTxHash)).serialized,
  ]);

  aaTx.customData = {
    ...aaTx.customData,
    customSignature: signature,
  };
  // ANCHOR_END: sign-tx

  // ANCHOR: broadcast-tx
  console.log(`The multisig's nonce before the first tx is ${await provider.getTransactionCount(multisigAddress)}`);

  const sentTx = await provider.broadcastTransaction(types.Transaction.from(aaTx).serialized);
  console.log(`Transaction sent from multisig with hash ${sentTx.hash}`);

  await sentTx.wait();

  // Checking that the nonce for the account has increased
  console.log(`The multisig's nonce after the first tx is ${await provider.getTransactionCount(multisigAddress)}`);

  multisigBalance = await provider.getBalance(multisigAddress);

  console.log(`Multisig account balance is now ${multisigBalance.toString()}`);
  // ANCHOR_END: broadcast-tx
}
