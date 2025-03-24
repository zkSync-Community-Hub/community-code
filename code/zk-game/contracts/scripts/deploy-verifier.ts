import { deployer } from 'hardhat';

async function main() {
  const artifact = await deployer.loadArtifact('SP1Verifier');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  console.log('DEPLOYED VERIFIER CONTRACT ADDRESS: ', await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
