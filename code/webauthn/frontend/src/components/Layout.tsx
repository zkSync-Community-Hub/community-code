import { buttonStyles } from '@/pages';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import { BUTTON_COLORS } from '../../utils/constants';

const inter = Inter({ subsets: ['latin'] });

export function Layout({ children, isHome }: { children: React.ReactNode; isHome?: boolean }) {
  return (
    <div className={inter.className}>
      {!isHome && (
        <div style={{ margin: '2rem 1rem' }}>
          <Link
            style={{ ...buttonStyles, background: BUTTON_COLORS[7] }}
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
