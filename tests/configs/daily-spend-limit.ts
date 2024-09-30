import type { IStepConfig } from '../utils/types';

export const steps: IStepConfig = {
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
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 5000,
  },
  'hardhat-config': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/hardhat.config.ts',
  },
  'start-local-node': {
    action: 'runCommand',
    useSetCommand: "bun pm2 start 'era_test_node run' --name era-test-node",
  },
  'deploy-to-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/hardhat.config.ts',
    atLine: 9,
    removeLines: [9],
    useSetData: '  defaultNetwork: "inMemoryNode",',
  },
  'add-spend-limit-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'open-spend-limit-code-panel': {
    action: 'clickButtonByText',
    buttonText: 'SpendLimit.sol',
  },
  'spend-limit-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/contracts/SpendLimit.sol',
  },
  'account-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'open-account-code-panel': {
    action: 'clickButtonByText',
    buttonText: 'Account.sol',
  },
  'add-account-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/contracts/Account.sol',
  },
  'aa-factory-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'aa-factory-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/contracts/AAFactory.sol',
  },
  compile: {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'create-deploy-factory-script-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'modify-env-file': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/.env',
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
    atLine: 1,
    removeLines: [1],
  },
  'deploy-factory-script': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/deploy/deploy.ts',
  },
  'run-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
    saveOutput: 'tests-output/custom-spendlimit-tutorial/deploy-outputs.txt',
  },
  'wait-for-script': {
    action: 'wait',
    timeout: 5000,
  },
  'create-set-limit-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'get-deployed-account-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-spendlimit-tutorial/deploy-outputs.txt',
    regex: /(?<=SC Account deployed on address\s)0x[a-fA-F0-9]{40}(?![\s\S]*SC Account deployed on address)/,
    variableName: 'DEPLOYED_ACCOUNT_ADDRESS',
    envFilepath: 'tests-output/custom-spendlimit-tutorial/.env',
  },
  'get-private-key': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-spendlimit-tutorial/deploy-outputs.txt',
    regex: /0x[a-fA-F0-9a-zA-Z]{64,}/g,
    variableName: 'DEPLOYED_ACCOUNT_OWNER_PRIVATE_KEY',
    envFilepath: 'tests-output/custom-spendlimit-tutorial/.env',
  },
  'set-limit-script': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/deploy/setLimit.ts',
  },
  'run-set-limit-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
    checkForOutput: 'Account limit:  500000000000000',
  },
  'create-transfer-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
  },
  'add-transfer-script': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/deploy/transferETH.ts',
  },
  'add-receiver-account': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-spendlimit-tutorial/.env',
    useSetData: 'RECEIVER_ACCOUNT=0x36615Cf349d7F6344891B1e7CA7C72883F5dc049',
    atLine: 4,
  },
  'run-transfer-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-spendlimit-tutorial',
    expectError: 'execution reverted',
  },
};
