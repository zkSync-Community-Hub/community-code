import type { IStepConfig } from '../utils/types';

const steps: IStepConfig = {
  'initialize-project': {
    action: 'runCommand',
    useSetCommand: 'bun create vite walletconnect --template react-ts',
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 15000,
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/walletconnect',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 5000,
  },
  'app-file': {
    action: 'writeToFile',
    filepath: 'tests-output/walletconnect/src/App.tsx',
  },
  'add-project-id': {
    action: 'modifyFile',
    filepath: 'tests-output/walletconnect/src/App.tsx',
    atLine: 17,
    removeLines: [17],
    useSetData: `const projectId = 'd4a7167a6eed6a53c8364631aaeca861';`,
  },
  'run-app': {
    action: 'runCommand',
    commandFolder: 'tests-output/walletconnect',
    useSetCommand: `bun pm2 start 'bun dev' --name walletconnect`,
  },
  'wait-for-app': {
    action: 'wait',
    timeout: 3000,
  },
  'visit-app': {
    action: 'visitURL',
    url: 'http://localhost:5173',
  },
  'find-connect-button': {
    action: 'findText',
    text: 'Connect Wallet',
  },
};

export default steps;
