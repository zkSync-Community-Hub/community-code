/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Provider } from 'zksync-ethers';
import { getTransaction } from '../../utils/tx';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles } from '.';
import { containerStyles, headerStyles, inputStyles, labelStyles } from './register';
import { formatEther } from 'ethers/lib/utils';
import { authenticate, getDataToSign, signAndSend } from '../../utils/webauthn';
import { BUTTON_COLORS } from '@/pages/index';
import { useAccount } from '@/hooks/useAccount';

export default function Transfer({ provider }: { provider: Provider }) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [transferValue, setTransferValue] = useState<string>('1');
  const [smartAccountBalance, setSmartAccountBalance] = useState<string>();
  const [receiverAccountBalance, setReceiverAccountBalance] = useState<string>();
  const [receiverAddress, setReceiverAddress] = useState<string>('0xa61464658AfeAf65CccaaFD3a512b69A83B77618');

  const account = useAccount();

  useEffect(() => {
    updateBalances();
    setIsMounted(true);
  }, []);

  async function updateBalances(newReceiverAddress?: string) {
    try {
      const bal1 = await provider.getBalance(account!);
      const bal2 = await provider.getBalance(newReceiverAddress ?? receiverAddress);
      setSmartAccountBalance(formatEther(bal1));
      setReceiverAccountBalance(formatEther(bal2));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      setReceiverAccountBalance('Loading...');
    }
  }

  async function sendTransfer(e: any) {
    e.preventDefault();
    try {
      const data = '0x';
      const tx = await getTransaction(receiverAddress, account!, transferValue, data, provider);
      const signedTxHash = getDataToSign(tx);
      const authResponse = await authenticate(signedTxHash.toString());
      const receipt = await signAndSend(provider, tx, authResponse);
      console.log('RECEIPT:', receipt);
      updateBalances();
    } catch (error) {
      console.log('ERROR:', error);
      alert('Error sending ETH');
    }
  }

  async function handleReceiverAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReceiverAddress(e.target.value);
    await updateBalances(e.target.value);
  }

  return (
    <Layout>
      <h1 style={headerStyles}>Transfer Funds</h1>
      {account && isMounted ? (
        <>
          <form style={{ marginBottom: '1rem' }}>
            <div style={containerStyles}>
              <label
                style={labelStyles}
                htmlFor="receiver-address"
              >
                Receiver Address:
              </label>
              <input
                type="text"
                name="receiver-address"
                id="receiver-address"
                placeholder="0x..."
                style={{ ...inputStyles, width: '300px' }}
                value={receiverAddress}
                onChange={handleReceiverAddressChange}
              />
            </div>
            <div style={containerStyles}>
              <label
                style={labelStyles}
                htmlFor="transfer-value"
              >
                ETH Amount to Transfer:
              </label>
              <input
                type="number"
                name="transfer-value"
                id="transfer-value"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="0.00"
                style={{ ...inputStyles, width: '300px', marginBottom: '1rem' }}
                onChange={(e) => setTransferValue(e.target.value)}
              />
            </div>

            <div style={{ ...containerStyles, marginBottom: '4rem' }}>
              <button
                type="submit"
                style={{ ...buttonStyles, background: BUTTON_COLORS[2] }}
                onClick={sendTransfer}
              >
                Transfer ETH
              </button>
            </div>
          </form>
          <h3 style={{ textAlign: 'center' }}>Account Balances</h3>
          <div style={centerStyles}>
            <p>Smart Account Balance:</p>
            <p> {smartAccountBalance} ETH</p>
          </div>
          <div style={centerStyles}>
            <p> Receiver Account Balance: </p>
            <p>{receiverAccountBalance} ETH</p>
          </div>
        </>
      ) : (
        <div>Please create an account first</div>
      )}
    </Layout>
  );
}

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '300px',
  margin: '1rem auto',
} as React.CSSProperties;
