import type { IStepConfig } from '../utils/types';

export const steps: IStepConfig = {
  'initialize-hardhat-project': {
    action: 'runCommand',
  },
  'wait-for-initialization': {
    action: 'wait',
    timeout: 10000,
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
  },
  'wait-for-deps': {
    action: 'wait',
    timeout: 10000,
  },
  'import-zksync-config': {
    action: 'modifyFile',
    filepath: 'tests-output/hardhat-project/hardhat.config.ts',
    atLine: 3,
  },
  'run-hh-node': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
    preCommand: "bun pm2 start '<COMMAND>' --name hh-zknode",
  },
  'wait-for-hh-node': {
    action: 'wait',
    timeout: 10000,
  },
  'test-hh-node': {
    action: 'checkIfBalanceIsZero',
    networkUrl: 'http://127.0.0.1:8011',
    address: '0xe2b8Cb53a43a56d4d2AB6131C81Bd76B86D3AFe5',
  },
  'zksync-hh-network': {
    action: 'modifyFile',
    filepath: 'tests-output/hardhat-project/hardhat.config.ts',
    atLine: 6,
    removeLines: [6],
  },
  'install-chai-ethers': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
  },
  'import-chai-matchers': {
    action: 'modifyFile',
    filepath: 'tests-output/hardhat-project/hardhat.config.ts',
    atLine: 4,
  },
  'compare-config': {
    action: 'compareToFile',
    filepath: 'tests-output/hardhat-project/hardhat.config.ts',
  },
  'rename-greeter-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
  },
  'create-greeter-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/hardhat-project/contracts/Greeter.sol',
  },
  'rename-test-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
  },
  'create-test': {
    action: 'writeToFile',
    filepath: 'tests-output/hardhat-project/test/test.ts',
  },
  'run-test': {
    action: 'runCommand',
    commandFolder: 'tests-output/hardhat-project',
  },
};
