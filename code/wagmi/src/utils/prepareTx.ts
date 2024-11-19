import { prepareTransactionRequest } from '@wagmi/core';
import { parseEther } from 'viem';
import { config } from '../../wagmi-config';

export async function prepareTx(to: `0x${string}`, value: `${number}`) {
  const tx = await prepareTransactionRequest(config, {
    to,
    value: parseEther(value),
  });

  return tx;
}
