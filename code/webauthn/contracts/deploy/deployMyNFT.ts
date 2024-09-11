import { Wallet, Provider } from 'zksync-ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

// load env file
import dotenv from 'dotenv';
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export default async function (hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error target config file which can be testnet or local
  const provider = new Provider(hre.network.config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact('MyNFT');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  console.log('CONTRACT ADDRESS: ', await contract.getAddress());

  const tx = await contract.mintZeek();
  await tx.wait();
  console.log('DONE MINTING: ');
}
