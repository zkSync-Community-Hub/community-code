import type { HardhatUserConfig } from 'hardhat/config';
import hardhatToolboxMochaEthersPlugin from '@nomicfoundation/hardhat-toolbox-mocha-ethers';
import hardhatKeystore from '@nomicfoundation/hardhat-keystore';
import { configVariable } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin, hardhatKeystore],
  solidity: {
    profiles: {
      default: {
        version: '0.8.28',
      },
      production: {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  ignition: {
    requiredConfirmations: 1,
  },
  networks: {
    hardhatMainnet: {
      type: 'edr-simulated',
      chainType: 'l1',
    },
    era: {
      type: 'http',
      url: 'https://sepolia.era.zksync.dev',
      chainType: 'generic',
      accounts: [configVariable('ERA_PRIVATE_KEY')],
    },
    sophon: {
      type: 'http',
      url: 'https://rpc.testnet.sophon.xyz',
      chainType: 'generic',
      accounts: [configVariable('SOPH_WALLET_PRIVATE_KEY')],
    },
    lens: {
      type: 'http',
      url: 'https://rpc.testnet.lens.xyz',
      chainType: 'generic',
      accounts: [configVariable('LENS_WALLET_PRIVATE_KEY')],
    },
    abstract: {
      type: 'http',
      url: 'https://api.testnet.abs.xyz',
      chainType: 'generic',
      accounts: [configVariable('ABS_WALLET_PRIVATE_KEY')],
    },
  },
};

export default config;
