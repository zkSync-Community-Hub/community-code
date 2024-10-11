import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Native AA Multisig', async ({ page, context }) => {
  await setupAndRunTest(page, context, ['/native-aa-multisig'], 'native-aa-multisig');
});
