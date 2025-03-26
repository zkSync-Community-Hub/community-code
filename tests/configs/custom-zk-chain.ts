import type { IStepConfig } from '../utils/types';

const chainID = 281;

const partOneSteps: IStepConfig = {
  'project-folder': {
    action: 'runCommand',
    useSetCommand: 'mkdir custom-zk-chain',
  },
  'create-ecosystem': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain',
    useSetCommand: `zkstack ecosystem create --ecosystem-name my_elastic_network --l1-network localhost --chain-name zk_chain_1 --chain-id 271 --prover-mode no-proofs --wallet-creation localhost --l1-batch-commit-data-generator-mode rollup --evm-emulator false --base-token-address 0x0000000000000000000000000000000000000001 --start-containers true --base-token-price-nominator 1 --base-token-price-denominator 1`,
    prompts: 'Clone for me:',
    waitTime: 60000 * 4,
  },
  'move-to-ecosystem-folder': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain',
  },
  'add-tsconfig': {
    action: 'writeToFile',
    filepath: 'tests-output/tsconfig.json',
    useSetData: `{
    "compilerOptions": {
        "target": "es2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true
    }
  }
  `,
  },
  'init-ecosystem': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    waitTime: 60000 * 6,
  },
  'start-server': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    preCommand: "bun pm2 start '<COMMAND>' --name zk_chain_1_server",
    waitTime: 30000,
  },
  'deposit-eth': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    prompts:
      'Amount to deposit:9|Private key of the sender:0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110|Recipient address on L2:',
  },
  'check-balance': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
  },
  'create-test-project': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain',
    prompts: 'Private key of the wallet responsible:',
  },
  'npm-install': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
    useSetCommand: 'npm install',
  },
  'add-pk': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-zk-chain/zk-chain-test/.env',
    useSetData: `WALLET_PRIVATE_KEY=0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110`,
    atLine: 1,
    removeLines: [1],
  },
  'change-network': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-zk-chain/zk-chain-test/hardhat.config.ts',
    atLine: 9,
    removeLines: [9],
  },
  'compile-and-deploy': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
  },
};

const partTwoSteps: IStepConfig = {
  'new-hh-project': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain',
    projectFolder: 'base-token-contract',
  },
  'install-token-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/base-token-contract',
  },
  'hh-config': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-zk-chain/base-token-contract/hardhat.config.ts',
  },
  'create-env': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/base-token-contract',
  },
  'new-env': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-zk-chain/my_elastic_network/configs/wallets.yaml',
    envFilepath: 'tests-output/custom-zk-chain/base-token-contract/.env',
    selector: { yaml: 'governor.private_key', isHexValue: true },
    variableName: 'WALLET_PRIVATE_KEY',
  },
  'rename-contract-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/base-token-contract',
  },
  'token-contract': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-zk-chain/base-token-contract/contracts/CustomBaseToken.sol',
  },
  'rename-module': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/base-token-contract',
  },
  'new-deploy-module': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-zk-chain/base-token-contract/ignition/modules/CustomBaseToken.ts',
  },
  'ignore-deploy-confirm': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-zk-chain/base-token-contract/.env',
    atLine: 2,
    useSetData: 'HARDHAT_IGNITION_CONFIRM_DEPLOYMENT=false',
  },
  'deploy-token-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/base-token-contract',
    saveOutput: 'tests-output/custom-zk-chain/base-token-contract/deployed.txt',
  },
  'get-contract-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-zk-chain/base-token-contract/deployed.txt',
    envFilepath: 'tests-output/custom-zk-chain/my_elastic_network/.env',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
    variableName: 'BASE_TOKEN_ADDRESS',
  },
  'get-gov-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-zk-chain/my_elastic_network/configs/wallets.yaml',
    envFilepath: 'tests-output/custom-zk-chain/my_elastic_network/.env',
    selector: { yaml: 'governor.address', isHexValue: true },
    variableName: 'GOVERNOR_ADDRESS',
  },
  'check-token-balance': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    replaceString: '<0xYOUR_TOKEN_ADDRESS>:$BASE_TOKEN_ADDRESS|<0xYOUR_GOVERNOR_ADDRESS>:$GOVERNOR_ADDRESS',
    preCommand: 'source .env && <COMMAND>',
    checkForOutput: '100000000000000000000 [1e20]',
  },
  'shutdown-server': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    useSetCommand: 'bun pm2 stop zk_chain_1_server',
  },
  'create-new-chain': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    preCommand: `source .env && <COMMAND> --chain-name custom_zk_chain --chain-id ${chainID} --prover-mode no-proofs --wallet-creation localhost --l1-batch-commit-data-generator-mode rollup --base-token-address $BASE_TOKEN_ADDRESS --base-token-price-nominator 1 --base-token-price-denominator 1 --set-as-default true --evm-emulator false`,
    waitTime: 30000,
  },
  'init-new-chain': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    waitTime: 60000 * 5,
  },
  'start-server-2': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/my_elastic_network',
    preCommand: `bun pm2 start '<COMMAND>' --name custom_zk_chain`,
    waitTime: 30000,
  },
  'new-bridge-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
  },
  'bridge-script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-zk-chain/zk-chain-test/scripts/depositBaseToken.ts',
  },
  'update-gov-pk': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/custom-zk-chain/my_elastic_network/configs/wallets.yaml',
    envFilepath: 'tests-output/custom-zk-chain/zk-chain-test/.env',
    selector: { yaml: 'governor.private_key', isHexValue: true },
    variableName: 'WALLET_PRIVATE_KEY',
  },
  'update-rpc-url': {
    action: 'modifyFile',
    filepath: 'tests-output/custom-zk-chain/zk-chain-test/hardhat.config.ts',
    atLine: 32,
    removeLines: [32],
    useSetData: `      url: 'http://localhost:3150',`,
  },
  'run-bridge-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
    checkForOutput: 'FINAL L2 Base Token Balance 🎉:',
  },
  'create-ETH-deposit-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
  },
  'ETH-deposit-script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/custom-zk-chain/zk-chain-test/scripts/depositETH.ts',
  },
  'run-ETH-deposit': {
    action: 'runCommand',
    commandFolder: 'tests-output/custom-zk-chain/zk-chain-test',
    checkForOutput: 'FINAL L2 ETH Balance 🎉',
  },
};

export const steps: IStepConfig = {
  ...partOneSteps,
  ...partTwoSteps,
};
