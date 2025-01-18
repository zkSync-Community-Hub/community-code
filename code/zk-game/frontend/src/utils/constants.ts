import type { Address } from 'viem';
import * as CONTRACT_ABI from '../../../contracts/artifacts-zk/contracts/Brickles.sol/Brickles.json';

export const ABI = CONTRACT_ABI.abi;
export const GAME_CONTRACT_ADDRESS: Address = import.meta.env.VITE_GAME_CONTRACT_ADDRESS ?? '0x...';
export const PAYMASTER_CONTRACT_ADDRESS: Address = import.meta.env.VITE_PAYMASTER_CONTRACT_ADDRESS ?? '0x...';
export const API_URL = 'http://localhost:8000';
