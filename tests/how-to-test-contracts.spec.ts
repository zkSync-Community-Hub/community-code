import { test } from '@playwright/test';
import { setupFolders, stopServers, startLocalServer } from './utils/setup';
import { runTest } from './utils/runTest';

test('how-to-test-contracts-with-hardhat', async ({ page, context }) => {
  // SETUP
  await startLocalServer(page);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await setupFolders('hardhat-test-example');

  // TEST
  await runTest(page, 'http://localhost:3000/tutorials/how-to-test-contracts');

  // SHUT DOWN ANY RUNNING PROJECTS
  stopServers();
});
