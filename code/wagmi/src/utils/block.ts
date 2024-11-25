import { getBlockNumber } from '@wagmi/core';
import { config } from '../../wagmi-config';

export async function fetchLatestBlockNumber() {
  const blockNumber = await getBlockNumber(config);
  return blockNumber;
}
