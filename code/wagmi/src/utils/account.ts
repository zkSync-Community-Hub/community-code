import { getAccount } from '@wagmi/core';
import { config } from '../../wagmi-config';

export function fetchAccount() {
  const { address } = getAccount(config);
  return address;
}
