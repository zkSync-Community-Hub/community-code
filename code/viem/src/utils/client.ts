import type { PublicClient, Chain } from 'viem';
import { createPublicClient, http } from 'viem';
import {
  // zksync,
  zksyncSepoliaTestnet,
  // zksyncInMemoryNode,
  // zksyncLocalNode
} from 'viem/chains';

export const publicClient: PublicClient = createPublicClient({
  chain: zksyncSepoliaTestnet as Chain, // Specify the ZKsync network
  transport: http(), // Define the transport method
});
