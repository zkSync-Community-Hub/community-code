import { Wallet, Provider } from 'zksync-ethers';
import * as ethers from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';

// load env file
import dotenv from 'dotenv';
dotenv.config();

// load the values into .env file after deploying an account
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const NEW_R1_OWNER_PUBLIC_KEY = process.env.NEW_R1_OWNER_PUBLIC_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

export default async function (hre: HardhatRuntimeEnvironment) {
  if (!ACCOUNT_ADDRESS || !NEW_R1_OWNER_PUBLIC_KEY || !DEPLOYER_PRIVATE_KEY) {
    throw new Error('Missing env variables');
  }

  // @ts-expect-error target config file which can be testnet or local
  const provider = new Provider(hre.network.config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact('Account');

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(ACCOUNT_ADDRESS, contractArtifact.abi, wallet);

  const tx = await contract.updateR1Owner(NEW_R1_OWNER_PUBLIC_KEY);
  await tx.wait();
  console.log('R1 Owner updated successfully');
  return;
}
