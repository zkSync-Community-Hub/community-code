import { ethers, network } from 'hardhat';
import { Wallet, Provider } from 'zksync-ethers';

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = network.config as any;
  const l1Provider = new Provider(config.ethNetwork);
  const l2Provider = new Provider(config.url);
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY!, l2Provider, l1Provider);
  const initialBalance = await wallet.getBalance();
  console.log('INITIAL L2 Base Token Balance 🎉:', ethers.formatEther(initialBalance));

  const depositTx = await wallet.deposit({
    token: await wallet.getBaseToken(),
    amount: ethers.parseEther('5'),
    approveBaseERC20: true,
  });
  const tx = await depositTx.wait();
  console.log('Deposit Tx Hash:', tx.hash);

  const finalBalance = await wallet.getBalance();
  console.log('FINAL L2 Base Token Balance 🎉:', ethers.formatEther(finalBalance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
