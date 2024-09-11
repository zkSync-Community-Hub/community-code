import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type AccountContext = string | null;

const AccountCtx = createContext<AccountContext>(null);
const SetAccountCtx = createContext<(value: AccountContext) => void>(() => {});

export function useAccount() {
  return useContext(AccountCtx);
}

export function useSetAccount() {
  return useContext(SetAccountCtx);
}

interface AccountProviderProps {
  children: ReactNode;
}

const storageLabel = 'smart-account-address';

export const AccountProvider: FC<AccountProviderProps> = ({ children }) => {
  const [state, setState] = useState<AccountContext>(() => {
    if (typeof window !== 'undefined') {
      return (sessionStorage.getItem(storageLabel) as AccountContext) || null;
    }
    return null;
  });

  const setAccount = (account: AccountContext) => {
    setState(account);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(storageLabel, account as string);
    }
  };

  return (
    <AccountCtx.Provider value={state}>
      <SetAccountCtx.Provider value={setAccount}>{children}</SetAccountCtx.Provider>
    </AccountCtx.Provider>
  );
};
