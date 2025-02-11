import { ethers, network } from 'hardhat';
import { utils } from 'zksync-ethers';

const GOVERNANCE_ADDRESS = process.env.GOVERNANCE_ADDRESS ?? '<GOVERNANCE-ADDRESS>';

async function main() {
  const CONTRACT_NAME = 'Counter';
  const ARGS = [utils.applyL1ToL2Alias(GOVERNANCE_ADDRESS)];
  console.log(`Deploying ${CONTRACT_NAME} contract to ${network.name}`);
  const contract = await ethers.deployContract(CONTRACT_NAME, ARGS, {});
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`${CONTRACT_NAME} deployed to ${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
