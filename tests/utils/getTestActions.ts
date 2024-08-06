import { type Page, expect } from '@playwright/test';

export async function getTestActions(page: Page) {
  const testActions = await page.$$eval('span[data-test-action]', (elements: Element[]) => {
    return elements.map((el) => {
      const dataAttributes: {
        [key: string]: string;
      } = {};
      const attributesArray = Array.from(el.attributes);
      for (const attr of attributesArray) {
        dataAttributes[attr.name] = attr.value;
      }
      dataAttributes['id'] = el.id;
      return dataAttributes;
    });
  });
  console.log('GOT TEST ACTIONS:', testActions);
  expect(testActions.length).toBeGreaterThan(0);
  return testActions;
}
