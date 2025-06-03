import erc20PaymasterSteps from './erc20-paymaster';
import howToTestContractsSteps from './how-to-test-contracts';
import dailySpendLimitSteps from './daily-spend-limit';
// import signingWithWebAuthnSteps from './signing-txns-with-webauthn';
// import multisigSteps from './native-aa-multisig';
// import frontendPaymasterSteps from './frontend-paymaster';
// import customZKChainSteps from './custom-zk-chain';
// import zkGameSteps from './zk-game';

export function getConfig(tutorialName: string) {
  let steps;
  switch (tutorialName) {
    case 'erc20-paymaster':
      steps = erc20PaymasterSteps;
      break;
    case 'how-to-test-contracts':
      steps = howToTestContractsSteps;
      break;
    case 'daily-spend-limit':
      steps = dailySpendLimitSteps;
      break;
    // case 'signing-txns-with-webauthn':
    //   steps = signingWithWebAuthnSteps;
    //   break;
    // case 'native-aa-multisig':
    //   steps = multisigSteps;
    //   break;
    // case 'frontend-paymaster':
    //   steps = frontendPaymasterSteps;
    //   break;
    // case 'custom-zk-chain':
    //   steps = customZKChainSteps;
    //   break;
    // case 'zk-game':
    //   steps = zkGameSteps;
    //   break;
    default:
      break;
  }

  return steps;
}
