import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export function Layout({ children, isHome }: { children: React.ReactNode; isHome?: boolean }) {
  return (
    <div className={inter.className}>
      {!isHome && (
        <div style={{ margin: '2rem 1rem' }}>
          <Link
            style={buttonStyles}
            href="/"
          >
            Home
          </Link>
        </div>
      )}
      <main style={styles}>{children}</main>
    </div>
  );
}

const styles = {
  padding: '2rem',
  minHeight: '100vh',
};

const buttonStyles = {
  background: 'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)',
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
