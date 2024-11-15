import { http, createConfig } from '@wagmi/core';
import { zksync, zksyncSepoliaTestnet, zksyncInMemoryNode, zksyncLocalNode } from '@wagmi/core/chains';
import { walletConnect } from '@wagmi/connectors';

export const config = createConfig({
  chains: [zksync, zksyncSepoliaTestnet, zksyncInMemoryNode, zksyncLocalNode],
  connectors: [
    walletConnect({
      projectId: 'd4a7167a6eed6a53c8364631aaeca861',
    }),
  ],
  transports: {
    [zksync.id]: http(),
    [zksyncSepoliaTestnet.id]: http(),
    [zksyncInMemoryNode.id]: http(),
    [zksyncLocalNode.id]: http(),
  },
});
