import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {
    // Sepolia network
    sepolia: {
      url: process.env.NODE_RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
