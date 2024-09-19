import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles, BUTTON_COLORS } from './index';
import { useAccount } from '@/hooks/useAccount';
import { platformAuthenticatorIsAvailable, startRegistration } from '@simplewebauthn/browser';
import { getPublicKeyFromAuthenticatorData } from '../../utils/webauthn';
import { registerKeyInAccount } from '../../utils/tx';
import { useSetWallet, useWallet } from '@/hooks/useWallet';
import { Wallet, type Provider } from 'zksync-ethers';

export default function Register({ provider }: { provider: Provider }) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [registeredPublicKey, setRegisteredPublicKey] = useState<string>();
  const [userName, setUserName] = useState<string>('');
  const [accountPk, setAccountPk] = useState<string>('');

  const account = useAccount();
  const accountWallet = useWallet();
  const setWallet = useSetWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function registerNewPasskey(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const isAvailable = await platformAuthenticatorIsAvailable();

      if (!isAvailable) {
        alert('WebAuthn is not available on this device');
        return;
      }

      const resp = await fetch('http://localhost:3000/api/get-registration-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          rpId: 'localhost',
          rpName: 'localhost',
          userName,
        }),
      });
      const data = await resp.json();
      const options = data.options;
      const regResp = await startRegistration(options);
      const pubKeyFromAuth = getPublicKeyFromAuthenticatorData(regResp.response.authenticatorData!);
      console.log('PUB KEY FROM AUTH:', pubKeyFromAuth);
      setRegisteredPublicKey(pubKeyFromAuth);
      await registerKeyInAccount(pubKeyFromAuth, account!, provider, accountWallet!);
    } catch (error) {
      console.log('ERROR:', error);
      alert('Error registering new passkey');
    }
  }

  return (
    <Layout>
      <h1 style={headerStyles}>Register a New Passkey</h1>
      {!account && isMounted && <p style={{ textAlign: 'center' }}>Please create an account first</p>}
      {account && isMounted && !accountWallet && (
        <form style={{ marginTop: '1rem' }}>
          <p style={{ textAlign: 'center' }}>Add the private key for</p>
          <p style={{ textAlign: 'center' }}>{account}</p>
          <p style={{ textAlign: 'center' }}>or create a new account</p>
          <div style={containerStyles}>
            <label
              style={labelStyles}
              htmlFor="pk"
            >
              Private Key
            </label>

            <input
              type="text"
              name="pk"
              id="pk"
              placeholder="0x..."
              style={{ ...inputStyles, width: '300px', marginBottom: '1rem' }}
              value={accountPk}
              onChange={(e) => setAccountPk(e.target.value)}
            />
          </div>

          <div style={{ ...containerStyles, marginBottom: '2rem' }}>
            <button
              type="submit"
              style={{ ...buttonStyles, background: BUTTON_COLORS[1] }}
              onClick={() => setWallet(new Wallet(accountPk!, provider))}
            >
              Add Private Key
            </button>
          </div>
        </form>
      )}
      {account && isMounted && accountWallet && (
        <form style={{ marginTop: '1rem' }}>
          <div style={containerStyles}>
            <label
              style={labelStyles}
              htmlFor="username"
            >
              Passkey Name:
            </label>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="test-zksync-webauthn"
              style={{ ...inputStyles, width: '300px', marginBottom: '1rem' }}
              value={userName}
              autoComplete="webauthn register"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div style={{ ...containerStyles, marginBottom: '2rem' }}>
            <button
              type="submit"
              style={{ ...buttonStyles, background: BUTTON_COLORS[1] }}
              onClick={registerNewPasskey}
            >
              Register New Passkey
            </button>
          </div>
        </form>
      )}

      <div style={{ ...containerStyles, textAlign: 'center' }}>
        {registeredPublicKey && (
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(registeredPublicKey);
            }}
          >
            🎉 Registered public key to account! 🎉
          </p>
        )}
      </div>
    </Layout>
  );
}

export const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
} as React.CSSProperties;

export const inputStyles = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #3557f1',
  borderRadius: '0.5rem',
  margin: 'auto',
};

export const labelStyles = {
  margin: '1rem auto',
  fontSize: '1.2rem',
  width: '300px',
};

export const headerStyles = {
  textAlign: 'center',
  marginBottom: '2rem',
} as React.CSSProperties;
