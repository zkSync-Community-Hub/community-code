import { connect } from '@wagmi/core';
import { injected } from '@wagmi/connectors';
import { config } from '../../wagmi-config';

export async function connectWallet() {
  try {
    await connect(config, { connector: injected() });
  } catch (error) {
    console.error('ERROR CONNECTING:', error);
  }
}
