import type { Page } from '@playwright/test';

export async function clickButtonByText(page: Page, selector: string | RegExp) {
  const buttons = page.locator('button');
  const buttonByText = buttons.getByText(selector);
  await buttonByText.click();
  await page.waitForTimeout(1000);
}

export async function clickCopyButton(page: Page, id: string) {
  const buttonAriaLabel = 'Copy code to clipboard';
  const selector = `//*[@id='${id}']//following::button[@aria-label='${buttonAriaLabel}'][1]`;
  const button = page.locator(selector);
  await button.click();
  const rawText: string = await page.evaluate('navigator.clipboard.readText()');
  return rawText;
}

export async function selectOption(page: Page, index: number) {
  await page.selectOption('select', { index });
}

export async function fillInput(page: Page, text: string) {
  await page.fill('input[type="text"]', text);
}
