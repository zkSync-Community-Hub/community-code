import type { HardhatRuntimeEnvironment } from 'hardhat/types';
// load env file
import dotenv from 'dotenv';
dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  // sp1 verifier contract v4.0.0-rc.3
  const VERIFIER_CONTRACT_ADDRESS = process.env.VERIFIER_CONTRACT_ADDRESS ?? '0x...';
  // generated in our sp1 script
  const PROGRAM_VERIFICATION_KEY = process.env.PROGRAM_VERIFICATION_KEY ?? '0x...';

  const artifact = await hre.deployer.loadArtifact('Brickles');
  const constructorArguments = [VERIFIER_CONTRACT_ADDRESS, PROGRAM_VERIFICATION_KEY];
  const contract = await hre.deployer.deploy(artifact, constructorArguments);
  console.log('DEPLOYED GAME CONTRACT ADDRESS: ', await contract.getAddress());
}
