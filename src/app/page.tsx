'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPlaygroundsByLocation } from '@/lib/playgrounds';

// SVG Icon Components
const SearchIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const LogoIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" fill="var(--color-green-medium)" stroke="white" strokeWidth="1"/>
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2"/>
  </svg>
);

const StarIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
  </svg>
);

export default function SearchFirstHomepage() {
  const [postcode, setPostcode] = useState('');
  const router = useRouter();

  // Get featured playgrounds from Melbourne
  const featuredPlaygrounds = getPlaygroundsByLocation(-37.8136, 145.0, 15).slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      router.push(`/search?postcode=${encodeURIComponent(postcode.trim())}`);
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // For now, just set Melbourne postcode as default
        setPostcode('3000');
      });
    }
  };

  return (
    <main>
      {/* Hero Search Section */}
      <section className="hero-search">
        <div className="container">
          <div style={{ 
            maxWidth: '48rem', 
            margin: '0 auto', 
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            
            {/* Logo & Branding */}
            <div style={{ marginBottom: 'var(--space-2xl)' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: 'var(--space-md)' 
              }}>
                <LogoIcon />
              </div>
              <h1 style={{ 
                fontSize: 'var(--text-5xl)',
                fontWeight: '800',
                color: 'var(--color-green-dark)',
                marginBottom: 'var(--space-sm)'
              }}>
                LittleGo
              </h1>
              <p style={{ 
                fontSize: 'var(--text-xl)',
                color: 'var(--color-text-medium)',
                fontWeight: '500'
              }}>
                Find the perfect playground for your kids
              </p>
            </div>

            {/* Main Search Form */}
            <form onSubmit={handleSearch} style={{ marginBottom: 'var(--space-xl)' }}>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--space-sm)', 
                maxWidth: '32rem', 
                margin: '0 auto',
                flexDirection: 'row'
              }}>
                <input
                  type="text"
                  placeholder="Enter your postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="form-input"
                  style={{
                    flex: 1,
                    height: '52px',
                    fontSize: '18px',
                    color: '#1b1b1e',
                    backgroundColor: '#ffffff',
                    paddingLeft: 'var(--space-lg)',
                    paddingRight: 'var(--space-lg)',
                    border: '2px solid #dddddd',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                />
                <button
                  type="submit"
                  disabled={!postcode.trim()}
                  style={{
                    height: '52px',
                    paddingLeft: 'var(--space-xl)',
                    paddingRight: 'var(--space-xl)',
                    backgroundColor: postcode.trim() ? 'var(--color-green-medium)' : '#9ca3af',
                    color: 'var(--color-white)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '18px',
                    cursor: postcode.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <SearchIcon />
                  Search
                </button>
              </div>
              
              {/* Use My Location Link */}
              <button
                type="button"
                onClick={handleUseLocation}
                style={{
                  marginTop: 'var(--space-md)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-green-medium)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <LocationIcon />
                Use my location
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* Popular Playgrounds */}
      {featuredPlaygrounds.length > 0 && (
        <section style={{ 
          padding: 'var(--space-3xl) 0',
          backgroundColor: 'var(--color-cream-light)'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              <h2 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                marginBottom: 'var(--space-sm)',
                color: 'var(--color-text-dark)'
              }}>
                Popular near Melbourne
              </h2>
              <p style={{ 
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-medium)'
              }}>
                Great playgrounds loved by local families
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)',
              maxWidth: '80rem',
              margin: '0 auto'
            }}>
              {featuredPlaygrounds.map((playground) => (
                <Link
                  key={playground.slug}
                  href={`/playground/${playground.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card" style={{
                    padding: 'var(--space-lg)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ marginBottom: 'var(--space-sm)' }}>
                      <h3 style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: '700',
                        color: 'var(--color-text-dark)',
                        marginBottom: 'var(--space-xs)'
                      }}>
                        {playground.name}
                      </h3>
                      <p style={{
                        color: 'var(--color-text-medium)',
                        fontSize: 'var(--text-sm)',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        {playground.address} • {playground.distance?.toFixed(1)} km away
                      </p>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--space-md)', 
                      marginTop: 'auto' 
                    }}>
                      {/* Go Now Score Badge */}
                      <div style={{
                        backgroundColor: playground.shadeLevel === 'full' ? 'var(--color-green-medium)' : 
                                      playground.shadeLevel === 'partial' ? '#f59e0b' : 'var(--color-coral)',
                        color: 'var(--color-white)',
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)'
                      }}>
                        <StarIcon />
                        Go Now
                      </div>

                      {/* Shade Level */}
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)'
                      }}>
                        {playground.shadeLevel === 'full' ? '🌳' : 
                         playground.shadeLevel === 'partial' ? '⛅' : '☀️'}
                        {playground.shadeLevel} shade
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
              <Link
                href="/search"
                className="btn-secondary"
                style={{
                  padding: 'var(--space-md) var(--space-xl)',
                  fontSize: 'var(--text-lg)'
                }}
              >
                Explore all playgrounds
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Search Input Focus Styling */}
      <style jsx>{`
        input[type="text"]:focus {
          border-color: #52b788 !important;
          box-shadow: 0 2px 12px rgba(82,183,136,0.2) !important;
          outline: none;
        }
        input[type="text"]::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </main>
  );
}