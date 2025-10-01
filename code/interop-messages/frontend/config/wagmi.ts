import { http, createConfig } from '@wagmi/core';
import { defineChain } from 'viem';
import {
  TOKEN_CONTRACT_ADDRESS,
  STAKING_CHAIN_1_CONTRACT_ADDRESS,
  STAKING_CHAIN_2_CONTRACT_ADDRESS,
} from './constants';

export const rewardsChain = defineChain({
  id: 37427,
  name: 'Rewards Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:3450/'],
      webSocket: ['ws://localhost:3451/'],
    },
  },
});

export const stakingChain1 = defineChain({
  id: 34234,
  name: 'Staking Chain 1',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:3050/'],
      webSocket: ['ws://localhost:3051/'],
    },
  },
});

export const stakingChain2 = defineChain({
  id: 5321,
  name: 'Staking Chain 2',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:3350/'],
      webSocket: ['ws://localhost:3351/'],
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [rewardsChain, stakingChain1, stakingChain2],
  transports: {
    [rewardsChain.id]: http(),
    [stakingChain1.id]: http(),
    [stakingChain2.id]: http(),
  },
});

export function getChainInfo(chainId: number) {
  return wagmiConfig.chains.find((c) => c.id === chainId);
}

export function getContractAddress(chainId: number) {
  switch (chainId) {
    case rewardsChain.id:
      return TOKEN_CONTRACT_ADDRESS;
      break;
    case stakingChain1.id:
      return STAKING_CHAIN_1_CONTRACT_ADDRESS;
      break;
    case stakingChain2.id:
      return STAKING_CHAIN_2_CONTRACT_ADDRESS;
      break;
    default:
      return null;
  }
}
