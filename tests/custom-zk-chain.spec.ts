import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Custom ZK Chain', async ({ page, context }) => {
  // times out after 40 min
  test.setTimeout(40 * 60 * 1000);
  await setupAndRunTest(
    page,
    context,
    ['/custom-zk-chain', '/custom-zk-chain/customizing-your-chain'],
    'custom-zk-chain'
  );
});
