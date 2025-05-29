import { writeFileSync, appendFileSync, readFileSync } from 'node:fs';
import { clickCopyButton } from './button';
import { expect, type Page } from '@playwright/test';
import { EOL } from 'os';
import type { RangeOrIntArray, Selector, YamlData } from './types';
import YAML from 'yaml';
import { ethers } from 'ethers';

export async function writeToFile(
  page: Page,
  buttonName: string,
  filePath: string,
  addSpacesAfter: boolean = true,
  useSetData?: string
) {
  let content = useSetData;
  if (!content) {
    content = await clickCopyButton(page, buttonName);
  }
  writeFileSync(filePath, addSpacesAfter ? `${content}\n\n` : `${content.trimEnd()}\n`);
}

export async function modifyFile(
  page: Page,
  buttonName: string,
  filePath: string,
  addSpacesBefore?: number,
  addSpacesAfter?: number,
  atLine?: number,
  removeLines?: RangeOrIntArray,
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
      if (removeLines[1] === '-->' && removeLines.length === 3) {
        const start = removeLines[0];
        const end = removeLines[2];
        removeLines = Array.from({ length: end - start + 1 }, (_, i) => i + start);
      }
      removeLines.forEach((lineNumber) => {
        lines[(lineNumber as number) - 1] = '~~~REMOVE~~~';
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
  const comments = (line: string) => !line.includes('eslint-') && !line.includes('ANCHOR');
  const normaliseQuotes = (s: string) => s.replace(/['"]/g, '"').trim();
  const split1 = expected.trim().split(EOL).filter(comments);
  const split2 = actual.trim().split(EOL).filter(comments);
  expect(split1.length === split2.length).toBeTruthy();
  split1.forEach((line, i) => {
    const trimmedLineA = line.trim().replace(/\u00A0/g, ' ');
    const trimmedLineB = split2[i].trim().replace(/\u00A0/g, ' ');
    if (trimmedLineA !== trimmedLineB) {
      console.log('DIFFERENT LINES');
      console.log('LINE A:', trimmedLineA);
      console.log('LINE B:', trimmedLineB);
    }
    expect(normaliseQuotes(trimmedLineA)).toEqual(normaliseQuotes(trimmedLineB));
  });
}

function getContractId(deploymentFilePath: string) {
  const deploymentFile = readFileSync(deploymentFilePath, { encoding: 'utf8' });
  const json = JSON.parse(deploymentFile);
  return json.entries[0].address;
}

export function extractDataToEnv(dataFilepath: string, envFilepath: string, variableName: string, selector: Selector) {
  const file = readFileSync(dataFilepath, { encoding: 'utf8' });
  let data;

  if ('regex' in selector) {
    const regexMatches = file.match(selector.regex);
    data = regexMatches?.[0];
    console.log('DATA FROM REGEX:', data);
  } else {
    data = getYamlValue(file, selector);
    console.log('DATA FROM YAML:', data);
  }

  if (file.includes(variableName)) {
    // modify the existing variable
    const lines = readFileSync(envFilepath, 'utf8').split('\n');
    const newLines = lines.map((line) => {
      if (line.includes(variableName)) {
        return `${variableName}=${data}`;
      }
      return line;
    });
    writeFileSync(envFilepath, newLines.join('\n'));
    return;
  }

  appendFileSync(envFilepath, `\n${variableName}=${data}\n`);
}

function getYamlValue(file: string, selector: YamlData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = YAML.parse(file, { intAsBigInt: true }) as Record<string, any>;
  const keys = selector.yaml.split('.');
  const value = keys.reduce((obj, k) => {
    return obj && obj[k] !== undefined ? obj[k] : undefined;
  }, data);

  if (selector.isHexValue && typeof value === 'bigint') {
    const hex = ethers.toBeHex(value);
    return hex;
  }

  if (!value) {
    throw new Error(`Key ${selector.yaml} not found in the yaml file`);
  }

  return value.toString();
}
