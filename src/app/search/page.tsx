'use client';

import { Suspense } from 'react';
import SearchResults from './search-results';

const LoadingSpinner = () => (
  <div className="loading-spinner" style={{ 
    width: '4rem', 
    height: '4rem',
    borderWidth: '4px',
    borderColor: 'var(--color-green-medium)',
    borderTopColor: 'transparent',
    margin: '0 auto var(--space-md)'
  }}></div>
);

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, var(--color-cream), var(--color-green-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <LoadingSpinner />
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            color: 'var(--color-text-medium)' 
          }}>
            Loading search...
          </p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}