import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AccountProvider } from '../hooks/useAccount';
import { WalletProvider } from '../hooks/useWallet';
import { Provider } from 'zksync-ethers';

export default function App({ Component, pageProps }: AppProps) {
  const networkProvider = new Provider('http://localhost:8011');
  return (
    <>
      <AccountProvider>
        <WalletProvider>
          <Component
            {...pageProps}
            provider={networkProvider}
          />
          ;
        </WalletProvider>
      </AccountProvider>
    </>
  );
}
