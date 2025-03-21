import { ethers } from 'hardhat';

async function main() {
  const [wallet] = await ethers.getWallets();
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
