import { signMessage } from '@wagmi/core';
import { config } from '../../wagmi-config';

export async function getSignedMessage(message: string) {
  const signature = await signMessage(config, { message });
  return signature;
}
