import type { Page } from '@playwright/test';
import { exec } from 'node:child_process';
import { clickCopyButton } from './button';
import fs from 'fs';
import { join } from 'path';
import os from 'os';
import pty from 'node-pty';
import { expect } from '@playwright/test';

export async function runCommand(
  page: Page,
  buttonName: string,
  goToFolder: string = 'tests-output',
  projectFolder: string = 'hardhat-project',
  waitTime?: number,
  preCommand?: string,
  useSetCommand?: string,
  prompts?: string,
  saveOutput?: string,
  checkForOutput?: string,
  expectError?: string,
  replaceString?: string
) {
  const thisWaitTime = waitTime ? waitTime : prompts ? 35000 : 12000;
  console.log('WAIT TIME', thisWaitTime);
  let command = useSetCommand;
  if (!command) {
    command = await clickCopyButton(page, buttonName);
    console.log('COPIED', command);
  }
  if (replaceString) {
    const split = replaceString.split('|');
    split.forEach((replaceString) => {
      const splitReplace = replaceString.split(':');
      command = command?.replace(splitReplace[0], splitReplace[1]);
    });
  }
  const copied = command;
  const newHardhatProject = command.includes('npx hardhat init');

  if (newHardhatProject) {
    await createNewHHProject(goToFolder, projectFolder);
  } else {
    if (preCommand) {
      if (preCommand.includes('<COMMAND>')) {
        command = preCommand.replace('<COMMAND>', copied.trimEnd());
      } else {
        command = preCommand + copied;
      }
    }

    if (goToFolder) {
      command = `cd ${goToFolder} && ${command}`;
    }

    if (prompts) {
      await runWithPrompts(page, command, prompts);
    } else {
      await run(command, saveOutput, checkForOutput, expectError);
    }
    await page.waitForTimeout(thisWaitTime);
    console.log(`waited ${thisWaitTime / 1000} seconds`);
  }
}

async function run(command: string, saveOutput?: string, checkForOutput?: string, expectError?: string): Promise<void> {
  console.log('RUNNING COMMAND:', command);

  return new Promise<void>((resolve, reject) => {
    exec(command, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        if (expectError) {
          console.log('EXPECT ERROR', expectError);
          const hasError = [error.message, stdout, stderr].some((message) => message.includes(expectError));
          console.log('HAS ERROR', hasError);
          if (hasError) {
            resolve();
          } else {
            console.log('ERROR:', error);
            reject(new Error('Unexpected error: ' + error.message));
          }
        } else {
          console.log('ERROR:', error);
          reject(new Error('Unexpected error: ' + error.message));
        }
      } else {
        if (checkForOutput) {
          expect(stdout).toContain(checkForOutput);
          console.log('✅ FOUND OUTPUT:', checkForOutput);
        }

        if (saveOutput && stdout) {
          fs.writeFileSync(saveOutput, stdout);
        }

        resolve();
      }
    });
  });
}

async function createNewHHProject(goToFolder: string, projectFolder: string) {
  const repoDir = 'hardhat';
  if (!fs.existsSync(join(goToFolder, repoDir))) {
    const command = `cd ${goToFolder} && git clone https://github.com/NomicFoundation/hardhat.git`;
    await run(command);
  }
  const folderToCopy = 'packages/hardhat-core/sample-projects/typescript';

  const sourceFolder = join(goToFolder, repoDir, folderToCopy);
  const destinationFolder = join(goToFolder, projectFolder);
  copyFolder(sourceFolder, destinationFolder);
  const installCommand = `cd ${destinationFolder} && npm init -y && npm install --save-dev "hardhat@^2.22.6" "@nomicfoundation/hardhat-toolbox@^5.0.0" `;
  await run(installCommand);
}

function copyFolder(source: string, destination: string) {
  fs.mkdirSync(destination, { recursive: true });

  const copyRecursive = (src: string, dest: string) => {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach((item) => {
        copyRecursive(join(src, item), join(dest, item));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

  copyRecursive(source, destination);
}

export async function runWithPrompts(page: Page, command: string, prompts: string) {
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env,
  });

  const promptsArray = prompts.split('|').map((pair) => {
    const [prompt, answer] = pair.split(':');
    return { prompt, answer };
  });

  ptyProcess.onData((data) => {
    console.log('DATA:', data);

    for (let index = 0; index < promptsArray.length; index++) {
      const promptObject = promptsArray[index];
      if (data.includes(promptObject.prompt)) {
        console.log('FOUND PROMPT:', promptObject.prompt);
        ptyProcess.write(promptObject.answer + '\r');
      }
    }
  });

  ptyProcess.write(command + '\r');
}
