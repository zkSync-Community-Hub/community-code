// ANCHOR: min-script
import { EIP712Signer, types, utils } from 'zksync-ethers';
import { ethers } from 'hardhat';

// Put the address of your AA factory
const AA_FACTORY_ADDRESS = process.env.AA_FACTORY_ADDRESS ?? '<FACTORY_ADDRESS>';

async function main() {
  const [signer] = await ethers.getSigners();
  const aaFactory = await ethers.getContractAt('AAFactory', AA_FACTORY_ADDRESS, signer as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  console.log('AA factory address:', aaFactory.target);

  // The two owners of the multisig
  const owner1 = ethers.Wallet.createRandom();
  const owner2 = ethers.Wallet.createRandom();
  console.log(`Owner 1: ${owner1.address}`);
  console.log(`Owner 2: ${owner2.address}`);

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
  const [wallet] = await ethers.getSigners();
  await (
    await wallet.sendTransaction({
      to: multisigAddress,
      // You can increase the amount of ETH sent to the multisig
      value: ethers.parseEther('0.008'),
      nonce: await wallet.getNonce(),
    })
  ).wait();

  const provider = ethers.provider;
  let multisigBalance = await provider.getBalance(multisigAddress);

  console.log(`Multisig account balance is ${multisigBalance.toString()}`);
  // ANCHOR_END: send-funds

  // ANCHOR: create-deploy-tx
  // Transaction to deploy a new account using the multisig we just deployed
  let aaTx = await aaFactory.deployAccount.populateTransaction(
    salt,
    // These are accounts that will own the newly deployed account
    ethers.Wallet.createRandom().address,
    ethers.Wallet.createRandom().address
  );
  // ANCHOR_END: create-deploy-tx

  // ANCHOR: tx-gas
  const gasLimit = await provider.estimateGas({ ...aaTx, from: wallet.address });
  const gasPrice = (await provider.getFeeData()).gasPrice || undefined;

  aaTx = {
    ...aaTx,
    // deploy a new account using the multisig
    from: multisigAddress,
    gasLimit,
    gasPrice,
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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
