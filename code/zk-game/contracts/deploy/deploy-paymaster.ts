import { Wallet, Provider } from 'zksync-ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
// load env file
import dotenv from 'dotenv';
import { parseEther } from 'ethers';
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export default async function (hre: HardhatRuntimeEnvironment) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = hre.network.config;
  const provider = new Provider(config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const owner = wallet.address;

  const artifact = await hre.deployer.loadArtifact('GeneralPaymaster');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [owner];
  const contract = await hre.deployer.deploy(artifact, constructorArguments);
  const address = await contract.getAddress();
  console.log('DEPLOYED PAYMASTER CONTRACT ADDRESS: ', address);

  await fundPaymaster(address, wallet);
}

async function fundPaymaster(toAddress: string, wallet: Wallet) {
  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: parseEther('1'),
  });

  await tx.wait();
}
