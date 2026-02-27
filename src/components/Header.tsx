'use client';

import { useState } from 'react';
import Link from 'next/link';

const LogoIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" fill="var(--color-green-medium)" stroke="white" strokeWidth="1"/>
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2"/>
  </svg>
);

const MenuIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="pure-g">
          <div className="pure-u-1">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
              
              {/* Logo/Brand */}
              <Link 
                href="/" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-sm)', 
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'opacity 0.2s ease'
                }}
              >
                <LogoIcon />
                <span style={{ 
                  fontSize: 'var(--text-xl)', 
                  fontWeight: '700', 
                  color: 'var(--color-text-dark)' 
                }}>
                  LittleGo
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav style={{ display: 'none' }} className="desktop-nav">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2xl)' }}>
                  <Link href="/" className="nav-link">Home</Link>
                  <Link href="/about" className="nav-link">About</Link>
                  <Link href="/search" className="nav-link">Search</Link>
                </div>
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
                style={{
                  display: 'block',
                  padding: 'var(--space-xs)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background-color 0.2s ease',
                  color: 'var(--color-text-medium)'
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div style={{ 
                borderTop: '1px solid var(--color-cream)', 
                paddingTop: 'var(--space-md)',
                paddingBottom: 'var(--space-md)'
              }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <Link 
                    href="/" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'block', padding: 'var(--space-xs) var(--space-sm)' }}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'block', padding: 'var(--space-xs) var(--space-sm)' }}
                  >
                    About
                  </Link>
                  <Link 
                    href="/search" 
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'block', padding: 'var(--space-xs) var(--space-sm)' }}
                  >
                    Search
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}