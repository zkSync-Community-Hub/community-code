import { ethers } from 'hardhat';
import { utils } from 'zksync-ethers';

// Put the address of the deployed paymaster here
const PAYMASTER_ADDRESS = process.env.PAYMASTER_ADDRESS ?? '<PAYMASTER_ADDRESS>';

// Put the address of the ERC20 token here:
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS ?? '<TOKEN_ADDRESS>';

async function main() {
  const [signer] = await ethers.getSigners();
  console.log(`ERC20 token balance of the wallet before mint: ${await signer.getBalance(TOKEN_ADDRESS)}`);
  let paymasterBalance = await ethers.provider.getBalance(PAYMASTER_ADDRESS);
  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  const erc20 = await ethers.getContractAt('MyERC20', TOKEN_ADDRESS, signer);
  const gasPrice = await ethers.provider.getGasPrice();

  // Encoding the "ApprovalBased" paymaster flow's input
  const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
    type: 'ApprovalBased',
    token: TOKEN_ADDRESS,
    // set minimalAllowance as we defined in the paymaster contract
    minimalAllowance: BigInt('1'),
    // empty bytes as testnet paymaster does not use innerInput
    innerInput: new Uint8Array(),
  });

  // Estimate gas fee for mint transaction
  const gasLimit = await erc20.mint.estimateGas(signer.address, 5, {
    customData: {
      gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      paymasterParams: paymasterParams,
    },
  });

  const fee = gasPrice * gasLimit;
  console.log('Transaction fee estimation is :>> ', fee.toString());

  console.log(`Minting 5 tokens for the wallet via paymaster...`);
  await (
    await erc20.mint(signer.address, 5, {
      // paymaster info
      customData: {
        paymasterParams: paymasterParams,
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
      },
    })
  ).wait();

  console.log(`Paymaster ERC20 token balance is now ${await erc20.balanceOf(PAYMASTER_ADDRESS)}`);
  paymasterBalance = await ethers.provider.getBalance(PAYMASTER_ADDRESS);

  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
  console.log(`ERC20 token balance of the wallet after mint: ${await signer.getBalance(TOKEN_ADDRESS)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
