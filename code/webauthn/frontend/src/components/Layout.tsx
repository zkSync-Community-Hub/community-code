import { buttonStyles } from '@/pages';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export function Layout({ children, isHome }: { children: React.ReactNode; isHome?: boolean }) {
  return (
    <div className={inter.className}>
      {!isHome && (
        <div style={{ marginTop: '2rem' }}>
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
