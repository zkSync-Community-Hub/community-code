import type { BrowserContext, Page } from '@playwright/test';

import { runCommand } from './runCommand';
import { getTestActions } from './getTestActions';
import { checkForText, visit } from './visit';
import { compareToFile, extractDataToEnv, modifyFile, writeToFile } from './files';
import { checkIfBalanceIsZero } from './queries';
import { setupFolders, startLocalServer, stopServers } from './setup';
import { getConfig } from '../configs/config';
import type { IStepConfig } from './types';
import { clickButtonByText, fillInput, selectOption } from './button';
import type { MetaMask } from '@synthetixio/synpress/playwright';
import { confirmTransaction, connectToDapp, switchNetwork } from './metamask';

export async function setupAndRunTest(
  page: Page,
  context: BrowserContext,
  pageUrls: string[],
  folderName: string,
  metamask?: MetaMask
) {
  // SETUP
  await startLocalServer(page);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await setupFolders(folderName);

  const config = getConfig(folderName);

  // TEST
  for (const pageUrl of pageUrls) {
    await runTest(page, `http://localhost:3030/tutorials${pageUrl}`, config!, metamask, context);
  }

  // SHUT DOWN ANY RUNNING PROJECTS
  stopServers();
}

export async function runTest(
  page: Page,
  url: string,
  config: IStepConfig,
  metamask?: MetaMask,
  context?: BrowserContext
) {
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
        await writeToFile(page, stepID, stepData.filepath, stepData.addSpacesAfter, stepData.useSetData);
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
        await checkForText(page, stepData.text);
        break;
      case 'confirmTransaction':
        await confirmTransaction(context!, metamask!);
        break;
      case 'connectToDapp':
        await page.waitForTimeout(4000);
        console.log('Waited for 4 seconds');
        await connectToDapp(metamask!, stepData.account ?? 'Account 1');
        break;
      case 'fillInput':
        await fillInput(page, stepData.text);
        break;
      case 'selectOption':
        await selectOption(page, stepData.index);
        break;
      case 'switchNetwork':
        await switchNetwork(metamask!);
        break;
      default:
        console.log('STEP NOT FOUND:', stepData);
    }
  }
}
