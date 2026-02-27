'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPlaygroundsByLocation, getPlaygroundImageData } from '@/lib/playgrounds';

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

const StarIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
  </svg>
);

export default function Homepage() {
  const [postcode, setPostcode] = useState('');
  const router = useRouter();

  // Get featured playgrounds from Melbourne
  const popularPlaygrounds = getPlaygroundsByLocation(-37.8136, 145.0, 15)
    .filter(p => !p.isPaid)
    .slice(0, 4);
  
  // Get indoor play centres
  const indoorVenues = getPlaygroundsByLocation(-37.8136, 145.0, 25)
    .filter(p => p.isIndoor)
    .slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      router.push(`/search?postcode=${encodeURIComponent(postcode.trim())}`);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: 'var(--spacing-3xl) 0',
        background: 'linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center'
          }}>
            
            {/* Branding */}
            <h1 style={{ 
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-extrabold)',
              color: 'var(--color-text-dark)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Find amazing playgrounds for your kids
            </h1>
            <p style={{ 
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-text-medium)',
              marginBottom: 'var(--spacing-2xl)',
              fontWeight: 'var(--font-weight-normal)'
            }}>
              Discover free outdoor playgrounds, indoor play centres, and adventure parks across Melbourne
            </p>

            {/* Airbnb-style Search Bar */}
            <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="search-bar" style={{ height: '80px' }}>
                <div className="search-section">
                  <label className="search-label">Where</label>
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="Enter your postcode"
                    className="search-input"
                    style={{ fontSize: 'var(--font-size-base)' }}
                  />
                </div>
                <button type="submit" className="search-button" style={{ width: '56px', height: '56px' }}>
                  <SearchIcon />
                </button>
              </div>
            </form>

            {/* Popular Postcodes */}
            <div style={{ 
              marginTop: 'var(--spacing-xl)',
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-md)',
              flexWrap: 'wrap'
            }}>
              <span style={{ color: 'var(--color-text-medium)', fontSize: 'var(--font-size-sm)' }}>
                Popular:
              </span>
              {['3000', '3163', '3204', '3121', '3141'].map(code => (
                <button
                  key={code}
                  onClick={() => router.push(`/search?postcode=${code}`)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-dark)',
                    fontSize: 'var(--font-size-sm)',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Playgrounds Section */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h2>Popular Playgrounds</h2>
            <Link 
              href="/search?postcode=3000" 
              style={{ 
                color: 'var(--color-text-dark)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-medium)',
                textDecoration: 'underline'
              }}
            >
              Show all →
            </Link>
          </div>

          <div className="cards-grid">
            {popularPlaygrounds.map(playground => (
              <Link 
                key={playground.id}
                href={`/playground/${playground.slug}`}
                className="listing-card"
              >
                <div className="card-image-container">
                  {(() => {
                    const imageData = getPlaygroundImageData(playground);
                    return (
                      <img 
                        className="card-image"
                        src={imageData.mapUrl}
                        alt={`Map of ${playground.name}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    );
                  })()}
                  <div className="card-badge go-now">
                    Popular
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-location">{playground.name}</h3>
                  <p className="card-description">
                    {playground.address.split(',')[0]}
                    {playground.postcode && ` • ${playground.postcode}`}
                  </p>
                  
                  <div className="card-features">
                    <span className="card-feature">
                      🌳 {playground.shadeLevel === 'full' ? 'Full shade' : 
                           playground.shadeLevel === 'partial' ? 'Partial shade' : 'Minimal shade'}
                    </span>
                    {playground.facilities.includes('fenced') && (
                      <span className="card-feature">
                        🔒 Fenced
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: 'var(--spacing-sm)' }}>
                    <span className="card-price">Free</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Indoor Play Centres Section */}
      {indoorVenues.length > 0 && (
        <section style={{ 
          padding: 'var(--spacing-2xl) 0',
          backgroundColor: 'var(--color-background)'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 'var(--spacing-xl)'
            }}>
              <h2>Indoor Play Centres</h2>
              <Link 
                href="/search?postcode=3000" 
                style={{ 
                  color: 'var(--color-text-dark)',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  textDecoration: 'underline'
                }}
              >
                Show all →
              </Link>
            </div>

            <div className="cards-grid">
              {indoorVenues.map(venue => (
                <Link 
                  key={venue.id}
                  href={`/playground/${venue.slug}`}
                  className="listing-card"
                >
                  <div className="card-image-container">
                    {(() => {
                      const imageData = getPlaygroundImageData(venue);
                      return (
                        <img 
                          className="card-image"
                          src={imageData.mapUrl}
                          alt={`Map of ${venue.name}`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      );
                    })()}
                    <div className="card-badge" style={{ background: 'var(--color-primary)', color: 'white' }}>
                      Indoor
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="card-location">{venue.name}</h3>
                    <p className="card-description">
                      {venue.address.split(',')[0]}
                      {venue.postcode && ` • ${venue.postcode}`}
                    </p>
                    
                    <div className="card-features">
                      <span className="card-feature">
                        🏠 Indoor
                      </span>
                      {venue.hasCafe && (
                        <span className="card-feature">
                          ☕ Cafe
                        </span>
                      )}
                      {venue.ageRange && (
                        <span className="card-feature">
                          👶 {venue.ageRange}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--spacing-sm)' }}>
                      {venue.entryPrice ? (
                        <span className="card-price">{venue.entryPrice}</span>
                      ) : (
                        <span className="card-price">Call for pricing</span>
                      )}
                    </div>
                    
                    {venue.openingHours && (
                      <p className="text-small" style={{ marginTop: 'var(--spacing-xs)' }}>
                        Open: {venue.openingHours.weekend || venue.openingHours.weekday}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Simple Footer */}
      <footer style={{ 
        padding: 'var(--spacing-2xl) 0',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)'
      }}>
        <div className="container text-center">
          <Link href="/" className="logo" style={{ fontSize: 'var(--font-size-lg)' }}>LittleGo</Link>
          <p className="text-secondary" style={{ marginTop: 'var(--spacing-sm)', marginBottom: 0 }}>
            Find the perfect playground for your kids across Melbourne
          </p>
        </div>
      </footer>
    </main>
  );
}