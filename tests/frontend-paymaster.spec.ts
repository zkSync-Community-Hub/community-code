import { testWithMetamask as test } from './utils/wallet-setup/testWithMetamask';
import { MetaMask } from '@synthetixio/synpress-metamask/playwright';
import setup from './utils/wallet-setup/connected.setup';
import { setupAndRunTest } from './utils/runTest';

test('Frontend Quickstart, build your first dApp', async ({ page, context, metamaskPage, extensionId }) => {
  const metamask = new MetaMask(context, metamaskPage, setup.walletPassword, extensionId);
  await setupAndRunTest(page, context, ['/frontend-paymaster'], 'frontend-paymaster', metamask);
});
