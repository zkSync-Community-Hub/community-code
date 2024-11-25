import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Build an ERC20 custom paymaster', async ({ page, context }) => {
  await setupAndRunTest(page, context, ['/erc20-paymaster'], 'erc20-paymaster');
});
