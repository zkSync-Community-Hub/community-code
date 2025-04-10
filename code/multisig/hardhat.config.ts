import type { HardhatUserConfig } from 'hardhat/config';
import '@matterlabs/hardhat-zksync';

import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: 'ZKsyncEraSepolia',
  // ANCHOR: networks
  networks: {
    ZKsyncEraSepolia: {
      url: 'https://sepolia.era.zksync.dev',
      ethNetwork: 'sepolia',
      zksync: true,
      verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification',
      accounts: process.env.WALLET_PRIVATE_KEY ? [process.env.WALLET_PRIVATE_KEY] : [],
    },
    ZKsyncEraMainnet: {
      url: 'https://mainnet.era.zksync.io',
      ethNetwork: 'mainnet',
      zksync: true,
      verifyURL: 'https://zksync2-mainnet-explorer.zksync.io/contract_verification',
      accounts: process.env.WALLET_PRIVATE_KEY ? [process.env.WALLET_PRIVATE_KEY] : [],
    },
    // ANCHOR_END: networks
    dockerizedNode: {
      url: 'http://localhost:3050',
      ethNetwork: 'http://localhost:8545',
      zksync: true,
    },
    anvilZKsync: {
      url: 'http://127.0.0.1:8011',
      ethNetwork: 'localhost',
      zksync: true,
    },
    hardhat: {
      zksync: true,
    },
  },
  // ANCHOR: extensions
  zksolc: {
    version: 'latest',
    settings: {
      enableEraVMExtensions: true,
      // find all available options in the official documentation
      // https://docs.zksync.io/build/tooling/hardhat/hardhat-zksync-solc#configuration
    },
  },
  // ANCHOR_END: extensions
  solidity: {
    version: '0.8.24',
  },
};

export default config;
