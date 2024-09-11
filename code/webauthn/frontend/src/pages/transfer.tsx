/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from 'zksync-ethers';
import { getDataToSign, signAndSend } from '../../utils/sign';
import { getTransaction } from '../../utils/getTransaction';
import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles } from '.';
import { containerStyles, headerStyles, inputStyles, labelStyles } from './register';
import { formatEther } from 'ethers/lib/utils';
import { authenticate } from '../../utils/webauthn';

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

  async function updateBalances(newReceiverAddress?: string) {
    try {
      const bal1 = await provider.getBalance(ACCOUNT_ADDRESS);
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

  async function handleReceiverAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReceiverAddress(e.target.value);
    await updateBalances(e.target.value);
  }

  return (
    <Layout>
      <h1 style={headerStyles}>Transfer Funds</h1>
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
            style={buttonStyles}
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
