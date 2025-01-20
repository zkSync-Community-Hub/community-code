import type { IStepConfig } from '../utils/types';

export const steps: IStepConfig = {
  'initialize-hardhat-project': {
    action: 'runCommand',
    prompts: 'Private key of the wallet:0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110|❯ npm: ',
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 5000,
  },
  'npm-install': {
    action: 'runCommand',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 5000,
  },
  'create-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'add-paymaster-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-paymaster-tutorial/contracts/MyPaymaster.sol',
  },
  'create-erc20-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'add-erc20-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-paymaster-tutorial/contracts/MyERC20.sol',
  },
  'create-deploy-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'add-testing-private-key': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-paymaster-tutorial/.env',
    atLine: 1,
    removeLines: [1],
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'add-deploy-script': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-paymaster-tutorial/deploy/deploy-paymaster.ts',
  },
  'create-ts-config': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
    useSetCommand: 'touch tsconfig.json',
  },
  'compile-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'use-local-network': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-paymaster-tutorial/hardhat.config.ts',
    atLine: 8,
    removeLines: [8],
    useSetData: '  defaultNetwork: "anvilZKsync",',
  },
  'start-local-network': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
    useSetCommand: "bun pm2 start 'npx hardhat node-zksync' --name hh-zknode",
  },
  'wait-for-hh-node': {
    action: 'wait',
    timeout: 7000,
  },
  'temp-fix-import': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-paymaster-tutorial/deploy/utils.ts',
    atLine: 4,
    removeLines: [4],
    useSetData: "import * as dotenv from 'dotenv';",
  },
  'deploy-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'create-deploy-paymaster-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
  'add-use-paymaster': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-paymaster-tutorial/deploy/use-paymaster.ts',
  },
  'paymaster-address': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-paymaster-tutorial/deploy/use-paymaster.ts',
    atLine: 7,
    removeLines: [7],
    getContractId:
      'tests-output/custom-paymaster-tutorial/deployments-zk/anvilZKsync/contracts/MyPaymaster.sol/MyPaymaster.json',
    useSetData: "const PAYMASTER_ADDRESS = '<*GET_CONTRACT_ID*>';",
  },
  'token-address': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-paymaster-tutorial/deploy/use-paymaster.ts',
    atLine: 10,
    removeLines: [10],
    getContractId:
      'tests-output/custom-paymaster-tutorial/deployments-zk/anvilZKsync/contracts/MyERC20.sol/MyERC20.json',
    useSetData: "const TOKEN_ADDRESS = '<*GET_CONTRACT_ID*>';",
  },
  'run-use-paymaster': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-paymaster-tutorial',
  },
};
