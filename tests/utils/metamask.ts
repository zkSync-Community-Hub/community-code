import type { MetaMask } from '@synthetixio/synpress/playwright';
import { ERA_TEST_NODE } from './wallet-setup/config';
import type { BrowserContext, Page } from '@playwright/test';
import { clickButtonByText } from './button';

export async function connectToDapp(context: BrowserContext, account: string = 'Account 1') {
  console.log('ACCOUNT', account);
  const walletPage = await getWalletPage(context);
  console.log('GOT WALLET PAGE', walletPage.url());
  await clickButtonByText(walletPage, 'Next');
  console.log('CLICKED NEXT');
  await clickButtonByText(walletPage, 'Confirm');
  console.log('CLICKED CONFIRM');
}

export async function confirmTransaction(context: BrowserContext, metamask: MetaMask) {
  const walletPage = await getWalletPage(context);
  console.log('walletPage', walletPage.url());
  await clickScrollDownButton(walletPage);
  console.log('CLICKED SCROLL DOWN BUTTON');
  await metamask.confirmTransaction();
}

// scrolls to the bottom of the confirm txn popup to enable the confirm button
async function clickScrollDownButton(page: Page) {
  await page.locator(`div[data-testid='signature-request-scroll-button']`).click();
}

const findNotificationPage = (p: Page) => {
  console.log('URL:', p.url());
  return p.url().includes('/notification.html');
};

async function getWalletPage(context: BrowserContext) {
  const pages = context.pages();
  console.log('GOT ALL PAGES');
  let walletPage = pages.find(findNotificationPage);
  if (!walletPage) {
    console.log('NO WALLET PAGE...WAITING FOR PAGE EVENT');
    walletPage = await context.waitForEvent('page', {
      predicate: findNotificationPage,
    });
  }
  return walletPage;
}

// switches the network to a local in-memory node
export async function switchNetwork(metamask: MetaMask, networkName: string = ERA_TEST_NODE.name) {
  await metamask.openSettings();
  const SidebarMenus = metamask.homePage.selectors.settings.SettingsSidebarMenus;
  await metamask.openSidebarMenu(SidebarMenus.Advanced);
  await metamask.toggleDismissSecretRecoveryPhraseReminder();
  await metamask.addNetwork(ERA_TEST_NODE);
  await metamask.switchNetwork(networkName, true);
}
