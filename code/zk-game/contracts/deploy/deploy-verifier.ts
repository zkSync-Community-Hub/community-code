import { deployContract } from './utils';

export default async function () {
  const contractArtifactName = 'SP1Verifier';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  await deployContract(contractArtifactName, constructorArguments);
}
