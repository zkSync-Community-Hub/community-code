import { parseEther } from 'ethers';
import { deployContract, getWallet } from './utils';

export default async function () {
  const contractArtifactName = 'GeneralPaymaster';
  const owner = getWallet().address;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [owner];
  const contract = await deployContract(contractArtifactName, constructorArguments);
  const address = await contract.getAddress();
  await fundPaymaster(address);
}

async function fundPaymaster(toAddress: string) {
  const wallet = getWallet();
  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: parseEther('1'),
  });

  await tx.wait();
}
