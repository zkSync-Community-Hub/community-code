import { InteropClient } from 'zksync-ethers';

export const GATEWAY_RPC = 'http://localhost:3150/';
export const GW_CHAIN_ID = BigInt('506');
export const TOKEN_CONTRACT_ADDRESS = '0x...';
export const STAKING_CHAIN_1_CONTRACT_ADDRESS = '0x...';
export const STAKING_CHAIN_2_CONTRACT_ADDRESS = '0x...';

export const interopClient = new InteropClient({
  gateway: {
    env: 'local',
    gwRpcUrl: GATEWAY_RPC,
    gwChainId: GW_CHAIN_ID,
  },
});
