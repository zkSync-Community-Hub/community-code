import { utils, Wallet, Provider } from 'zksync-ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';
// load env file
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

const DEPLOYER_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || '';

export default async function (hre: HardhatRuntimeEnvironment) {
  // @ts-expect-error target config file which can be testnet or local
  const provider = new Provider(hre.network.config.url);
  const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);

  // deploy the AA Factory & test deploying an account
  await deployAAFactory(deployer);
  // deploy the NFT contract
  await deployMyNFT(deployer);
  // deploy the Paymaster contract
  await deployPaymaster(deployer, wallet);
}

async function deployAAFactory(deployer: Deployer) {
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const aaArtifact = await deployer.loadArtifact('Account');

  const factory = await deployer.deploy(factoryArtifact, [utils.hashBytecode(aaArtifact.bytecode)], undefined, [
    aaArtifact.bytecode,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any);
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);
}

async function deployMyNFT(deployer: Deployer) {
  const artifact = await deployer.loadArtifact('MyNFT');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  console.log('NFT CONTRACT ADDRESS: ', await contract.getAddress());

  const tx = await contract.mintZeek();
  await tx.wait();
  console.log('DONE MINTING');
}

async function deployPaymaster(deployer: Deployer, wallet: Wallet) {
  const artifact = await deployer.loadArtifact('GeneralPaymaster');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  const paymasterAddress = await contract.getAddress();
  console.log('PAYMASTER CONTRACT ADDRESS: ', paymasterAddress);

  const tx = await wallet.sendTransaction({
    to: paymasterAddress,
    value: ethers.parseEther('10'),
  });

  await tx.wait();
  console.log('DONE DEPLOYING & FUNDING PAYMASTER');
}
