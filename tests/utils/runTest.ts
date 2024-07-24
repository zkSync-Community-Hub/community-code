import type { Page } from '@playwright/test';

import { runCommand } from './runCommand';
import { getTestActions } from './getTestActions';
import { visit } from './visit';
import { compareToFile, modifyFile, writeToFile } from './files';
import { checkIfBalanceIsZero } from './queries';

export async function runTest(page: Page, url: string) {
  await visit(page, url);
  console.log('GETTING TEST ACTIONS');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps: any[] = await getTestActions(page);

  console.log('STARTING TEST');
  for (const step of steps) {
    console.log('STEP:', step);
    await page.waitForTimeout(1000);
    switch (step['data-name']) {
      case 'runCommand':
        await runCommand(
          page,
          step.id,
          step['data-command-folder'],
          step['data-project-folder'],
          step['data-pre-command']
        );
        break;
      case 'wait':
        await page.waitForTimeout(Number.parseInt(step['data-timeout']));
        break;
      case 'writeToFile':
        await writeToFile(page, step.id, step['data-filepath']);
        break;
      case 'modifyFile':
        await modifyFile(
          page,
          step.id,
          step['data-filepath'],
          Number.parseInt(step['data-add-spaces-before']),
          step['data-add-spaces-after'],
          Number.parseInt(step['data-at-line']),
          step['data-remove-lines'],
          step['data-use-set-data']
        );
        break;
      case 'compareToFile':
        await compareToFile(page, step.id, step['data-filepath']);
        break;
      case 'checkIfBalanceIsZero':
        await checkIfBalanceIsZero(step['data-network-url'], step['data-address']);
        break;
      default:
        console.log('STEP NOT FOUND:', step);
    }
  }
}
