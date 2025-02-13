import { deployer, ethers } from 'hardhat';

async function main() {
  const artifact = await deployer.loadArtifact('GeneralPaymaster');
  const [signer] = await ethers.getSigners();
  const constructorArguments = [signer.address];
  const contract = await deployer.deploy(artifact, constructorArguments);
  const address = await contract.getAddress();
  console.log('DEPLOYED PAYMASTER CONTRACT ADDRESS: ', address);

  // Fund the paymaster contract
  const tx = await signer.sendTransaction({
    to: address,
    value: ethers.parseEther('0.5'),
  });

  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
