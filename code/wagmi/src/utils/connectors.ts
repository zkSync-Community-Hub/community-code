import { getConnectors } from '@wagmi/core';
import { config } from '../../wagmi-config';

export function fetchConnectors() {
  const connectors = getConnectors(config);
  return connectors;
}
