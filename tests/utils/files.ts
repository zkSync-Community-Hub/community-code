import { writeFileSync, appendFileSync, readFileSync } from 'node:fs';
import { clickCopyButton } from './button';
import { expect, type Page } from '@playwright/test';
import { EOL } from 'os';

export async function writeToFile(page: Page, buttonName: string, filePath: string, addSpacesAfter: boolean = true) {
  const content = await clickCopyButton(page, buttonName);
  writeFileSync(filePath, addSpacesAfter ? `${content}\n\n` : `${content.trimEnd()}\n`);
}

export async function modifyFile(
  page: Page,
  buttonName: string,
  filePath: string,
  addSpacesBefore?: number,
  addSpacesAfter?: number,
  atLine?: number,
  removeLines?: number[],
  useSetData?: string,
  deploymentFilePath?: string
) {
  let contentText = useSetData;

  if (deploymentFilePath) {
    const contractId = getContractId(deploymentFilePath);
    if (contentText?.includes('<*GET_CONTRACT_ID*>')) {
      contentText = contentText.replace('<*GET_CONTRACT_ID*>', contractId);
    } else {
      contentText = contractId;
    }
  }

  if (!contentText) {
    contentText = await clickCopyButton(page, buttonName);
  }
  contentText = contentText.trim().replace(/\u00A0/g, ' ');
  const spacesBefore = addSpacesBefore ? '\n'.repeat(addSpacesBefore) : '';
  const spacesAfter = addSpacesAfter ? '\n'.repeat(addSpacesAfter) : '';
  if (!atLine && !removeLines) {
    const finalContent = spacesBefore + contentText + spacesAfter;
    appendFileSync(filePath, `${finalContent}\n\n`);
  } else {
    const lines = readFileSync(filePath, 'utf8').split('\n');
    if (removeLines) {
      removeLines.forEach((lineNumber: number) => {
        lines[lineNumber - 1] = '~~~REMOVE~~~';
      });
    }
    if (atLine) {
      lines.splice(atLine - 1, 0, spacesBefore + contentText + spacesAfter);
    }
    const finalContent = lines.filter((line: string) => line !== '~~~REMOVE~~~').join('\n');
    writeFileSync(filePath, finalContent, 'utf8');
  }
}

export async function compareToFile(page: Page, buttonName: string, pathName: string) {
  const expected = await clickCopyButton(page, buttonName);
  const actual = readFileSync(pathName, { encoding: 'utf8' });
  compareOutputs(expected, actual);
}

export function compareOutputs(expected: string, actual: string) {
  const split1 = expected.trim().split(EOL);
  const split2 = actual.trim().split(EOL);
  expect(split1.length === split2.length).toBeTruthy();
  split1.forEach((line, i) => {
    const trimmedLineA = line.trim().replace(/\u00A0/g, ' ');
    const trimmedLineB = split2[i].trim().replace(/\u00A0/g, ' ');
    if (trimmedLineA !== trimmedLineB) {
      console.log('DIFFERENT LINES');
      console.log('LINE A:', trimmedLineA);
      console.log('LINE B:', trimmedLineB);
    }
    expect(trimmedLineA).toEqual(trimmedLineB);
  });
}

function getContractId(deploymentFilePath: string) {
  const deploymentFile = readFileSync(deploymentFilePath, { encoding: 'utf8' });
  const json = JSON.parse(deploymentFile);
  return json.entries[0].address;
}

export function extractDataToEnv(dataFilepath: string, envFilepath: string, regex: RegExp, variableName: string) {
  const file = readFileSync(dataFilepath, { encoding: 'utf8' });
  const regexMatches = file.match(regex);
  const data = regexMatches?.[0];
  console.log('DATA FROM REGEX:', data);
  appendFileSync(envFilepath, `${variableName}=${data}\n`);
}
