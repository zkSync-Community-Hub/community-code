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
  'delete-templates': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'hardhat-config': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/hardhat.config.ts',
    atLine: 51,
    removeLines: [51, '-->', 57],
  },
  'use-local-node': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/hardhat.config.ts',
    atLine: 9,
    removeLines: [9],
    useSetData: '  defaultNetwork: "anvilZKsync",',
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
  'make-env-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
    useSetCommand: 'touch .env',
  },
  'env-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/.env',
    atLine: 1,
    removeLines: [1],
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'make-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
  },
  'deploy-script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-factory.ts',
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
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
  },
  'deposit-funds': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 34,
    addSpacesBefore: 1,
  },
  'create-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 51,
    addSpacesBefore: 1,
  },
  'modify-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 59,
    addSpacesBefore: 1,
  },
  'sign-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 77,
    addSpacesBefore: 1,
  },
  'send-deploy-tx': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 90,
    addSpacesBefore: 1,
  },
  'add-run-main': {
    action: 'modifyFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
    atLine: 106,
    useSetData: `main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });`,
  },
  'final-deploy-script': {
    action: 'compareToFile',
    filepath: 'tests-output/native-aa-multisig/scripts/deploy-multisig.ts',
  },
  'get-deployed-account-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/native-aa-multisig/deployed-factory-address.txt',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
    variableName: 'AA_FACTORY_ADDRESS',
    envFilepath: 'tests-output/native-aa-multisig/.env',
  },
  'run-deploy-multisig': {
    action: 'runCommand',
    commandFolder: 'tests-output/native-aa-multisig',
    checkForOutput: 'Multisig account balance is now',
  },
};

export default steps;
