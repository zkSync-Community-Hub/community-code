import { utils, Wallet, Provider } from 'zksync-ethers';
import * as ethers from 'ethers';
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
  await deploy(deployer, wallet);
}

export async function deploy(deployer: Deployer, wallet: Wallet) {
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const aaArtifact = await deployer.loadArtifact('Account');

  const factory = await deployer.deploy(factoryArtifact, [utils.hashBytecode(aaArtifact.bytecode)], undefined, [
    aaArtifact.bytecode,
  ]);
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);

  const aaFactory = new ethers.Contract(factoryAddress, factoryArtifact.abi, wallet);

  const owner = Wallet.createRandom();
  console.log('SC Account owner pk: ', owner.privateKey);

  const salt = ethers.ZeroHash;
  const tx = await aaFactory.deployAccount(salt, owner.address);
  await tx.wait();

  const abiCoder = new ethers.AbiCoder();
  const accountAddress = utils.create2Address(
    factoryAddress,
    await aaFactory.aaBytecodeHash(),
    salt,
    abiCoder.encode(['address'], [owner.address])
  );

  console.log(`SC Account deployed on address ${accountAddress}`);

  console.log('Funding smart contract account with some ETH');
  await (
    await wallet.sendTransaction({
      to: accountAddress,
      value: ethers.parseEther('100'),
    })
  ).wait();
  console.log(`Done!`);
  return { accountAddress, owner };
}
