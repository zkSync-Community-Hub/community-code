import type { Wallet } from 'zksync-ethers';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type WalletContext = Wallet | null;

const WalletCtx = createContext<WalletContext>(null);
const SetWalletCtx = createContext<(value: WalletContext) => void>(() => {});

export function useWallet() {
  return useContext(WalletCtx);
}

export function useSetWallet() {
  return useContext(SetWalletCtx);
}

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
  const [state, setState] = useState<WalletContext>(null);

  const setWallet = (wallet: WalletContext) => {
    setState(wallet);
  };

  return (
    <WalletCtx.Provider value={state}>
      <SetWalletCtx.Provider value={setWallet}>{children}</SetWalletCtx.Provider>
    </WalletCtx.Provider>
  );
};
