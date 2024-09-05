import type { HardhatUserConfig } from 'hardhat/config';

import '@matterlabs/hardhat-zksync-node';
import '@matterlabs/hardhat-zksync-deploy';
import '@matterlabs/hardhat-zksync-solc';
import '@matterlabs/hardhat-zksync-verify';

const config: HardhatUserConfig = {
  defaultNetwork: 'inMemoryNode',
  networks: {
    zkSyncSepoliaTestnet: {
      url: 'https://sepolia.era.zksync.dev',
      ethNetwork: 'sepolia',
      zksync: true,
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification',
    },
    dockerizedNode: {
      url: 'http://localhost:3050',
      ethNetwork: 'http://localhost:8545',
      zksync: true,
    },
    inMemoryNode: {
      url: 'http://127.0.0.1:8011',
      ethNetwork: 'localhost', // in-memory node doesn't support eth node; removing this line will cause an error
      zksync: true,
    },
    hardhat: {
      zksync: true,
    },
    // Additional networks
  },
  zksolc: {
    version: 'latest',
    settings: {
      enableEraVMExtensions: true,
      // isSystem: true, // ⚠️ Make sure to include this line
    },
  },
  solidity: {
    version: '0.8.17',
  },
};

export default config;
