import { createAppKit } from '@reown/appkit';
import { zksync } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

export function setupReown() {
  // 1. Get a project ID at https://dashboard.reown.com
  const projectId = 'YOUR_PROJECT_ID';

  const networks = [zksync];

  // 2. Set up Wagmi adapter
  const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
  });

  // 3. Configure the metadata
  const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: 'https://example.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
  };

  // 3. Create the modal
  const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks: [zksync],
    metadata,
    projectId,
    features: {
      analytics: true, // Optional - defaults to your Cloud configuration
    },
  });

  // 4. Trigger modal programaticaly
  const openConnectModalBtn = document.getElementById('open-connect-modal');
  const openNetworkModalBtn = document.getElementById('open-network-modal');

  openConnectModalBtn?.addEventListener('click', () => modal.open());
  openNetworkModalBtn?.addEventListener('click', () => modal.open({ view: 'Networks' }));
}
