import Link from 'next/link';
import { Layout } from '../components/Layout';
import React from 'react';

export const AA_FACTORY_ADDRESS = '0x<YOUR_AA_FACTORY_ADDRESS>';

export const NFT_CONTRACT_ADDRESS = '0x<YOUR_NFT_CONTRACT_ADDRESS>';

export const PAYMASTER_ADDRESS = '0x<YOUR_PAYMASTER_ADDRESS>';

export const BUTTON_COLORS = [
  'linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)',
  'linear-gradient(90deg, #cfecd0, #ffc5ca)',
  'linear-gradient(90deg, #f598a8, #f6edb2)',
  'linear-gradient(90deg, #ee5c87, #f1a4b5, #d587b3)',
  'linear-gradient(90deg, #b9deed, #efefef)',
  'linear-gradient(90deg, #aea4e3, #d3ffe8)',
  'linear-gradient(90deg, #faf0cd, #fab397)',
];

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
