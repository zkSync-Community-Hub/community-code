import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Using Wagmi with ZKsync', async ({ page, context }) => {
  await setupAndRunTest(page, context, ['/guide-wagmi'], 'wagmi');
});
