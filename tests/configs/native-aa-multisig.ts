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
  'delete-templates': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'hardhat-config': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/hardhat.config.ts',
  },
  'use-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/hardhat.config.ts',
    atLine: 6,
    removeLines: [6],
    useSetData: '  defaultNetwork: "anvilZKsync",',
  },
  'start-local-node': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
    useSetCommand: "bun pm2 start 'era_test_node fork sepolia-testnet' --name era-test-node",
  },
  'make-multisig-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'multisig-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/contracts/TwoUserMultisig.sol',
    addSpacesAfter: false,
  },
  'make-factory-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'factory-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/contracts/AAFactory.sol',
  },
  'make-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'deploy-script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-factory.ts',
  },
  'env-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/.env',
    atLine: 1,
    removeLines: [1],
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'compile-and-deploy-factory': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
    checkForOutput: 'AA factory address:',
    saveOutput: 'tests-output/native-aa-multisig/deployed-factory-address.txt',
  },
  'create-deploy-multisig': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'deploy-multisig-code': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
  },
  'deposit-funds': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 41,
    addSpacesBefore: 1,
  },
  'create-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 56,
    addSpacesBefore: 1,
  },
  'modify-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 64,
    addSpacesBefore: 1,
  },
  'sign-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 82,
    addSpacesBefore: 1,
  },
  'send-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 95,
    addSpacesBefore: 1,
  },
  'final-deploy-script': {
    action: 'compareToFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
  },
  'get-deployed-account-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/native-aa-multisig/deployed-factory-address.txt',
    regex: /0x[a-fA-F0-9]{40}/,
    variableName: 'AA_FACTORY_ADDRESS',
    envFilepath: 'tests-output/native-aa-multisig/.env',
  },
  'deploy-multisig-account': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/deploy/deploy-multisig.ts',
    atLine: 8,
    removeLines: [8],
    useSetData: 'const AA_FACTORY_ADDRESS = process.env.AA_FACTORY_ADDRESS || "";',
  },
  'run-deploy-multisig': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
    checkForOutput: 'Multisig account balance is now',
  },
};
