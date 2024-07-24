import { writeFileSync, appendFileSync, readFileSync } from 'node:fs';
import { clickCopyButton } from './button';
import { expect, type Page } from '@playwright/test';
import { EOL } from 'os';

export async function writeToFile(page: Page, buttonName: string, filePath: string) {
  const content = await clickCopyButton(page, buttonName);
  writeFileSync(filePath, `${content}\n\n`);
}

export async function modifyFile(
  page: Page,
  buttonName: string,
  filePath: string,
  addSpacesBefore?: number,
  addSpacesAfter?: number,
  atLine?: number,
  removeLines?: string,
  useSetData?: string
) {
  let contentText = useSetData;
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
      const removeLinesArray = JSON.parse(removeLines);
      removeLinesArray.forEach((lineNumber: string) => {
        lines[Number.parseInt(lineNumber) - 1] = '~~~REMOVE~~~';
      });
    }
    if (atLine) {
      lines.splice(atLine - 1, 0, contentText);
    }
    let finalContent = lines.filter((line: string) => line !== '~~~REMOVE~~~').join('\n');
    finalContent = spacesBefore + finalContent + spacesAfter;
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
