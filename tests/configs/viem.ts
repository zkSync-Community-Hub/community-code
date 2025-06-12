import type { IStepConfig } from '../utils/types';

const steps: IStepConfig = {
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'code/viem',
    useSetCommand: 'bun install',
    runFromSourceDir: true,
  },
  'update-viem': {
    action: 'runCommand',
    commandFolder: 'code/viem',
    useSetCommand: 'bun update viem --latest',
    runFromSourceDir: true,
  },
  'run-project': {
    action: 'runCommand',
    commandFolder: 'code/viem',
    useSetCommand: "bun pm2 start 'bun dev' --name viem",
    runFromSourceDir: true,
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 5000,
  },
  'visit-project': {
    action: 'visitURL',
    url: 'http://localhost:5173',
  },
  'block-number': {
    action: 'findText',
    text: 'Current Block Number',
  },
  'first-message': {
    action: 'findText',
    text: 'Current Message 1:',
  },
  'second-message': {
    action: 'findText',
    text: 'Current Message 2:',
  },
  'write-button': {
    action: 'findText',
    text: 'Write To Greeter Contract',
  },
  'paymaster-button': {
    action: 'findText',
    text: 'Write with Paymaster',
  },
};

export default steps;
