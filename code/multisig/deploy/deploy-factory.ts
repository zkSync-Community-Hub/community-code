import { utils, Wallet } from 'zksync-ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Deployer } from '@matterlabs/hardhat-zksync';
import dotenv from 'dotenv';
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  // Private key of the account used to deploy
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY!);
  const deployer = new Deployer(hre, wallet);
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const aaArtifact = await deployer.loadArtifact('TwoUserMultisig');

  // Getting the bytecodeHash of the account
  const bytecodeHash = utils.hashBytecode(aaArtifact.bytecode);

  const factory = await deployer.deploy(
    factoryArtifact,
    [bytecodeHash],
    undefined,
    undefined, // Override transaction section
    [
      // Since the factory requires the code of the multisig to be available,
      // we need to pass it here as well.
      aaArtifact.bytecode,
    ]
  );

  const factoryAddress = await factory.getAddress();

  console.log(`AA factory address: ${factoryAddress}`);
}
