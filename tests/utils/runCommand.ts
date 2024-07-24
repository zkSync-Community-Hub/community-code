import type { Page } from '@playwright/test';
import { execSync } from 'node:child_process';
import { clickCopyButton } from './button';
import fs from 'fs';
import { join } from 'path';

export async function runCommand(
  page: Page,
  buttonName: string,
  goToFolder: string = 'tests-output',
  projectFolder: string = 'hardhat-project',
  preCommand?: string
) {
  const copied = await clickCopyButton(page, buttonName);
  console.log('COPIED', copied);
  let command = copied;
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

    run(command);
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
