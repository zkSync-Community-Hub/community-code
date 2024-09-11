import Link from 'next/link';
import { Layout } from '../components/Layout';

export default function Home() {
  return (
    <Layout isHome>
      <h1 style={{ textAlign: 'center', margin: '4rem 1rem' }}>Sign Txns with WebAuthn Demo</h1>
      <div style={containerStyles}>
        <Link
          style={buttonStyles}
          href="/register"
        >
          Register Account
        </Link>
        <Link
          style={buttonStyles}
          href="/transfer"
        >
          Transfer Funds
        </Link>
        <Link
          style={buttonStyles}
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
  backgroundColor: '#0621ba',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer',
  borderColor: 'transparent',
  fontSize: '1.2rem',
  width: '300px',
  margin: 'auto',
  textAlign: 'center',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const containerStyles = {
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'column',
  gap: '1.5rem',
  marginTop: '1rem',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
