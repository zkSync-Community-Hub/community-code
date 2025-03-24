import { deployer, ethers } from 'hardhat';
import { utils } from 'zksync-ethers';

async function main() {
  // deploy the AA Factory & test deploying an account
  await deployAAFactory();
  // deploy the NFT contract
  await deployMyNFT();
  // deploy the Paymaster contract
  await deployPaymaster();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function deployAAFactory() {
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const aaArtifact = await deployer.loadArtifact('Account');

  const factory = await deployer.deploy(
    factoryArtifact,
    [utils.hashBytecode(aaArtifact.bytecode)],
    undefined,
    undefined,
    [aaArtifact.bytecode]
  );
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);
}

async function deployMyNFT() {
  const artifact = await deployer.loadArtifact('MyNFT');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  console.log('NFT CONTRACT ADDRESS: ', await contract.getAddress());

  const tx = await contract.mintZeek();
  await tx.wait();
  console.log('DONE MINTING');
}

async function deployPaymaster() {
  const [wallet] = await ethers.getWallets();
  const artifact = await deployer.loadArtifact('GeneralPaymaster');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const constructorArguments: any[] = [];
  const contract = await deployer.deploy(artifact, constructorArguments);
  const paymasterAddress = await contract.getAddress();
  console.log('PAYMASTER CONTRACT ADDRESS: ', paymasterAddress);

  const tx = await wallet.sendTransaction({
    to: paymasterAddress,
    value: ethers.parseEther('10'),
  });

  await tx.wait();
  console.log('DONE DEPLOYING & FUNDING PAYMASTER');
}
