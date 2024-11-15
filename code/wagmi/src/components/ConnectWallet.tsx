import { injected } from '@wagmi/connectors';
import { useConnect } from 'wagmi';

export function ConnectWallet() {
  const { connect } = useConnect();

  return (
    <div>
      <button onClick={() => connect({ connector: injected() })}>Connect Wallet</button>
    </div>
  );
}
