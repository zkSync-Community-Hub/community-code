import { deployContract } from './utils';

export default async function () {
  const contractArtifactName = 'Brickles';
  // sp1 verifier contract v4.0.0-rc.3
  const VERIFIER_CONTRACT_ADDRESS = process.env.VERIFIER_CONTRACT_ADDRESS ?? '0x...';
  // generated in our sp1 script
  const PROGRAM_VERIFICATION_KEY = process.env.PROGRAM_VERIFICATION_KEY ?? '0x...';
  const constructorArguments = [VERIFIER_CONTRACT_ADDRESS, PROGRAM_VERIFICATION_KEY];
  await deployContract(contractArtifactName, constructorArguments);
}
