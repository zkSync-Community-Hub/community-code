import { ethers } from 'hardhat';
import { utils } from 'zksync-ethers';

async function main() {
  const factoryArtifact = await ethers.getContractFactory('AAFactory');
  const multisigArtifact = await ethers.getContractFactory('TwoUserMultisig');

  const factory = await factoryArtifact.deploy(utils.hashBytecode(multisigArtifact.bytecode), { libraries: {} });

  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
