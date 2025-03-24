import { deployer } from 'hardhat';
import { utils } from 'zksync-ethers';

async function main() {
  const factoryArtifact = await deployer.loadArtifact('AAFactory');
  const multisigArtifact = await deployer.loadArtifact('TwoUserMultisig');

  const factory = await deployer.deploy(
    factoryArtifact,
    [utils.hashBytecode(multisigArtifact.bytecode)],
    undefined,
    undefined,
    [multisigArtifact.bytecode]
  );
  const factoryAddress = await factory.getAddress();
  console.log(`AA factory address: ${factoryAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
