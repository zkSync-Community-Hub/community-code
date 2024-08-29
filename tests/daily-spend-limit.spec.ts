import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Daily Spending Limit Account', async ({ page, context }) => {
  await setupAndRunTest(
    page,
    context,
    'custom-spendlimit-tutorial',
    ['/daily-spend-limit-account'],
    'daily-spend-limit'
  );
});
