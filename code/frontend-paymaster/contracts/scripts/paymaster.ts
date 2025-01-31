import { deployer, ethers } from 'hardhat';

const ALLOWED_TOKEN = process.env.ALLOWED_TOKEN;

async function main() {
  if (!ALLOWED_TOKEN) {
    throw new Error('ALLOWED_TOKEN env variable not set');
  }
  const artifact = await deployer.loadArtifact('ApprovalPaymaster');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [ALLOWED_TOKEN];
  const contract = await deployer.deploy(artifact, constructorArguments);
  const paymasterAddress = await contract.getAddress();
  console.log('PAYMASTER CONTRACT ADDRESS: ', paymasterAddress);

  const [wallet] = await ethers.getWallets();
  const tx = await wallet.sendTransaction({
    to: paymasterAddress,
    value: ethers.parseEther('10'),
  });

  await tx.wait();
  console.log('DONE DEPLOYING & FUNDING PAYMASTER');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
