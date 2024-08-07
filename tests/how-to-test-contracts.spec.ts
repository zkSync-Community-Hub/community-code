import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('How to test smart contracts with Hardhat', async ({ page, context }) => {
  await setupAndRunTest(
    page,
    context,
    'hardhat-project',
    ['http://localhost:3000/tutorials/how-to-test-contracts'],
    'how-to-test-contracts'
  );
});
