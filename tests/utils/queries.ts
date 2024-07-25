import { expect } from '@playwright/test';
import { Provider } from 'zksync-ethers';

export async function checkIfBalanceIsZero(networkUrl: string, address: string) {
  const provider = new Provider(networkUrl);
  const balance = await provider.getBalance(address);
  expect(balance).toBeGreaterThan(0);
}
