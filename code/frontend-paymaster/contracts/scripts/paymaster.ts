import { ethers } from 'hardhat';

const ALLOWED_TOKEN = process.env.ALLOWED_TOKEN;

async function main() {
  if (!ALLOWED_TOKEN) {
    throw new Error('ALLOWED_TOKEN env variable not set');
  }
  const [signer] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory('ApprovalPaymaster');
  const contract = await contractFactory.deploy(ALLOWED_TOKEN, signer.address);
  await contract.waitForDeployment();

  const paymasterAddress = await contract.getAddress();
  console.log('PAYMASTER CONTRACT ADDRESS: ', paymasterAddress);

  const tx = await signer.sendTransaction({
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
