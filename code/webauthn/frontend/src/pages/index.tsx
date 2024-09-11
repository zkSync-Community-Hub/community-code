import Link from 'next/link';
import { Layout } from '../components/Layout';
import { BUTTON_COLORS } from '../../utils/constants';
import React from 'react';

export default function Home() {
  return (
    <Layout isHome>
      <h1 style={{ textAlign: 'center', margin: '4rem 1rem' }}>Sign Txns with WebAuthn Demo</h1>
      <div style={containerStyles}>
        <Link
          style={{
            ...buttonStyles,
            background: BUTTON_COLORS[0],
          }}
          href="/create-account"
        >
          Create Account
        </Link>
        <Link
          style={{
            ...buttonStyles,
            background: BUTTON_COLORS[1],
          }}
          href="/register"
        >
          Register Passkey
        </Link>
        <Link
          style={{ ...buttonStyles, background: BUTTON_COLORS[2] }}
          href="/transfer"
        >
          Transfer Funds
        </Link>
        <Link
          style={{ ...buttonStyles, background: BUTTON_COLORS[3] }}
          href="/mint"
        >
          Mint NFT
        </Link>
      </div>
    </Layout>
  );
}

export const buttonStyles = {
  padding: '1rem 2rem',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer',
  color: 'black',
  border: '1px solid white',
  fontSize: '1.2rem',
  width: '300px',
  margin: 'auto',
  textAlign: 'center',
} as React.CSSProperties;

const containerStyles = {
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '1rem',
} as React.CSSProperties;
