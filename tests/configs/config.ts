import { steps as erc20PaymasterSteps } from './erc20-paymaster';
import { steps as howToTestContractsSteps } from './how-to-test-contracts';

export function getConfig(tutorialName: string) {
  let steps;
  switch (tutorialName) {
    case 'erc20-paymaster':
      steps = erc20PaymasterSteps;
      break;
    case 'how-to-test-contracts':
      steps = howToTestContractsSteps;
      break;
    default:
      break;
  }

  return steps;
}
