'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [postcode, setPostcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    
    setIsLoading(true);
    // Navigate to search results
    router.push(`/search?postcode=${postcode.trim()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              🏃‍♀️ LittleGo
            </h1>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Where should we{' '}
            <span className="text-green-600">little go</span>{' '}
            today?
          </h2>

          {/* Explainer */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Find the best playground for your kids right now — based on{' '}
            <span className="font-semibold text-green-600">age</span>,{' '}
            <span className="font-semibold text-green-600">shade</span>,{' '}
            <span className="font-semibold text-green-600">weather</span> &{' '}
            <span className="font-semibold text-green-600">UV</span>
          </p>

          {/* Search Form */}
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="bg-white rounded-full shadow-xl border-2 border-yellow-200 overflow-hidden">
                <div className="flex items-center p-2">
                  <input
                    type="text"
                    placeholder="Enter your postcode (e.g. 3163)"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="flex-1 px-6 py-4 text-lg bg-transparent outline-none placeholder-gray-400"
                    maxLength={4}
                    pattern="[0-9]{4}"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !postcode.trim()}
                    className="btn-primary m-1 min-w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Finding...
                      </div>
                    ) : (
                      '🔍 Find Parks'
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Examples */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Try:</span>
              {['3163', '3204', '3162', '3187'].map((code) => (
                <button
                  key={code}
                  onClick={() => setPostcode(code)}
                  className="text-sm bg-white hover:bg-yellow-50 text-gray-700 px-3 py-1 rounded-full border border-gray-200 transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🌤️</div>
            <h3 className="font-bold text-lg mb-2">Live Weather</h3>
            <p className="text-gray-600">
              Real-time weather, UV levels, and wind conditions to keep your kids safe
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold text-lg mb-2">Age-Perfect</h3>
            <p className="text-gray-600">
              Find playgrounds suited for toddlers, kinder, primary, or older kids
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🌳</div>
            <h3 className="font-bold text-lg mb-2">Shade Smart</h3>
            <p className="text-gray-600">
              Know which parks have shade when you need it most
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Smart recommendations in seconds
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 mb-3">
                1
              </div>
              <p className="text-gray-600">Enter your postcode</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3">
                2
              </div>
              <p className="text-gray-600">We check weather & UV</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 mb-3">
                3
              </div>
              <p className="text-gray-600">Get your "Go Now" score!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2024 LittleGo. Made with 💚 for Australian parents.</p>
        </div>
      </footer>
    </main>
  );
}