import { test } from '@playwright/test';
import { setupAndRunTest } from './utils/runTest';

test('Signing Transactions With WebAuthn', async ({ page, context }) => {
  await setupAndRunTest(
    page,
    context,
    [
      '/signing-transactions-with-webauthn/building-the-contracts',
      '/signing-transactions-with-webauthn/building-the-frontend',
      '/signing-transactions-with-webauthn/completing-the-frontend',
    ],
    'signing-txns-with-webauthn'
  );
});
