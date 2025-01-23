import type { HardhatRuntimeEnvironment } from 'hardhat/types';

export default async function (hre: HardhatRuntimeEnvironment) {
  const artifact = await hre.deployer.loadArtifact('SP1Verifier');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await hre.deployer.deploy(artifact, constructorArguments);
  console.log('DEPLOYED VERIFIER CONTRACT ADDRESS: ', await contract.getAddress());
}
