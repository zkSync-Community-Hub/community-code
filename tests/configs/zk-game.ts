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
    atLine: 9,
    removeLines: [9],
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
      'cp code/zk-game/contracts/contracts/ISP1Verifier.sol tests-output/zk-game/contracts/contracts && \
cp code/zk-game/contracts/contracts/Groth16Verifier.sol tests-output/zk-game/contracts/contracts && \
cp code/zk-game/contracts/contracts/SP1VerifierGroth16.sol tests-output/zk-game/contracts/contracts',
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
    action: 'modifyFile',
    filepath: 'tests-output/zk-game/contracts/.env',
    atLine: 1,
    removeLines: [1],
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
    regex: /0x[a-fA-F0-9]{40}/,
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
    useSetData: 'PROGRAM_VERIFICATION_KEY=0x000f81bdab8ec3f2a6c3477fbdef1eebb431f49ef59b8dcef1c1d5112ac2a59a',
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
    regex: /0x[a-fA-F0-9]{40}/,
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
    regex: /0x[a-fA-F0-9]{40}/,
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
    proofBytes: '0x11b6a09d1fb37140d2f1c6e4bd713dca7f29d5b17ffa4d1c916e5fe9e4fe9fa1eada49d91dfda738aab01575f20d97df567a8c7b959c14b01e597d7f0dd9b8c0579333d103c98b45588d3f63ee289afaed5ce1675bb5373990d2b4dd647c3c0865917595294395e6776546e25017a4ed51476f13de3a5d58c3beadc9a24b23a19216b83a0cb80cd3ee284848402f44ccbfdf78a7f05921e4e0b56d04a064b94ddc2e1a560f74be6ace6e4d3ba893b8c8ecea5cb87230ba1ed61479b7f30e0cdcbdbe8b1111026c398a661aa9004739ebc8418dc9a6226e0cd149f74185cc2b3609c664c5170a5d8ecae5ee5e98bd8f2a91c68a4993846af2aec583aac158fd519618710f',`,
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
    regex: /0x[a-fA-F0-9]{40}/,
  },
  'constants-paymaster': {
    action: 'extractDataToEnv',
    dataFilepath: 'tests-output/zk-game/contracts/paymaster.txt',
    envFilepath: 'tests-output/zk-game/frontend/.env',
    variableName: 'PAYMASTER_CONTRACT_ADDRESS',
    regex: /0x[a-fA-F0-9]{40}/,
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

export const steps: IStepConfig = {
  ...contractSteps,
  ...programSteps,
  ...frontendSteps,
};
