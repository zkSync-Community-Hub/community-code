import { connectWallet } from '../utils/connect';
import { fetchConnectors } from '../utils/connectors';

export function ShowConnectorsTS() {
  const connectors = fetchConnectors();

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
