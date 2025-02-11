import { ethers } from 'hardhat';

async function main() {
  const COUNTER_ADDRESS = process.env.COUNTER_ADDRESS ?? '<COUNTER_ADDRESS>';

  const [signer] = await ethers.getSigners();
  const counterFactory = await ethers.getContractFactory('Counter');
  const counterContract = counterFactory.connect(signer).attach(COUNTER_ADDRESS);

  const value = (await counterContract.value()).toString();
  console.log(`The counter value is ${value}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
