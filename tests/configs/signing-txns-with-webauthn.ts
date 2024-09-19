import type { IStepConfig } from '../utils/types';

const contractSteps: IStepConfig = {
  'make-project-folder': {
    action: 'runCommand',
  },
  'initialize-contracts': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn',
    prompts: 'Private key of the wallet: |❯ npm: ',
  },
  'wait-for-init': {
    action: 'wait',
    timeout: 5000,
  },
  'add-env-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/zksync-webauthn/contracts/.env',
    useSetData: 'WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
    atLine: 1,
    removeLines: [1],
  },
  'install-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn',
  },
  'wait-for-install': {
    action: 'wait',
    timeout: 5000,
  },
  'remove-template-files': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'create-paymaster': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'open-paymaster': {
    action: 'clickButtonByText',
    buttonText: 'GeneralPaymaster.sol',
  },
  'paymaster-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/contracts/GeneralPaymaster.sol',
  },
  'create-nft-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'open-nft': {
    action: 'clickButtonByText',
    buttonText: 'MyNFT.sol',
  },
  'nft-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/contracts/MyNFT.sol',
  },
  'create-aa-factory': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'open-aa-factory': {
    action: 'clickButtonByText',
    buttonText: 'AAFactory.sol',
  },
  'aa-factory-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/contracts/AAFactory.sol',
  },
  'create-account-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'open-account': {
    action: 'clickButtonByText',
    buttonText: 'Account.sol',
  },
  'account-contract-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/contracts/Account.sol',
  },
  'start-era-test-node': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
    preCommand: "bun pm2 start '<COMMAND>' --name era-test-node",
  },
  'open-hardhat-config': {
    action: 'clickButtonByText',
    buttonText: 'hardhat.config.ts',
  },
  'hardhat-config': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/hardhat.config.ts',
  },
  'make-deploy-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
  },
  'open-deploy-script': {
    action: 'clickButtonByText',
    buttonText: 'deploy.ts',
  },
  'deploy-script': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/contracts/deploy/deploy.ts',
  },
  'compile-and-deploy': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/contracts',
    saveOutput: 'tests-output/zksync-webauthn/contracts/deploy-output.txt',
  },
};

const frontendPart1Steps: IStepConfig = {
  'init-next-app': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn',
    preCommand: '<COMMAND> --ts --eslint --src-dir --use-npm --no-app --no-tailwind --import-alias "@/*" frontend',
  },
  'wait-for-nextjs-init': {
    action: 'wait',
    timeout: 5000,
  },
  'install-nextjs-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn',
  },
  'wait-for-nextjs-deps': {
    action: 'wait',
    timeout: 5000,
  },
  'open-home-page': {
    action: 'clickButtonByText',
    buttonText: 'index.tsx',
  },
  'home-page-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/index.tsx',
  },
  'create-env-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
    useSetCommand: 'touch .env.local',
  },
  'extract-aa-factory-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zksync-webauthn/contracts/deploy-output.txt',
    envFilepath: 'tests-output/zksync-webauthn/frontend/.env.local',
    variableName: 'NEXT_PUBLIC_AA_FACTORY_ADDRESS',
    regex: /(?<=factory address:\s*)0x[a-fA-F0-9]{40}/i,
  },
  'extract-nft-contract-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zksync-webauthn/contracts/deploy-output.txt',
    envFilepath: 'tests-output/zksync-webauthn/frontend/.env.local',
    variableName: 'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS',
    regex: /(?<=NFT CONTRACT ADDRESS:\s*)0x[a-fA-F0-9]{40}/i,
  },
  'extract-paymaster-contract-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zksync-webauthn/contracts/deploy-output.txt',
    envFilepath: 'tests-output/zksync-webauthn/frontend/.env.local',
    variableName: 'NEXT_PUBLIC_PAYMASTER_ADDRESS',
    regex: /(?<=PAYMASTER CONTRACT ADDRESS:\s*)0x[a-fA-F0-9]{40}/i,
  },
  'make-layout-component': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-layout-component': {
    action: 'clickButtonByText',
    buttonText: 'Layout.tsx',
  },
  'layout-component-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/components/Layout.tsx',
  },
  'open-styles': {
    action: 'clickButtonByText',
    buttonText: 'globals.css',
  },
  'update-styles': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/styles/globals.css',
  },
  'make-registration-api': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-registration-api': {
    action: 'clickButtonByText',
    buttonText: 'get-registration-options.ts',
  },
  'registration-api-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/api/get-registration-options.ts',
  },
  'make-auth-api': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-auth-api': {
    action: 'clickButtonByText',
    buttonText: 'get-authentication-options.ts',
  },
  'auth-api-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/api/get-authentication-options.ts',
  },
  'make-utils-folder': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'make-strings-utils': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-strings-utils': {
    action: 'clickButtonByText',
    buttonText: 'string.ts',
  },
  'strings-utils-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/utils/string.ts',
  },
  'make-tx-utils': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-tx-utils': {
    action: 'clickButtonByText',
    buttonText: 'tx.ts',
  },
  'tx-utils-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/utils/tx.ts',
  },
  'make-webauthn-utils': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-webauthn-utils': {
    action: 'clickButtonByText',
    buttonText: 'webauthn.ts',
  },
  'webauthn-utils-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/utils/webauthn.ts',
  },
};

const frontendPart2Steps: IStepConfig = {
  'make-hooks-dir': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'make-account-hook': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-account-hook': {
    action: 'clickButtonByText',
    buttonText: 'useAccount.tsx',
  },
  'account-hook-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/hooks/useAccount.tsx',
  },
  'make-wallet-hook': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-wallet-hook': {
    action: 'clickButtonByText',
    buttonText: 'useWallet.tsx',
  },
  'wallet-hook-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/hooks/useWallet.tsx',
  },
  'open-app': {
    action: 'clickButtonByText',
    buttonText: '_app.tsx',
  },
  'app-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/_app.tsx',
  },
  'make-create-account': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-create-account': {
    action: 'clickButtonByText',
    buttonText: 'create-account.tsx',
  },
  'create-account-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/create-account.tsx',
  },
  'make-register': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-register': {
    action: 'clickButtonByText',
    buttonText: 'register.tsx',
  },
  'register-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/register.tsx',
  },
  'make-transfer': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-transfer': {
    action: 'clickButtonByText',
    buttonText: 'transfer.tsx',
  },
  'transfer-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/transfer.tsx',
  },
  'make-mint': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
  },
  'open-mint': {
    action: 'clickButtonByText',
    buttonText: 'mint.tsx',
  },
  'mint-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zksync-webauthn/frontend/src/pages/mint.tsx',
  },
  'run-frontend': {
    action: 'runCommand',
    commandFolder: 'tests-output/zksync-webauthn/frontend',
    preCommand: "bun pm2 start '<COMMAND>' --name webauthn-frontend",
  },
  'wait-for-frontend': {
    action: 'wait',
    timeout: 5000,
  },
  'visit-frontend': {
    action: 'visitURL',
    url: 'http://localhost:3000/create-account',
  },
  'create-new-account': {
    action: 'clickButtonByText',
    buttonText: 'Create a New Account',
  },
  'wait-for-account': {
    action: 'wait',
    timeout: 5000,
  },
  'verify-account-made': {
    action: 'findText',
    text: 'Your current account is',
  },
};

export const steps: IStepConfig = {
  ...contractSteps,
  ...frontendPart1Steps,
  ...frontendPart2Steps,
};
