import type { Config, RpId } from 'react-native-zksync-sso';

export interface AccountInfo {
  name: string;
  userID: string;
  rpId: RpId;
}

export interface DeployedAccount {
  info: AccountInfo;
  address: string;
  uniqueAccountId: string;
}

export interface AccountDetails {
  info: AccountInfo;
  address: string;
  shortAddress: string;
  uniqueAccountId: string;
  explorerURL: string;
  balance?: string;
}

export type { Config };
