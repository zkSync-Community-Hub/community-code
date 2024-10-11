import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';
import { PASSWORD, SEED_PHRASE } from './config';
import { switchNetwork } from '../metamask';

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, 'MetaMask');
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);
  await switchNetwork(metamask);
});
