import type { BrowserContext, Page } from '@playwright/test';

import { runCommand } from './runCommand';
import { getTestActions } from './getTestActions';
import { visit } from './visit';
import { compareToFile, modifyFile, writeToFile } from './files';
import { checkIfBalanceIsZero } from './queries';
import { setupFolders, startLocalServer, stopServers } from './setup';
import { getConfig } from '../configs/config';
import type { IStepConfig } from './types';

export async function setupAndRunTest(
  page: Page,
  context: BrowserContext,
  folderName: string,
  pageUrls: string[],
  tutorialName: string
) {
  // SETUP
  await startLocalServer(page);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await setupFolders(folderName);

  const config = getConfig(tutorialName);

  // TEST
  for (const pageUrl of pageUrls) {
    await runTest(page, pageUrl, config!);
  }

  // SHUT DOWN ANY RUNNING PROJECTS
  stopServers();
}

export async function runTest(page: Page, url: string, config: IStepConfig) {
  await visit(page, url);
  console.log('GETTING TEST ACTIONS');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const steps: any[] = await getTestActions(page);

  console.log('STARTING TEST');
  for (const step of steps) {
    console.log('STEP:', step);
    await page.waitForTimeout(1000);
    const stepID = step['id'];
    const stepData = config[stepID];
    switch (stepData.action) {
      case 'runCommand':
        await runCommand(
          page,
          stepID,
          stepData.commandFolder,
          stepData.projectFolder,
          stepData.preCommand,
          stepData.useSetCommand,
          stepData.prompts
        );
        break;
      case 'wait':
        await page.waitForTimeout(stepData.timeout);
        break;
      case 'writeToFile':
        await writeToFile(page, stepID, stepData.filepath);
        break;
      case 'modifyFile':
        await modifyFile(
          page,
          stepID,
          stepData.filepath,
          stepData.addSpacesBefore,
          stepData.addSpacesAfter,
          stepData.atLine,
          stepData.removeLines,
          stepData.useSetData,
          stepData.getContractId
        );
        break;
      case 'compareToFile':
        await compareToFile(page, stepID, stepData.filepath);
        break;
      case 'checkIfBalanceIsZero':
        await checkIfBalanceIsZero(stepData.networkUrl, stepData.address);
        break;
      default:
        console.log('STEP NOT FOUND:', stepData);
    }
  }
}
