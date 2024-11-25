import { signTypedData, type SignTypedDataParameters } from '@wagmi/core';
import { config } from '../../wagmi-config';

export async function getSignedTypedData(data: SignTypedDataParameters) {
  const signature = await signTypedData(config, data);
  return signature;
}
