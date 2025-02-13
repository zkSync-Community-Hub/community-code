import type { Address } from 'viem';
import * as CONTRACT_ABI from '../../../contracts/artifacts-zk/contracts/Brickles.sol/Brickles.json';

export const ABI = CONTRACT_ABI.abi;
export const GAME_CONTRACT_ADDRESS: Address = import.meta.env.VITE_GAME_CONTRACT_ADDRESS ?? '0x...';
export const PAYMASTER_CONTRACT_ADDRESS: Address = import.meta.env.VITE_PAYMASTER_CONTRACT_ADDRESS ?? '0x...';
export const HTTP_API_URL = import.meta.env.VITE_HTTP_API_URL ?? 'http://localhost:8000';
export const WS_API_URL = import.meta.env.VITE_WS_API_URL ?? 'ws://localhost:8000';
