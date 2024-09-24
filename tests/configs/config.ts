import { steps as erc20PaymasterSteps } from './erc20-paymaster';
import { steps as howToTestContractsSteps } from './how-to-test-contracts';
import { steps as dailySpendLimitSteps } from './daily-spend-limit';
import { steps as signingWithWebAuthnSteps } from './signing-txns-with-webauthn';
import { steps as multisigSteps } from './native-aa-multisig';

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
    case 'signing-txns-with-webauthn':
      steps = signingWithWebAuthnSteps;
      break;
    case 'native-aa-multisig':
      steps = multisigSteps;
      break;
    default:
      break;
  }

  return steps;
}
