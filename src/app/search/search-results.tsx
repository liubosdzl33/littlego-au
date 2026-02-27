'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlaygroundWithScore, WeatherData, WeatherWithForecast, AgeTag, Facility } from '@/types/playground';
import { fetchWeatherData, fetchWeatherWithForecast, calculateGoNowScore, getWeatherEmoji, getWindDescription } from '@/lib/weather';
import { getPostcodeCoordinates, getPlaygroundsByLocation, getAgeTagInfo, getFacilityInfo, getShadeInfo, getPlaygroundImage, getEquipmentInfo } from '@/lib/playgrounds';

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
                <img 
                  src={getPlaygroundImage(playground)}
                  alt={playground.name}
                  className="card-image"
                />
                
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
    </div>
  );
}