import type { BrowserContext, Page } from '@playwright/test';

import { runCommand } from './runCommand';
import { getTestActions } from './getTestActions';
import { visit } from './visit';
import { compareToFile, extractDataToEnv, modifyFile, writeToFile } from './files';
import { checkIfBalanceIsZero } from './queries';
import { setupFolders, startLocalServer, stopServers } from './setup';
import { getConfig } from '../configs/config';
import type { IStepConfig } from './types';
import { clickButtonByText } from './button';

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
    await runTest(page, `http://localhost:3030/tutorials${pageUrl}`, config!);
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
    console.log('STEP:', step.id);
    await page.waitForTimeout(1000);
    const stepID = step['id'];
    const stepData = config[stepID];
    if (!stepData) {
      console.log('STEP DATA NOT FOUND:', stepID);
      continue;
    }
    switch (stepData.action) {
      case 'runCommand':
        await runCommand(
          page,
          stepID,
          stepData.commandFolder,
          stepData.projectFolder,
          stepData.preCommand,
          stepData.useSetCommand,
          stepData.prompts,
          stepData.saveOutput,
          stepData.checkForOutput,
          stepData.expectError
        );
        break;
      case 'wait':
        await page.waitForTimeout(stepData.timeout);
        break;
      case 'writeToFile':
        await writeToFile(page, stepID, stepData.filepath, stepData.addSpacesAfter);
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
      case 'extractDataToEnv':
        extractDataToEnv(stepData.dataFilepath, stepData.envFilepath, stepData.regex, stepData.variableName);
        break;
      case 'clickButtonByText':
        clickButtonByText(page, stepData.buttonText);
        break;
      case 'visitURL':
        await visit(page, stepData.url);
        break;
      case 'findText':
        page.getByText(stepData.text);
        break;
      default:
        console.log('STEP NOT FOUND:', stepData);
    }
  }
}
