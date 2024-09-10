import { utils, Wallet, Provider, EIP712Signer, types } from 'zksync-ethers';
import * as ethers from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { deploy } from './deploy';

// load env file
import dotenv from 'dotenv';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';
dotenv.config();

// load the values into .env file
const RECEIVER_ACCOUNT = process.env.RECEIVER_ACCOUNT || '';
const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export default async function (hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error target network in config file which can be testnet or local
  const provider = new Provider(hre.network.config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);
  const { accountAddress: ACCOUNT_ADDRESS, owner } = await deploy(deployer, wallet);

  let accountBalance = await provider.getBalance(ACCOUNT_ADDRESS);
  console.log(`Account balance: ${accountBalance}`);

  let receiverBalance = await provider.getBalance(RECEIVER_ACCOUNT);
  console.log(`Receiver balance 2: ${receiverBalance}`);

  const transferAmount = '1';

  const ethTransferTx = {
    from: ACCOUNT_ADDRESS,
    to: RECEIVER_ACCOUNT, // account that will receive the ETH transfer
    chainId: (await provider.getNetwork()).chainId,
    nonce: await provider.getTransactionCount(ACCOUNT_ADDRESS),
    type: 113,
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
    } as types.Eip712Meta,
    value: ethers.parseEther(transferAmount),
    gasPrice: await provider.getGasPrice(),
    gasLimit: BigInt(20000000),
    data: '0x',
  };
  console.log(`ETH transfer tx 1: ${ethTransferTx}`);
  const signedTxHash = EIP712Signer.getSignedDigest(ethTransferTx);
  console.log(`Signed tx hash: ${signedTxHash}`);
  const signature = ethers.concat([ethers.Signature.from(owner.signingKey.sign(signedTxHash)).serialized]);

  console.log(`Signature: ${signature}`);
  ethTransferTx.customData = {
    ...ethTransferTx.customData,
    customSignature: signature,
  };

  // do the ETH transfer
  console.log('Sending ETH transfer from smart contract account');
  const sentTx = await provider.broadcastTransaction(types.Transaction.from(ethTransferTx).serialized);
  await sentTx.wait();
  console.log(`ETH transfer tx hash is ${sentTx.hash}`);

  console.log('Transfer completed!');

  accountBalance = await provider.getBalance(ACCOUNT_ADDRESS);
  console.log(`Account balance 2: ${accountBalance}`);

  receiverBalance = await provider.getBalance(RECEIVER_ACCOUNT);
  console.log(`Receiver balance 2: ${receiverBalance}`);
  return;
}
