import { InteropClient } from 'zksync-ethers';

export const GATEWAY_RPC = 'https://rpc.era-gateway-testnet.zksync.dev/';
export const GW_CHAIN_ID = BigInt('32657');
export const TOKEN_CONTRACT_ADDRESS = '0x...';
export const ABSTRACT_CONTRACT_ADDRESS = '0x...';
export const SOPHON_CONTRACT_ADDRESS = '0x...';

export const interopClient = new InteropClient({
  gateway: {
    env: 'testnet',
    gwRpcUrl: GATEWAY_RPC,
    gwChainId: GW_CHAIN_ID,
  },
});
