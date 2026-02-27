'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlaygroundWithScore, WeatherData, WeatherWithForecast, AgeTag, Facility } from '@/types/playground';
import { fetchWeatherData, fetchWeatherWithForecast, calculateGoNowScore, getWeatherEmoji, getWindDescription } from '@/lib/weather';
import { getPostcodeCoordinates, getPlaygroundsByLocation, getAgeTagInfo, getFacilityInfo, getShadeInfo, getPlaygroundImageData, getEquipmentInfo } from '@/lib/playgrounds';

// SVG Icons
const SearchIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const LoadingSpinner = () => (
  <div className="loading-spinner"></div>
);

export default function SearchResults() {
  const [playgrounds, setPlaygrounds] = useState<PlaygroundWithScore[]>([]);
  const [weather, setWeather] = useState<WeatherWithForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedVenueType, setSelectedVenueType] = useState<string>('all'); // all, free, indoor, paid
  
  // Search state
  const [searchPostcode, setSearchPostcode] = useState('');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const postcode = searchParams?.get('postcode') || '';

  useEffect(() => {
    setSearchPostcode(postcode);
  }, [postcode]);

  useEffect(() => {
    const loadData = async () => {
      if (!postcode) {
        setError('Please provide a postcode');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get coordinates for postcode
        const coords = getPostcodeCoordinates(postcode);
        if (!coords) {
          setError(`Sorry, we don't have playground data for postcode ${postcode} yet. Try nearby postcodes like 3163, 3204, or 3000.`);
          setLoading(false);
          return;
        }

        // Fetch weather data with forecast
        const weatherData = await fetchWeatherWithForecast(coords.lat, coords.lng);
        setWeather(weatherData);

        // Get nearby playgrounds
        const nearbyPlaygrounds = getPlaygroundsByLocation(coords.lat, coords.lng, 15);
        
        // Calculate Go Now scores for each playground
        const playgroundsWithScores: PlaygroundWithScore[] = nearbyPlaygrounds.map(playground => ({
          ...playground,
          goNowScore: calculateGoNowScore(playground, weatherData)
        }));

        // Sort by Go Now score (highest first), then by distance
        playgroundsWithScores.sort((a, b) => {
          if (a.goNowScore && b.goNowScore) {
            if (b.goNowScore.score !== a.goNowScore.score) {
              return b.goNowScore.score - a.goNowScore.score;
            }
          }
          return (a.distance || 0) - (b.distance || 0);
        });

        setPlaygrounds(playgroundsWithScores);
      } catch (err) {
        setError('Failed to load playground data. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [postcode]);

  const handleNewSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchPostcode.trim()) return;
    router.push(`/search?postcode=${searchPostcode.trim()}`);
  };

  // Filter playgrounds based on selected filters
  const filteredPlaygrounds = useMemo(() => {
    return playgrounds.filter(playground => {
      // Venue type filter
      if (selectedVenueType === 'free' && playground.isPaid) {
        return false;
      }
      if (selectedVenueType === 'indoor' && !playground.isIndoor) {
        return false;
      }
      if (selectedVenueType === 'paid' && !playground.isPaid) {
        return false;
      }
      
      return true;
    });
  }, [playgrounds, selectedVenueType]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <LoadingSpinner />
          <p style={{ 
            fontSize: 'var(--font-size-lg)', 
            color: 'var(--color-text-medium)',
            marginTop: 'var(--spacing-md)' 
          }}>
            Finding the best playgrounds for you...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center container" style={{ maxWidth: '400px' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Oops!</h2>
          <p className="text-secondary" style={{ marginBottom: 'var(--spacing-xl)' }}>{error}</p>
          <button onClick={() => router.push('/')} className="btn btn-primary">
            <SearchIcon /> Try Another Postcode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-white)' }}>
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">LittleGo</Link>
            
            {/* Airbnb-style Search Bar */}
            <form onSubmit={handleNewSearch} style={{ flex: 1, maxWidth: '480px', margin: '0 var(--spacing-xl)' }}>
              <div className="search-bar">
                <div className="search-section">
                  <label className="search-label">Where</label>
                  <input
                    type="text"
                    value={searchPostcode}
                    onChange={(e) => setSearchPostcode(e.target.value)}
                    placeholder="Search postcodes"
                    className="search-input"
                  />
                </div>
                <button type="submit" className="search-button">
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-3xl)' }}>
        
        {/* Venue Type Filter Pills */}
        <div className="filter-pills">
          {[
            { value: 'all', label: 'All' },
            { value: 'free', label: 'Free Parks' },
            { value: 'indoor', label: 'Indoor' },
            { value: 'paid', label: 'Paid' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedVenueType(option.value)}
              className={`filter-pill ${selectedVenueType === option.value ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Results Header & Weather */}
        {weather && (
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
              {filteredPlaygrounds.length} playground{filteredPlaygrounds.length !== 1 ? 's' : ''} near {postcode}
            </h1>
            <p className="text-secondary">
              {filteredPlaygrounds.length !== playgrounds.length && (
                <span>Filtered from {playgrounds.length} total • </span>
              )}
              {Math.round(weather.temperature)}°C, {getWindDescription(weather.windSpeed)}, UV {weather.uvIndex}
            </p>
          </div>
        )}

        {/* Airbnb-style Vertical Cards Grid */}
        <div className="cards-grid">
          {filteredPlaygrounds.map(playground => (
            <Link 
              key={playground.id}
              href={`/playground/${playground.slug}`}
              className="listing-card"
            >
              <div className="card-image-container">
                {(() => {
                  const imageData = getPlaygroundImageData(playground);
                  return (
                    <div 
                      className="card-image card-placeholder"
                      style={{
                        backgroundColor: imageData.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '48px'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                          {imageData.icon}
                        </div>
                        <div style={{ fontSize: '24px' }}>
                          {imageData.letter}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* Go Now Badge */}
                {playground.goNowScore && (
                  <div className={`card-badge ${playground.goNowScore.status === 'go' ? 'go-now' : playground.goNowScore.status === 'caution' ? 'caution' : 'avoid'}`}>
                    {playground.goNowScore.status === 'go' ? 'Go Now' : 
                     playground.goNowScore.status === 'caution' ? 'OK' : 'Not Ideal'}
                  </div>
                )}

                {/* Venue Type Badge */}
                {playground.isPaid && (
                  <div className="card-badge" style={{ 
                    top: 'var(--spacing-sm)', 
                    right: 'var(--spacing-sm)', 
                    left: 'auto',
                    background: 'var(--color-primary)',
                    color: 'var(--color-white)'
                  }}>
                    {playground.isIndoor ? 'Indoor' : 'Paid'}
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="card-location">{playground.name}</h3>
                <p className="card-description">
                  {playground.address}
                  {playground.distance && ` • ${playground.distance.toFixed(1)} km away`}
                </p>
                
                <div className="card-features">
                  <span className="card-feature">
                    {getShadeInfo(playground.shadeLevel).emoji} {getShadeInfo(playground.shadeLevel).label}
                  </span>
                  {playground.facilities.includes('fenced') && (
                    <span className="card-feature">
                      {getFacilityInfo('fenced').emoji} Fenced
                    </span>
                  )}
                  {playground.facilities.includes('toilets') && (
                    <span className="card-feature">
                      {getFacilityInfo('toilets').emoji} Toilets
                    </span>
                  )}
                </div>

                {/* Price and Go Now Score */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--spacing-sm)' }}>
                  {playground.entryPrice ? (
                    <span className="card-price">{playground.entryPrice}</span>
                  ) : (
                    <span className="card-price">Free</span>
                  )}
                  {playground.goNowScore && (
                    <span className="card-rating">
                      ⭐ {playground.goNowScore.score}/10
                    </span>
                  )}
                </div>
                
                {/* Opening Hours for Paid Venues */}
                {playground.isPaid && playground.openingHours && (
                  <p className="text-small" style={{ marginTop: 'var(--spacing-xs)' }}>
                    Open today: {playground.openingHours.weekend || playground.openingHours.weekday}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPlaygrounds.length === 0 && playgrounds.length > 0 && (
          <div className="text-center" style={{ marginTop: 'var(--spacing-3xl)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>No playgrounds match your filters</h3>
            <p className="text-secondary" style={{ marginBottom: 'var(--spacing-xl)' }}>
              Try selecting "All" to see more results.
            </p>
            <button
              onClick={() => setSelectedVenueType('all')}
              className="btn btn-primary"
            >
              Show All Playgrounds
            </button>
          </div>
        )}

        {playgrounds.length === 0 && (
          <div className="text-center" style={{ marginTop: 'var(--spacing-3xl)' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>No playgrounds found</h3>
            <p className="text-secondary" style={{ marginBottom: 'var(--spacing-xl)' }}>
              Try a different postcode or expand your search area.
            </p>
            <button onClick={() => router.push('/')} className="btn btn-primary">
              <SearchIcon /> Try Another Postcode
            </button>
          </div>
        )}
      </main>
      
      <style jsx>{`
        .filter-pill {
          border-radius: 32px;
          border: 1px solid #ddd;
          padding: 8px 16px;
          background: white;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          margin-right: 12px;
          margin-bottom: 12px;
        }
        
        .filter-pill:hover {
          border-color: #52b788;
          color: #52b788;
        }
        
        .filter-pill.active {
          background: #52b788;
          color: white;
          font-weight: 600;
        }
        
        .filter-pills {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        
        @media (max-width: 768px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .listing-card {
          text-decoration: none;
          color: inherit;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .listing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .card-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .card-placeholder {
          width: 100%;
          height: 100%;
        }
        
        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .card-badge.go-now {
          background: #10b981;
          color: white;
        }
        
        .card-badge.caution {
          background: #f59e0b;
          color: white;
        }
        
        .card-badge.avoid {
          background: #ef4444;
          color: white;
        }
        
        .card-content {
          padding: 16px;
        }
        
        .card-location {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
          color: #1f2937;
        }
        
        .card-description {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .card-feature {
          font-size: 12px;
          color: #6b7280;
        }
        
        .card-price {
          font-weight: 600;
          color: #1f2937;
        }
        
        .card-rating {
          font-size: 14px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}