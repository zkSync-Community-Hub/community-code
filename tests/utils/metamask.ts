import type { MetaMask } from '@synthetixio/synpress/playwright';
import { ERA_TEST_NODE } from './wallet-setup/config';
import type { BrowserContext, Page, Locator } from '@playwright/test';
import { z } from 'zod';

const selectors = {
  accountOption: '.choose-account-list .choose-account-list__list .choose-account-list__account',
  accountCheckbox: 'input.choose-account-list__list-check-box',
  confirmActionButton: `.page-container__footer [data-testid="page-container-footer-next"]}`,
};

async function selectAccounts(accountsToSelect: string[], accountLocators: Locator[], availableAccountNames: string[]) {
  for (const account of accountsToSelect) {
    console.log('account', account);
    const accountNameIndex = availableAccountNames.findIndex((name) => name.startsWith(account));
    console.log('accountNameIndex', accountNameIndex);
    if (accountNameIndex < 0) throw new Error(`[ConnectToDapp] Account with name ${account} not found`);
    await accountLocators[accountNameIndex]?.locator(selectors.accountCheckbox).check();
    console.log('SELECTED ACCOUNT');
  }
}

async function connectMultipleAccounts(notificationPage: Page, accounts: string[]) {
  // Wait for the accounts to be loaded as 'all()' doesnt not wait for the results - https://playwright.dev/docs/api/class-locator#locator-all
  // Additionally disable default account to reuse necessary delay
  // console.log('DISABLING DEFAULT ACCOUNT');
  // await notificationPage.locator(selectors.accountOption).locator(selectors.accountCheckbox).last().setChecked(false);
  console.log('GETTING ACCOUNT LOCATORS');
  const accountLocators = await notificationPage.locator(selectors.accountOption).all();
  console.log('accountLocators', accountLocators);
  const accountNames = await allTextContents(accountLocators);
  console.log('accountNames', accountNames);

  await selectAccounts(accounts, accountLocators, accountNames);
}

async function confirmConnection(notificationPage: Page) {
  // Click `Next`
  await notificationPage.locator(selectors.confirmActionButton).click();
  console.log('CLICKED NEXT BUTTON');
  // Click `Connect`
  await notificationPage.locator(selectors.confirmActionButton).click();
  console.log('CLICKED CONNECT BUTTON');
}

// By default, only the last account will be selected. If you want to select a specific account, pass `accounts` parameter.
export async function connectToDapp(notificationPage: Page, accounts?: string[]) {
  console.log('ACCOUNTS:', accounts);
  if (accounts && accounts.length > 0) {
    await connectMultipleAccounts(notificationPage, accounts);
  }
  console.log('CONFIRMING CONNECTION');
  await confirmConnection(notificationPage);
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

async function getWalletPage(context: BrowserContext) {
  const pages = context.pages();
  let walletPage = pages.find((p: Page) => p.url().includes('/notification.html'));
  if (!walletPage) {
    walletPage = await context.waitForEvent('page', {
      predicate: (page: Page) => page.url().includes('/notification.html'),
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

export async function allTextContents(locators: Locator[]) {
  const names = await Promise.all(locators.map((locator) => locator.textContent()));

  // We're making sure that the return type is `string[]` same as `locator.allTextContents()`.
  return names.map((name) => z.string().parse(name));
}
