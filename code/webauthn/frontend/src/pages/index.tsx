import Link from 'next/link';
import { Layout } from '../components/Layout';

export default function Home() {
  return (
    <Layout isHome>
      <h1 style={{ textAlign: 'center' }}>Sign Txns with WebAuthn Demo</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
    </Layout>
  );
}

export const buttonStyles = {
  padding: '1rem 2rem',
  margin: '1rem',
  backgroundColor: '#0621ba',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer',
  borderColor: 'transparent',
  fontSize: '1rem',
};
