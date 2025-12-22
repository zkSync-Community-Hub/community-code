<script lang="ts" setup>
import { createAppKit } from '@reown/appkit/vue';
import { zksync, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// 1. Get projectId from https://dashboard.reown.com
const projectId = 'YOUR_PROJECT_ID';

// 2. Create a metadata object
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks
const networks: [AppKitNetwork, ...AppKitNetwork[]] = [zksync];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

// 5. Create the modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});
</script>

<template>
  <appkit-button />
</template>
