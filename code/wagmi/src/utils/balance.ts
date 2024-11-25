import { getBalance } from '@wagmi/core';
import { config } from '../../wagmi-config';

export async function fetchBalance() {
  const address = '0xBC989fDe9e54cAd2aB4392Af6dF60f04873A033A';
  const balance = await getBalance(config, { address });
  return balance.value;
}
