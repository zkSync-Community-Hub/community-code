import type { IStepConfig } from '../utils/types';

const steps: IStepConfig = {
  'initialize-project': {
    action: 'runCommand',
    prompts: 'Private key of the wallet: |❯ npm: ',
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 15000,
  },
  'move-into-project': {
    action: 'runCommand',
  },
  'delete-template-files': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 5000,
  },
  'hardhat-config': {
    action: 'modifyFile',
    filepath: 'tests-output/daily-spend-limit/hardhat.config.ts',
    atLine: 56,
    removeLines: [56, '-->', 63],
  },
  'deploy-to-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/daily-spend-limit/hardhat.config.ts',
    atLine: 10,
    removeLines: [10],
    useSetData: '  defaultNetwork: "anvilZKsync",',
  },
  'add-spend-limit-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'open-spend-limit-code-panel': {
    action: 'clickButtonByText',
    buttonText: 'SpendLimit.sol',
  },
  'spend-limit-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/contracts/SpendLimit.sol',
  },
  'account-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'open-account-code-panel': {
    action: 'clickButtonByText',
    buttonText: 'Account.sol',
  },
  'add-account-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/contracts/Account.sol',
  },
  'aa-factory-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'aa-factory-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/contracts/AAFactory.sol',
  },
  compile: {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'create-deploy-factory-script-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'make-env-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
    useSetCommand: 'touch .env',
  },
  'modify-env-file': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/.env',
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'deploy-factory-script': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/scripts/deploy.ts',
  },
  'run-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
    saveOutput: 'tests-output/daily-spend-limit/deploy-outputs.txt',
  },
  'wait-for-script': {
    action: 'wait',
    timeout: 5000,
  },
  'create-set-limit-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'get-deployed-account-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/daily-spend-limit/deploy-outputs.txt',
    selector: {
      regex: /(?<=SC Account deployed on address\s)0x[a-fA-F0-9]{40}(?![\s\S]*SC Account deployed on address)/,
    },
    variableName: 'DEPLOYED_ACCOUNT_ADDRESS',
    envFilepath: 'tests-output/daily-spend-limit/.env',
  },
  'get-private-key': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/daily-spend-limit/deploy-outputs.txt',
    selector: { regex: /0x[a-fA-F0-9a-zA-Z]{64,}/g },
    variableName: 'DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY',
    envFilepath: 'tests-output/daily-spend-limit/.env',
  },
  'set-limit-script': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/scripts/setLimit.ts',
  },
  'run-set-limit-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
    checkForOutput: 'Account limit:  500000000000000',
  },
  'create-transfer-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
  },
  'add-transfer-script': {
    action: 'writeToFile',
    filepath: 'tests-output/daily-spend-limit/scripts/transferETH.ts',
  },
  'add-receiver-account': {
    action: 'modifyFile',
    filepath: 'tests-output/daily-spend-limit/.env',
    useSetData: 'RECEIVER_ACCOUNT=0x36615Cf349d7F6344891B1e7CA7C72883F5dc049',
    atLine: 4,
  },
  'run-transfer-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/daily-spend-limit',
    expectError: 'execution reverted',
  },
};

export default steps;
