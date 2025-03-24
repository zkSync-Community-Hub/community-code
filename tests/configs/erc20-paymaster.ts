import type { IStepConfig } from '../utils/types';

export const steps: IStepConfig = {
  'initialize-hardhat-project': {
    action: 'runCommand',
    prompts: 'Private key of the wallet: |❯ npm: ',
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
    commandFolder: 'tests-output/erc20-paymaster',
  },
  'add-paymaster-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/erc20-paymaster/contracts/MyPaymaster.sol',
  },
  'create-erc20-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
  },
  'add-erc20-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/erc20-paymaster/contracts/MyERC20.sol',
  },
  'create-deploy-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
  },
  'add-env-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
    useSetCommand: 'touch .env',
  },
  'add-testing-private-key': {
    action: 'modifyFile',
    filepath: 'tests-output/erc20-paymaster/.env',
    atLine: 1,
    removeLines: [1],
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'add-deploy-script': {
    action: 'writeToFile',
    filepath: 'tests-output/erc20-paymaster/scripts/deploy-paymaster.ts',
  },
  'compile-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
  },
  'use-local-network': {
    action: 'modifyFile',
    filepath: 'tests-output/erc20-paymaster/hardhat.config.ts',
    atLine: 9,
    removeLines: [9],
    useSetData: '  defaultNetwork: "anvilZKsync",',
  },
  'deploy-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
    saveOutput: 'tests-output/erc20-paymaster/deployed.txt',
  },
  'create-use-paymaster-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
  },
  'add-use-paymaster': {
    action: 'writeToFile',
    filepath: 'tests-output/erc20-paymaster/scripts/use-paymaster.ts',
  },
  'paymaster-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/erc20-paymaster/deployed.txt',
    regex: /(?<=MyPaymaster deployed to )0x[a-fA-F0-9]{40}/,
    variableName: 'PAYMASTER_ADDRESS',
    envFilepath: 'tests-output/erc20-paymaster/.env',
  },
  'token-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/erc20-paymaster/deployed.txt',
    regex: /(?<=MyERC20 deployed to )0x[a-fA-F0-9]{40}/,
    variableName: 'TOKEN_ADDRESS',
    envFilepath: 'tests-output/erc20-paymaster/.env',
  },
  'run-use-paymaster': {
    action: 'runCommand',
    commandFolder: 'tests-output/erc20-paymaster',
  },
};
