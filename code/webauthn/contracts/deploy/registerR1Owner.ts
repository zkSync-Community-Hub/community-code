import { Wallet, Provider, EIP712Signer, types, utils } from 'zksync-ethers';
import * as ethers from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';

// load env file
import dotenv from 'dotenv';
dotenv.config();

// load the values into .env file after deploying an account
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const NEW_R1_OWNER_PUBLIC_KEY = process.env.NEW_R1_OWNER_PUBLIC_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.ACCOUNT_PK;

export default async function (hre: HardhatRuntimeEnvironment) {
  if (!ACCOUNT_ADDRESS || !NEW_R1_OWNER_PUBLIC_KEY || !DEPLOYER_PRIVATE_KEY) {
    throw new Error('Missing env variables');
  }

  // @ts-expect-error target config file which can be testnet or local
  const provider = new Provider(hre.network.config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact('Account');
  const contract = new ethers.Contract(ACCOUNT_ADDRESS, contractArtifact.abi, provider);
  const data = contract.interface.encodeFunctionData('updateR1Owner', [NEW_R1_OWNER_PUBLIC_KEY]);
  const transferAmount = '0';

  const ethTransferTx = {
    from: ACCOUNT_ADDRESS,
    to: ACCOUNT_ADDRESS,
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(ACCOUNT_ADDRESS),
    type: 113,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: ethers.parseEther(transferAmount),
    gasPrice: await provider.getGasPrice(),
    gasLimit: BigInt(20000000),
    data,
  };
  console.log(`tx: ${ethTransferTx}`);
  const signedTxHash = EIP712Signer.getSignedDigest(ethTransferTx);
  console.log(`Signed tx hash: ${signedTxHash}`);
  const signature = ethers.concat([ethers.Signature.from(wallet.signingKey.sign(signedTxHash)).serialized]);

  console.log(`Signature: ${signature}`);
  ethTransferTx.customData = {
    ...ethTransferTx.customData,
    customSignature: signature,
  };

  // make the call
  console.log('Registering new R1 Owner');
  const sentTx = await provider.broadcastTransaction(types.Transaction.from(ethTransferTx).serialized);
  await sentTx.wait();
  console.log('Registration completed!');

  return;
}
