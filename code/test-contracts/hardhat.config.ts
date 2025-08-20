// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
// ANCHOR: import
import '@matterlabs/hardhat-zksync';
// ANCHOR_END: import
// ANCHOR: chai
import '@nomicfoundation/hardhat-chai-matchers';
// ANCHOR_END: chai

const config: HardhatUserConfig = {
  // ANCHOR: config
  solidity: '0.8.28',
  zksolc: {
    version: '1.5.15',
    settings: {
      codegen: 'yul',
      suppressedErrors: ['sendtransfer'],
    },
  },
  networks: {
    hardhat: {
      zksync: true,
    },
  },
  // ANCHOR_END: config
};

export default config;
