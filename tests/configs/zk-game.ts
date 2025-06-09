import type { IStepConfig } from '../utils/types';

const contractSteps: IStepConfig = {
  'clone-template-project': {
    action: 'runCommand',
  },
  'wait-for-clone': {
    action: 'wait',
    timeout: 5000,
  },
  'cli-create-contracts': {
    action: 'runCommand',
    prompts: 'Private key of the wallet: |❯ npm: ',
  },
  'wait-for-contracts': {
    action: 'wait',
    timeout: 5000,
  },
  'move-into-contract-folder': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game',
  },
  'delete-template-files': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
  },
  'hh-config': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/contracts/hardhat.config.ts',
    atLine: 10,
    removeLines: [10],
  },
  'create-game-contract': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
  },
  'open-game-code': {
    action: 'clickButtonByText',
    buttonText: 'Brickles.sol',
  },
  'brickles-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/contracts/Brickles.sol',
  },
  'copy-verifier-files': {
    action: 'runCommand',
    commandFolder: '.',
    useSetCommand:
      'cp $DIR_PATH/code/zk-game/contracts/contracts/ISP1Verifier.sol tests-output/zk-game/contracts/contracts && \
  cp $DIR_PATH/code/zk-game/contracts/contracts/Groth16Verifier.sol tests-output/zk-game/contracts/contracts && \
  cp $DIR_PATH/code/zk-game/contracts/contracts/SP1VerifierGroth16.sol tests-output/zk-game/contracts/contracts',
  },
  'create-deploy-scripts': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
  },
  'contracts-scripts': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/contracts/package.json',
    atLine: 9,
  },
  'add-env-pk': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/.env',
  },
  'verifier-script': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/scripts/deploy-verifier.ts',
  },
  'compile-and-deploy': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
    saveOutput: 'tests-output/zk-game/contracts/verifier.txt',
    preCommand: 'npm install && ',
  },
  'paymaster-script': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/scripts/deploy-paymaster.ts',
  },
  'deploy-paymaster': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
    saveOutput: 'tests-output/zk-game/contracts/paymaster.txt',
  },
  'game-script': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/scripts/deploy-game.ts',
  },
  'get-verifier-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/verifier.txt',
    envFilepath: 'tests-output/zk-game/contracts/.env',
    variableName: 'VERIFIER_CONTRACT_ADDRESS',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
  },
};

const programSteps: IStepConfig = {
  'create-sp1-program': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
  },
  'program-deps': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/backend/sp1_program/Cargo.toml',
    atLine: 6,
    removeLines: [6],
  },
  'proof-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/backend/sp1_program/src/main.rs',
  },
  'build-elf': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game',
  },
  'backend-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/backend/sp1_program',
  },
  'script-deps': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/backend/script/Cargo.toml',
    atLine: 6,
    removeLines: [6],
  },
  'script-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/backend/script/src/main.rs',
  },
  'get-vkey': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/contracts/.env',
    atLine: 1,
    useSetData: 'PROGRAM_VERIFICATION_KEY=0x0012d16be0dd3ea77d8967a0ee407872d9cd31c4f789473ca8ee9b30597843bd',
  },
  'deploy-game': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/backend',
    saveOutput: 'tests-output/zk-game/contracts/game.txt',
  },
  'get-game-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/game.txt',
    envFilepath: 'tests-output/zk-game/contracts/.env',
    variableName: 'GAME_CONTRACT_ADDRESS',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
  },
  'create-interact-script': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
  },
  'get-paymaster-address': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/paymaster.txt',
    envFilepath: 'tests-output/zk-game/contracts/.env',
    variableName: 'PAYMASTER_CONTRACT_ADDRESS',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
  },
  'interact-code': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/contracts/scripts/interact.ts',
  },
  'interact-proof-data': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/contracts/scripts/interact.ts',
    atLine: 11,
    removeLines: [11, 12],
    useSetData: `    publicValues: '0x0000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000286e0000000000000000000000000000000000000000000000000000000000000001',
    proofBytes: '0xa4594c5923d0562af696817f56145b3c33c7fbbdacfd4a0d247d6eade812b69e0549172e148502da16ac566f128ce4cd74020dea0c37aa9104946f2dd74c392302eb1fbb01c118a2c12d3982fbb25c149656c7b27c9611dfbc58df61f49fbe6537bc55380c20af164544490418930ba944043432cd18ab9b451fa45a18a965fedee0d7381633564411562decb64a67febda26b67a45c7c7c49c03381b50ed0dc1e1e1f8d236796ae8642a0cc91d39612e60376fc39f41742fa784f4c48c3ff7e9bb97d8b07c88acecb0a15188a612be200113a44bdc24fec6a1333753de1d0d12cb2bcde149f5da8f2ca02dede958feb344cf1fa1b243e71a03d69cc473e7c62d06b5173',`,
  },
  'run-interact': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/contracts',
    checkForOutput: 'Top scores:  Result(1) [',
  },
};

const frontendSteps: IStepConfig = {
  'install-frontend-deps': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game',
  },
  'new-env': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/frontend',
    useSetCommand: 'touch .env',
  },
  'constants-game': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/game.txt',
    envFilepath: 'tests-output/zk-game/frontend/.env',
    variableName: 'GAME_CONTRACT_ADDRESS',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
  },
  'constants-paymaster': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/paymaster.txt',
    envFilepath: 'tests-output/zk-game/frontend/.env',
    variableName: 'PAYMASTER_CONTRACT_ADDRESS',
    selector: { regex: /0x[a-fA-F0-9]{40}/ },
  },
  'wagmi-config-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/frontend',
  },
  'wagmi-imports': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'sso-connector': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'config-object': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'connect-with-sso': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'disconnect-sso': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'get-high-scores': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'ts-verify-proof-fn': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/wagmi-config.ts',
  },
  'proofs-file': {
    action: 'runCommand',
    commandFolder: 'tests-output/zk-game/frontend',
  },
  'submit-proofs-fn': {
    action: 'writeToFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/proofs.ts',
  },
  'proofs-helpers': {
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/frontend/src/utils/proofs.ts',
  },
};

const steps: IStepConfig = {
  ...contractSteps,
  ...programSteps,
  ...frontendSteps,
};

export default steps;
