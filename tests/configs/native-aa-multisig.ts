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
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'hardhat-config': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-aa-tutorial/hardhat.config.ts',
  },
  'add-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/hardhat.config.ts',
    useSetData: "inMemoryNode: { url: 'http://127.0.0.1:8011', ethNetwork: 'localhost', zksync: true,},",
    atLine: 22,
  },
  'use-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/hardhat.config.ts',
    useSetData: "  defaultNetwork: 'inMemoryNode',",
    atLine: 14,
    removeLines: [14],
  },
  'start-local-node': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
    useSetCommand: "bun pm2 start 'era_test_node run' --name era-test-node",
  },
  'make-multisig-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'multisig-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-aa-tutorial/contracts/TwoUserMultisig.sol',
  },
  'make-factory-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'factory-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-aa-tutorial/contracts/AAFactory.sol',
  },
  'make-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'deploy-script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-factory.ts',
  },
  'deploy-script-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-factory.ts',
    atLine: 8,
    removeLines: [8],
    useSetData: 'const wallet = new Wallet("0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110");',
  },
  'compile-and-deploy-factory': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
    checkForOutput: 'AA factory address:',
    saveOutput: 'tests-output/custom-aa-tutorial/deployed-factory-address.txt',
  },
  'create-deploy-multisig': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
  },
  'deploy-multisig-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
  },
  'deposit-funds': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 39,
    addSpacesBefore: 1,
  },
  'create-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 54,
    addSpacesBefore: 1,
  },
  'modify-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 62,
    addSpacesBefore: 1,
  },
  'sign-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 80,
    addSpacesBefore: 1,
  },
  'send-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 90,
    addSpacesBefore: 1,
  },
  'final-deploy-script': {
    action: 'compareToFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
  },
  'get-deployed-account-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-aa-tutorial/deployed-factory-address.txt',
    regex: /0x[a-fA-F0-9]{40}/,
    variableName: 'AA_FACTORY_ADDRESS',
    envFilepath: 'tests-output/custom-aa-tutorial/.env',
  },
  'deploy-multisig-account': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 6,
    removeLines: [6],
    useSetData: 'const AA_FACTORY_ADDRESS = process.env.AA_FACTORY_ADDRESS || "";',
  },
  'deploy-multisig-provider': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 9,
    removeLines: [9],
    useSetData: 'const provider = new Provider("http://localhost:8011");',
  },
  'deploy-multisig-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    atLine: 11,
    removeLines: [11],
    useSetData:
      'const wallet = new Wallet("0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110").connect(provider);',
  },
  'import-dotenv': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-aa-tutorial/deploy/deploy-multisig.ts',
    useSetData: `import dotenv from "dotenv";
    dotenv.config();`,
    atLine: 4,
  },
  'run-deploy-multisig': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-aa-tutorial',
    checkForOutput: 'Multisig account balance is now',
  },
};
