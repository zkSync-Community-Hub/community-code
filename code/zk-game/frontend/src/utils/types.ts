import type { Address } from 'viem';

export enum Controls {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

export interface Action {
  direction: Controls;
  count: number;
}

export interface ProofData {
  status: ProofStatus;
  public_values?: string;
  proof?: string;
}

export type ProofStatus = 'Pending' | 'Created' | 'Verified';

export interface Score {
  player: Address;
  blocksDestroyed: bigint;
  timeElapsed: bigint;
  timestamp?: bigint;
}
