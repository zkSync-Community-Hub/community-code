import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Custom ZK Chain', async ({ page, context }) => {
  await setupAndRunTest(
    page,
    context,
    [
      // '/custom-zk-chain',
      '/custom-zk-chain/customizing-your-chain',
    ],
    'custom-zk-chain'
  );
});
