import { sendTransaction } from '@wagmi/core';
import { parseEther } from 'viem';
import { config } from '../../wagmi-config';

export async function sendTx(address: `0x${string}`, value: `${number}`) {
  const result = await sendTransaction(config, {
    to: address,
    value: parseEther(value),
  });

  return result;
}
