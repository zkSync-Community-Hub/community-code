import { platformAuthenticatorIsAvailable, startRegistration } from '@simplewebauthn/browser';
import { bufferToHex, parseHex } from '../../utils/string';
import * as cbor from 'cbor';
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { buttonStyles } from './index';

export default function Register() {
  const [registeredPublicKey, setRegisteredPublicKey] = useState<string>();
  const [userName, setUserName] = useState<string>();

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
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  function getPublicKeyFromAuthenticatorData(authData: string): string {
    const authDataBuffer = Buffer.from(authData, 'base64');
    const credentialData = authDataBuffer.subarray(32 + 1 + 4 + 16, authDataBuffer.length); // RP ID Hash + Flags + Counter + AAGUID
    const lbase = credentialData.subarray(0, 2).toString('hex');
    const l = parseInt(lbase, 16);
    const credentialPubKey = credentialData.subarray(2 + l, credentialData.length); // sizeof(L) + L
    return getPublicKeyFromCredentialPublicKey(credentialPubKey);
  }

  function getPublicKeyFromCredentialPublicKey(credentialPublicKey: Uint8Array): string {
    const publicKey: Map<-2 | -3 | -1 | 1 | 3, Buffer | number> = cbor.decode(credentialPublicKey);

    const x = bufferToHex(publicKey.get(-2) as Buffer);
    const y = bufferToHex(publicKey.get(-3) as Buffer);

    return x.concat(parseHex(y));
  }

  return (
    <Layout>
      <form style={{ marginTop: '1rem' }}>
        <div style={containerStyles}>
          <label
            style={{ marginRight: '1rem' }}
            htmlFor="username"
          >
            Passkey Name
          </label>

          <input
            type="text"
            name="username"
            id="username"
            placeholder="test-zksync-webauthn"
            style={{ ...inputStyles, width: '400px', marginBottom: '1rem' }}
            value={userName}
            autoComplete="webauthn register"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div style={{ ...containerStyles, marginBottom: '2rem' }}>
          <button
            type="submit"
            style={buttonStyles}
            onClick={registerNewPasskey}
          >
            Register New Passkey
          </button>
        </div>
      </form>

      <div style={containerStyles}>
        {registeredPublicKey && (
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(registeredPublicKey);
            }}
          >
            Registered public key! Click me to copy.
          </p>
        )}
      </div>
    </Layout>
  );
}

export const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
};

export const inputStyles = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #3557f1',
  borderRadius: '0.5rem',
};
