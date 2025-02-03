import { deployer } from 'hardhat';

async function main() {
  // sp1 verifier contract v4.0.0-rc.3
  const VERIFIER_CONTRACT_ADDRESS = process.env.VERIFIER_CONTRACT_ADDRESS ?? '0x...';
  // generated in our sp1 script
  const PROGRAM_VERIFICATION_KEY = process.env.PROGRAM_VERIFICATION_KEY ?? '0x...';

  const artifact = await deployer.loadArtifact('Brickles');
  const constructorArguments = [VERIFIER_CONTRACT_ADDRESS, PROGRAM_VERIFICATION_KEY];
  const contract = await deployer.deploy(artifact, constructorArguments);
  console.log('DEPLOYED GAME CONTRACT ADDRESS: ', await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
