import { connectWallet } from '@/utils/connect';

export function ConnectWalletTS() {
  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}
