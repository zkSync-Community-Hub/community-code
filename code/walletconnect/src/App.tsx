import { createAppKit } from '@reown/appkit/react';
import { useAccount, WagmiProvider } from 'wagmi';
import {
  zksync,
  zksyncSepoliaTestnet,
  zksyncInMemoryNode,
  zksyncLocalNode,
  type AppKitNetwork,
} from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID';

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'http://localhost:5173', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  zksync,
  zksyncSepoliaTestnet,
  zksyncInMemoryNode,
  zksyncLocalNode,
];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create Apptkit
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

const Connect = () => {
  const { address } = useAccount();
  return (
    <>
      <div style={{ width: '100vw', display: 'grid', placeItems: 'center' }}>
        <appkit-button />
      </div>
      <p>
        {address && (
          <>
            <b>Address:</b> {address}
          </>
        )}
      </p>
    </>
  );
};

const App = () => {
  return (
    <AppKitProvider>
      <Connect />
    </AppKitProvider>
  );
};

export default App;
