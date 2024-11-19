import { connectWallet } from '@/utils/connect';
import { useConnectors } from 'wagmi';

export function ShowConnectors() {
  const connectors = useConnectors();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={connectWallet}
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
