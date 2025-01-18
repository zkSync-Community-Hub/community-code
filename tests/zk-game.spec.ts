import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Build a ZK Game', async ({ page, context }) => {
  await setupAndRunTest(
    page,
    context,
    [
      '/build-a-zk-game/building-the-contracts',
      '/build-a-zk-game/writing-the-program',
      '/build-a-zk-game/building-the-frontend',
    ],
    'zk-game'
  );
});
