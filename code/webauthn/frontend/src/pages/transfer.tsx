/* eslint-disable @typescript-eslint/no-explicit-any */
import { startAuthentication } from '@simplewebauthn/browser';
import { Provider } from 'zksync-ethers';
import { getDataToSign, signAndSend } from '../../utils/sign';
import { getTransaction } from '../../utils/getTransaction';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles } from '.';
import { containerStyles, inputStyles } from './register';
import { formatEther } from 'ethers/lib/utils';

// Update this with your deployed smart contract account address
const ACCOUNT_ADDRESS = '0x<YOUR_ACCOUNT_ADDRESS>';

export default function Transfer() {
  const [transferValue, setTransferValue] = useState<string>('1');
  const [smartAccountBalance, setSmartAccountBalance] = useState<string>();
  const [receiverAccountBalance, setReceiverAccountBalance] = useState<string>();
  const [receiverAddress, setReceiverAddress] = useState<string>('0xa61464658AfeAf65CccaaFD3a512b69A83B77618');
  const provider = new Provider('http://localhost:8011');

  useEffect(() => {
    updateBalances();
  }, []);

  async function updateBalances() {
    const bal1 = await provider.getBalance(ACCOUNT_ADDRESS);
    const bal2 = await provider.getBalance(receiverAddress);
    setSmartAccountBalance(formatEther(bal1));
    setReceiverAccountBalance(formatEther(bal2));
  }

  async function authenticate(challenge: string) {
    const resp = await fetch('http://localhost:3000/api/generate-authentication-options', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ challenge }),
    });
    const data = await resp.json();
    const options = data.options;
    const authResp = await startAuthentication(options);
    return authResp.response;
  }

  async function sendTransfer(e: any) {
    e.preventDefault();
    try {
      const data = '0x';
      const tx = await getTransaction(receiverAddress, ACCOUNT_ADDRESS, transferValue, data, provider);
      const signedTxHash = getDataToSign(tx);
      const authResponse = await authenticate(signedTxHash.toString());
      const receipt = await signAndSend(provider, tx, authResponse);
      console.log('RECEIPT:', receipt);
      updateBalances();
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  return (
    <Layout>
      <div style={containerStyles}>
        <form>
          <div>
            <label
              style={{ marginRight: '1rem' }}
              htmlFor="receiver-address"
            >
              Receiver Address
            </label>

            <input
              type="text"
              name="receiver-address"
              id="receiver-address"
              placeholder="0x..."
              style={{ ...inputStyles, width: '400px', marginBottom: '1rem' }}
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
          </div>

          <div>
            <label
              style={{ marginRight: '1rem' }}
              htmlFor="transfer-value"
            >
              Amount to Transfer:
            </label>
            <input
              type="number"
              name="transfer-value"
              id="transfer-value"
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="0.00"
              style={{ ...inputStyles, width: '180px' }}
              // value={refund}
              onChange={(e) => setTransferValue(e.target.value)}
            />{' '}
            ETH
          </div>

          <div style={{ ...containerStyles, marginBottom: '2rem' }}>
            <button
              type="submit"
              style={buttonStyles}
              onClick={sendTransfer}
            >
              Transfer ETH
            </button>
          </div>
        </form>
      </div>

      <div style={containerStyles}>Smart Account Balance: {smartAccountBalance} ETH</div>
      <div style={containerStyles}>Receiver Account Balance: {receiverAccountBalance} ETH</div>
      <div style={containerStyles}>
        <button
          style={buttonStyles}
          onClick={updateBalances}
        >
          Update Balances
        </button>
      </div>
    </Layout>
  );
}
