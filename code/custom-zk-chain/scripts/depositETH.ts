import { ethers, network } from 'hardhat';
import { utils, Wallet, Provider } from 'zksync-ethers';

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = network.config as any;
  const l1Provider = new Provider(config.ethNetwork);
  const l2Provider = new Provider(config.url);
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY!, l2Provider, l1Provider);
  const l2ETHAddress = await wallet.l2TokenAddress(utils.ETH_ADDRESS_IN_CONTRACTS);
  console.log('L2 ETH Address:', l2ETHAddress);

  const initialBalance = await wallet.getBalance(l2ETHAddress);
  console.log(`INITIAL L2 ETH Balance 🎉: ${ethers.formatEther(initialBalance)} ETH`);

  const depositTx = await wallet.deposit({
    token: utils.ETH_ADDRESS,
    amount: ethers.parseEther('5'),
    approveBaseERC20: true,
  });
  const tx = await depositTx.wait();
  console.log('Deposit Tx Hash:', tx.hash);

  const finalBalance = await wallet.getBalance(l2ETHAddress);
  console.log('FINAL L2 ETH Balance 🎉:', ethers.formatEther(finalBalance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
