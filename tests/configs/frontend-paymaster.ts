import type { IStepConfig } from '../utils/types';

const newGreeting1 = 'My name is Zeek';
const newGreeting2 = 'Zeek is a cool cat';

export const steps: IStepConfig = {
  'make-project-folder': {
    action: 'runCommand',
  },
  'make-contracts-folder': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster',
    prompts: 'Private key of the wallet: |❯ npm: ',
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 15000,
  },
  'env-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/contracts/.env',
    atLine: 1,
    removeLines: [1],
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
  },
  'compile-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster/contracts',
  },
  'update-hh-config': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/contracts/hardhat.config.ts',
    atLine: 6,
    removeLines: [6],
    useSetData: '  defaultNetwork: "inMemoryNode",',
  },
  'deploy-greeter': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster/contracts',
    saveOutput: 'tests-output/frontend-paymaster/contracts/deployed-greeter.txt',
  },
  'make-frontend': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster',
  },
  'install-frontend-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster/frontend',
    useSetCommand: 'npm install ethers zksync-ethers',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 15000,
  },
  'open-panel': {
    action: 'clickButtonByText',
    buttonText: 'App.vue',
  },
  'app-template-code': {
    action: 'writeToFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
  },
  'contract-env-var': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/frontend-paymaster/contracts/deployed-greeter.txt',
    envFilepath: 'tests-output/frontend-paymaster/frontend/.env',
    variableName: 'VITE_GREETER_CONTRACT_ADDRESS',
    regex: /0x[a-fA-F0-9]{40}/,
  },
  'add-zksync-imports': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 101,
    removeLines: [101],
  },
  'initialize-provider-and-signer': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 189,
    removeLines: [189, '-->', 192],
  },
  'change-provider-to-local': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 190,
    removeLines: [190],
    useSetData: "  provider = new Provider('http://localhost:8011');",
  },
  'get-greeting': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 197,
    removeLines: [197, '-->', 200],
  },
  'add-ethers-imports': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 104,
  },
  'get-fee': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 204,
    removeLines: [204, '-->', 207],
  },
  'get-balance': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 215,
    removeLines: [215, '-->', 218],
  },
  'change-greeting': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 233,
    removeLines: [233, '-->', 259],
  },
  'get-overrides-full': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 224,
    removeLines: [224, '-->', 231],
  },
  'use-local-chain': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 177,
    removeLines: [177],
    useSetData: 'const networkChainId = 260;',
  },
  'run-project': {
    action: 'runCommand',
    commandFolder: 'tests-output/frontend-paymaster/frontend',
    preCommand: "bun pm2 start '<COMMAND>' --name paymaster-frontend",
  },
  'go-to-app': {
    action: 'visitURL',
    url: 'http://localhost:5173/',
  },
  'click-connect-button': {
    action: 'clickButtonByText',
    buttonText: 'Connect Metamask',
  },
  'connect-to-dapp': {
    action: 'connectToDapp',
    account: 'Account 1',
  },
  'select-ETH': {
    action: 'selectOption',
    index: 0,
  },
  'set-new-greeting-input-1': {
    action: 'fillInput',
    text: newGreeting1,
  },
  'send-change-greeting-1': {
    action: 'clickButtonByText',
    buttonText: 'Change greeting',
  },
  'confirm-transaction-1': {
    action: 'confirmTransaction',
  },
  'wait-for-transaction-1': {
    action: 'wait',
    timeout: 8000,
  },
  'check-for-new-greeting-1': {
    action: 'findText',
    text: newGreeting1,
  },
  'compile-erc20-paymaster': {
    action: 'runCommand',
    useSetCommand: 'npm install && npm run compile',
    commandFolder: 'code/frontend-paymaster/contracts',
  },
  'create-env-for-deploying': {
    action: 'writeToFile',
    filepath: 'code/frontend-paymaster/contracts/.env',
    useSetData: 'WALLET_PRIVATE_KEY=0x3d3cbc973389cb26f657686445bcc75662b415b656078503592ac8c1abb8810e',
  },
  'deploy-erc20': {
    action: 'runCommand',
    useSetCommand: 'npm run deploy:erc20',
    commandFolder: 'code/frontend-paymaster/contracts',
    saveOutput: 'tests-output/frontend-paymaster/contracts/deployed-erc20.txt',
  },
  'get-allowed-token-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/frontend-paymaster/contracts/deployed-erc20.txt',
    envFilepath: 'code/frontend-paymaster/contracts/.env',
    variableName: 'ALLOWED_TOKEN',
    regex: /0x[a-fA-F0-9]{40}/,
  },
  'deploy-paymaster': {
    action: 'runCommand',
    useSetCommand: 'npm run deploy:paymaster',
    commandFolder: 'code/frontend-paymaster/contracts',
    saveOutput: 'tests-output/frontend-paymaster/contracts/deployed-paymaster.txt',
  },
  'get-erc20-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/frontend-paymaster/contracts/deployed-erc20.txt',
    envFilepath: 'tests-output/frontend-paymaster/frontend/.env',
    variableName: 'VITE_TEST_TOKEN_ADDRESS',
    regex: /0x[a-fA-F0-9]{40}/,
  },
  'get-paymaster-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/frontend-paymaster/contracts/deployed-paymaster.txt',
    envFilepath: 'tests-output/frontend-paymaster/frontend/.env',
    variableName: 'VITE_TESTNET_PAYMASTER_ADDRESS',
    regex: /0x[a-fA-F0-9]{40}/,
  },
  'uncomment-erc20-option': {
    action: 'modifyFile',
    filepath: 'tests-output/frontend-paymaster/frontend/src/App.vue',
    atLine: 141,
    removeLines: [141, '-->', 146],
    useSetData: ` {
     address: import.meta.env.VITE_TEST_TOKEN_ADDRESS ?? '',
     decimals: 18,
     name: 'DefaultTokenName',
     symbol: 'DTN',
   },`,
  },
  'select-erc20': {
    action: 'selectOption',
    index: 1,
  },
  'set-new-greeting-input-2': {
    action: 'fillInput',
    text: newGreeting2,
  },
  'send-change-greeting-2': {
    action: 'clickButtonByText',
    buttonText: 'Change greeting',
  },
  'confirm-transaction-2': {
    action: 'confirmTransaction',
  },
  'wait-for-transaction-2': {
    action: 'wait',
    timeout: 8000,
  },
  'check-for-new-greeting-2': {
    action: 'findText',
    text: newGreeting2,
  },
};
