import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '../wagmi-config';
import { useEffect, useState } from 'react';
import { ConnectWallet } from './components/ConnectWallet';
import { ConnectWalletTS } from './components/ConnectWalletTS';
import { ShowConnectors } from './components/ShowConnectors';
import { ShowConnectorsTS } from './components/ShowConnectorsTS';
import { Account } from './components/Account';
import { AccountTS } from './components/AccountTS';
import { Balance } from './components/Balance';
import { BalanceTS } from './components/BalanceTS';
import { Block } from './components/Block';
import { BlockTS } from './components/BlockTS';
import { SendTx } from './components/SendTx';
import { SendTxTS } from './components/SendTxTS';
import { SendTxPrepared } from './components/SendTxPrepared';
import { SendTxPreparedTS } from './components/SendTxPreparedTS';
import { SignMessage } from './components/SignMessage';
import { SignMessageTS } from './components/SignMessageTS';
import { SignTypedData } from './components/SignTypedData';
import { SignTypedDataTS } from './components/SignTypedDataTS';
import { ReadContract } from './components/ReadContract';
import { ReadContractTS } from './components/ReadContractTS';
import { WriteContract } from './components/WriteContract';
import { WriteContractTS } from './components/WriteContractTS';

const queryClient = new QueryClient();

function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div>
        <main>
          {mounted && (
            <>
              <ConnectWallet />
              <ConnectWalletTS />
              <ShowConnectors />
              <ShowConnectorsTS />
              <Account />
              <AccountTS />
              <Balance />
              <BalanceTS />
              <Block />
              <BlockTS />
              <SendTx />
              <SendTxTS />
              <SendTxPrepared />
              <SendTxPreparedTS />
              <SignMessage />
              <SignMessageTS />
              <SignTypedData />
              <SignTypedDataTS />
              <ReadContract />
              <ReadContractTS />
              <WriteContract />
              <WriteContractTS />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
