import { type Page } from '@playwright/test';

export async function clickButtonByText(page: Page, selector: string | RegExp) {
  await page.locator('button').getByText(selector).click();
}

export async function clickCopyButton(page: Page, id: string) {
  const buttonAriaLabel = 'Copy code to clipboard';
  const selector = `//*[@id='${id}']//following::button[@aria-label='${buttonAriaLabel}'][1]`;
  const button = page.locator(selector);
  await button.click();
  const rawText: string = await page.evaluate('navigator.clipboard.readText()');
  return rawText;
}
