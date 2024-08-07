import type { Page } from '@playwright/test';
import { execSync } from 'node:child_process';
import { clickCopyButton } from './button';
import fs from 'fs';
import { join } from 'path';
import os from 'os';
import pty from 'node-pty';

export async function runCommand(
  page: Page,
  buttonName: string,
  goToFolder: string = 'tests-output',
  projectFolder: string = 'hardhat-project',
  preCommand?: string,
  useSetCommand?: string,
  prompts?: string
) {
  const copied = await clickCopyButton(page, buttonName);
  console.log('COPIED', copied);
  let command = useSetCommand ?? copied;
  const newHardhatProject = command.includes('npx hardhat init');

  if (newHardhatProject) {
    createNewHHProject(goToFolder, projectFolder);
  } else {
    if (preCommand) {
      if (preCommand.includes('<COMMAND>')) {
        command = preCommand.replace('<COMMAND>', copied);
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
      run(command);
    }
  }
}

function run(command: string) {
  console.log('COMMAND', command);

  const commandOutput = execSync(command, {
    encoding: 'utf-8',
  });
  console.log('COMMAND OUTPUT', commandOutput);
}

function createNewHHProject(goToFolder: string, projectFolder: string) {
  const repoDir = 'hardhat';
  if (!fs.existsSync(join(goToFolder, repoDir))) {
    const command = `cd ${goToFolder} && git clone https://github.com/NomicFoundation/hardhat.git`;
    run(command);
  }
  const folderToCopy = 'packages/hardhat-core/sample-projects/typescript';

  const sourceFolder = join(goToFolder, repoDir, folderToCopy);
  const destinationFolder = join(goToFolder, projectFolder);
  copyFolder(sourceFolder, destinationFolder);
  const installCommand = `cd ${destinationFolder} && npm init -y && npm install --save-dev "hardhat@^2.22.6" "@nomicfoundation/hardhat-toolbox@^5.0.0" `;
  run(installCommand);
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

  await page.waitForTimeout(35000);
  console.log('waited 35 seconds');
}
