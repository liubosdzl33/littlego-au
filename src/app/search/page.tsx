'use client';

import { Suspense } from 'react';
import SearchResults from './search-results';

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}