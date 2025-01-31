import { parseEther } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { Wallet } from 'zksync-ethers';
import { getWallet } from './utils';

const ALLOWED_TOKEN = process.env.ALLOWED_TOKEN;

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  await deployPaymaster(hre.deployer, wallet);
}

async function deployPaymaster(deployer: HardhatRuntimeEnvironment['deployer'], wallet: Wallet) {
  if (!ALLOWED_TOKEN) {
    throw new Error('ALLOWED_TOKEN env variable not set');
  }
  const artifact = await deployer.loadArtifact('ApprovalPaymaster');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [ALLOWED_TOKEN];
  const contract = await deployer.deploy(artifact, constructorArguments);
  const paymasterAddress = await contract.getAddress();
  console.log('PAYMASTER CONTRACT ADDRESS: ', paymasterAddress);

  const tx = await wallet.sendTransaction({
    to: paymasterAddress,
    value: parseEther('10'),
  });

  await tx.wait();
  console.log('DONE DEPLOYING & FUNDING PAYMASTER');
}
