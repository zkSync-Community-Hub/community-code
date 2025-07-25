// ANCHOR: imports
import sdk, { type AccountBalance, type Account, getBalance, getAccountByUserId } from 'react-native-zksync-sso';
import { loadConfig } from './loadConfig';
import type { AccountDetails, AccountInfo, DeployedAccount } from '../types/types';
// ANCHOR_END: imports

// ANCHOR: createPasskey
export const createPasskey = async (accountInfo: AccountInfo): Promise<DeployedAccount> => {
  const config = loadConfig();
  const challenge = sdk.utils.generateRandomChallenge();
  const rpIdString = sdk.utils.getRpIdString(accountInfo.rpId);
  const account = await sdk.register.registerAccountWithUniqueId(
    {
      name: accountInfo.name,
      userID: accountInfo.userID,
      rp: {
        name: rpIdString,
        id: accountInfo.rpId,
      },
    },
    challenge,
    config
  );
  return {
    info: accountInfo,
    address: account.address,
    uniqueAccountId: account.uniqueAccountId,
  };
};
// ANCHOR_END: createPasskey

// ANCHOR: getAccountByUserIdWrapper
export const getAccountByUserIdWrapper = async (uniqueAccountId: string): Promise<Account> => {
  const config = loadConfig();
  const account: Account = await getAccountByUserId(uniqueAccountId, config);
  return account;
};
// ANCHOR_END: getAccountByUserIdWrapper

// ANCHOR: loadBalance
export const loadBalance = async (address: string): Promise<string> => {
  const config = loadConfig();
  const balance: AccountBalance = await getBalance(address, config);
  return balance.balance;
};
// ANCHOR_END: loadBalance

// ANCHOR: createAccountDetails
export function createAccountDetails(
  accountInfo: AccountInfo,
  deployedAccount: Account,
  balance?: string
): AccountDetails {
  const address = deployedAccount.address;
  return {
    info: accountInfo,
    address,
    shortAddress: shortenAddress(address),
    uniqueAccountId: deployedAccount.uniqueAccountId,
    explorerURL: `https://sepolia.explorer.zksync.io/address/${address}`,
    balance,
  };
}

function shortenAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
// ANCHOR_END: createAccountDetails
