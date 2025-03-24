import { ethers, network } from 'hardhat';

async function main() {
  // Deploy ERC20 and Paymaster contracts
  const ERC20_CONTRACT_NAME = 'MyERC20';
  const ERC20_ARGS = ['MyToken', 'MyToken', 18];
  const erc20Contract = await deployContract(ERC20_CONTRACT_NAME, ERC20_ARGS);

  const PAYMASTER_CONTRACT_NAME = 'MyPaymaster';
  const PAYMASTER_ARGS = [erc20Contract.address];
  const paymasterContract = await deployContract(PAYMASTER_CONTRACT_NAME, PAYMASTER_ARGS);

  // Supplying paymaster with ETH
  console.log('Funding paymaster with ETH...');
  const [signer] = await ethers.getSigners();
  await (
    await signer.sendTransaction({
      to: paymasterContract.address,
      value: ethers.parseEther('0.06'),
    })
  ).wait();

  // Check the balance of the paymaster
  const paymasterBalance = await ethers.provider.getBalance(paymasterContract.address);
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  // Supplying the ERC20 tokens to the wallet:
  // We will give the wallet 3 units of the token:
  await (await erc20Contract.contract.mint(signer.address, 3)).wait();

  console.log('Minted 3 tokens for the wallet');
  console.log(`Done!`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function deployContract(contractName: string, args: any[]) {
  console.log(`Deploying ${contractName} contract to ${network.name}`);
  const contract = await ethers.deployContract(contractName, args, {});
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`${contractName} deployed to ${address}`);
  return { contract, address };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
