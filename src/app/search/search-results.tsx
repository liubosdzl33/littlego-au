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
  <div className="loading-spinner" style={{ 
    width: '4rem', 
    height: '4rem',
    borderWidth: '4px',
    borderColor: 'var(--color-green-medium)',
    borderTopColor: 'transparent'
  }}></div>
);

const SadFaceIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
    <path d="M8 17s1-2 4-2 4 2 4 2"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M9 21h6M12 17h.01M12 3a6 6 0 0 1 5.196 9H6.804A6 6 0 0 1 12 3z"/>
    <path d="M8 17h8a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2z"/>
  </svg>
);

export default function SearchResults() {
  const [playgrounds, setPlaygrounds] = useState<PlaygroundWithScore[]>([]);
  const [weather, setWeather] = useState<WeatherWithForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeTag | ''>('');
  const [selectedShadeLevel, setSelectedShadeLevel] = useState<string>('');
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Planning ahead state
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('now');
  
  // Search state
  const [searchPostcode, setSearchPostcode] = useState('');
  
  // Time awareness
  const currentHour = new Date().getHours();
  const isEvening = currentHour >= 19 || currentHour < 6;
  
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

  const toggleFacility = (facility: Facility) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  // Filter playgrounds based on selected filters
  const filteredPlaygrounds = useMemo(() => {
    return playgrounds.filter(playground => {
      // Age group filter
      if (selectedAgeGroup && !playground.ageTags.includes(selectedAgeGroup)) {
        return false;
      }
      
      // Shade level filter
      if (selectedShadeLevel && playground.shadeLevel !== selectedShadeLevel) {
        return false;
      }
      
      // Facilities filter (playground must have ALL selected facilities)
      if (selectedFacilities.length > 0) {
        const hasAllFacilities = selectedFacilities.every(facility => 
          playground.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }
      
      return true;
    });
  }, [playgrounds, selectedAgeGroup, selectedShadeLevel, selectedFacilities]);

  // Find nearest GO playground for suggestions
  const nearestGoPlayground = useMemo(() => {
    return playgrounds.find(p => p.goNowScore?.status === 'go');
  }, [playgrounds]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, var(--color-cream), var(--color-green-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <LoadingSpinner />
          </div>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-medium)' }}>
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
        background: 'linear-gradient(to bottom, var(--color-cream), var(--color-green-light))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center container" style={{ maxWidth: '28rem', padding: '0 var(--space-md)' }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', color: 'var(--color-coral)' }}>
            <SadFaceIcon />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--color-text-dark)', marginBottom: 'var(--space-md)' }}>
            Oops!
          </h2>
          <p style={{ color: 'var(--color-text-medium)', marginBottom: 'var(--space-lg)' }}>{error}</p>
          <button onClick={() => router.push('/')} className="btn-coral">
            <SearchIcon /> Try Another Postcode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, var(--color-cream), var(--color-green-light))'
    }}>
      <main className="container py-lg">
        
        {/* Search Again Section */}
        <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
          <form onSubmit={handleNewSearch} className="pure-form">
            <div className="pure-g" style={{ alignItems: 'end' }}>
              <div className="pure-u-1 pure-u-sm-3-4" style={{ paddingRight: 'var(--space-md)' }}>
                <label htmlFor="search-postcode" style={{ 
                  display: 'block', 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: '500', 
                  color: 'var(--color-text-medium)', 
                  marginBottom: 'var(--space-xs)' 
                }}>
                  Search another postcode
                </label>
                <input
                  id="search-postcode"
                  type="text"
                  value={searchPostcode}
                  onChange={(e) => setSearchPostcode(e.target.value)}
                  placeholder="e.g. 3000, 3163, 3204"
                  className="form-input"
                  style={{
                    height: '52px',
                    fontSize: '18px',
                    color: '#1b1b1e',
                    backgroundColor: '#ffffff',
                    border: '2px solid #dddddd',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    padding: 'var(--space-md)',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
              <div className="pure-u-1 pure-u-sm-1-4">
                <button 
                  type="submit"
                  className="btn-coral"
                  style={{ 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)'
                  }}
                >
                  <SearchIcon /> Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Evening Planning Banner */}
        {isEvening && (
          <div className="card mb-lg" style={{ 
            padding: 'var(--space-lg)',
            background: 'linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 100%)',
            border: '1px solid #0ea5e9'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-md)',
              fontSize: 'var(--text-lg)',
              color: '#0c4a6e',
              fontWeight: '600'
            }}>
              <span style={{ fontSize: '2rem' }}>🌆</span>
              <span>It's evening — showing recommendations for tomorrow morning ☀️</span>
            </div>
          </div>
        )}

        {/* Plan Ahead Selector */}
        <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
          <h3 style={{ 
            fontWeight: '600', 
            color: 'var(--color-text-dark)', 
            marginBottom: 'var(--space-md)',
            fontSize: 'var(--text-lg)'
          }}>
            When are you planning to go?
          </h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 'var(--space-xs)',
            marginBottom: 'var(--space-sm)'
          }}>
            {[
              { value: 'now', label: 'Right now' },
              { value: 'tomorrow-morning', label: 'Tomorrow morning' },
              { value: 'tomorrow-afternoon', label: 'Tomorrow afternoon' },
              { value: 'saturday-morning', label: 'This Saturday morning' },
              { value: 'saturday-afternoon', label: 'This Saturday afternoon' },
              { value: 'sunday-morning', label: 'This Sunday morning' },
              { value: 'sunday-afternoon', label: 'This Sunday afternoon' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedTimeSlot(option.value)}
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  border: '1px solid',
                  cursor: 'pointer',
                  backgroundColor: selectedTimeSlot === option.value ? 'var(--color-coral)' : 'var(--color-white)',
                  color: selectedTimeSlot === option.value ? 'var(--color-white)' : 'var(--color-text-medium)',
                  borderColor: selectedTimeSlot === option.value ? 'var(--color-coral)' : '#e5e7eb'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weather & Location Info */}
        {weather && (
          <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
            <div className="pure-g" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="pure-u-1 pure-u-md-2-3">
                <h1 style={{ 
                  fontSize: 'var(--text-2xl)', 
                  fontWeight: '700', 
                  color: 'var(--color-text-dark)', 
                  marginBottom: 'var(--space-xs)' 
                }}>
                  Showing {filteredPlaygrounds.length} playground{filteredPlaygrounds.length !== 1 ? 's' : ''} near {postcode}
                </h1>
                <p style={{ color: 'var(--color-text-medium)' }}>
                  {filteredPlaygrounds.length !== playgrounds.length && (
                    <span>Filtered from {playgrounds.length} total • </span>
                  )}
                  {selectedTimeSlot === 'now' ? 'Current conditions below' : 'Forecast conditions below'}
                </p>
              </div>
              
              <div className="pure-u-1 pure-u-md-1-3" style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-lg)',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                    <span style={{ fontSize: '2rem' }}>{getWeatherEmoji(weather.weathercode)}</span>
                    <div>
                      <div style={{ 
                        fontSize: 'var(--text-2xl)', 
                        fontWeight: '700', 
                        color: 'var(--color-text-dark)' 
                      }}>
                        {Math.round(weather.temperature)}°
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                        {getWindDescription(weather.windSpeed)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: '#ea580c' }}>
                      UV {weather.uvIndex}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                      {weather.uvIndex >= 11 ? 'Extreme' :
                       weather.uvIndex >= 8 ? 'Very High' :
                       weather.uvIndex >= 6 ? 'High' :
                       weather.uvIndex >= 3 ? 'Moderate' : 'Low'}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: '#2563eb' }}>
                      {Math.round(weather.windSpeed)} km/h
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>Wind</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Filters */}
        <div className="mb-lg">
          {/* Filter Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-md)' 
          }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--text-sm)',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)'
              }}
            >
              <span>🔽</span>
              <span>
                Filters
                {(selectedAgeGroup || selectedShadeLevel || selectedFacilities.length > 0) && (
                  <span style={{ 
                    marginLeft: 'var(--space-xs)',
                    backgroundColor: 'var(--color-coral)',
                    color: 'var(--color-white)',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: 'var(--text-xs)'
                  }}>
                    {[selectedAgeGroup, selectedShadeLevel, ...selectedFacilities].filter(Boolean).length}
                  </span>
                )}
              </span>
            </button>
          </div>

          {/* Collapsible Filter Panel */}
          {showFilters && (
            <div className="card" style={{ 
              padding: 'var(--space-lg)',
              animation: 'slideDown 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                {/* Age Group Filter */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '500', 
                    color: 'var(--color-text-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Age Group
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                    <button
                      onClick={() => setSelectedAgeGroup('')}
                      style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: selectedAgeGroup === '' ? 'var(--color-coral)' : 'var(--color-cream-light)',
                        color: selectedAgeGroup === '' ? 'var(--color-white)' : 'var(--color-text-medium)'
                      }}
                    >
                      All Ages
                    </button>
                    {(['toddler', 'kinder', 'primary', 'older'] as AgeTag[]).map(age => {
                      const ageInfo = getAgeTagInfo(age);
                      const isSelected = selectedAgeGroup === age;
                      return (
                        <button
                          key={age}
                          onClick={() => setSelectedAgeGroup(age === selectedAgeGroup ? '' : age)}
                          style={{
                            padding: 'var(--space-xs) var(--space-sm)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)',
                            backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-cream-light)',
                            color: isSelected ? 'var(--color-white)' : 'var(--color-text-medium)'
                          }}
                        >
                          <span>{ageInfo.emoji}</span>
                          <span>{ageInfo.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Shade Level Filter */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '500', 
                    color: 'var(--color-text-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Shade Level
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                    <button
                      onClick={() => setSelectedShadeLevel('')}
                      style={{
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: selectedShadeLevel === '' ? 'var(--color-coral)' : 'var(--color-cream-light)',
                        color: selectedShadeLevel === '' ? 'var(--color-white)' : 'var(--color-text-medium)'
                      }}
                    >
                      Any Shade
                    </button>
                    {['minimal', 'partial', 'full'].map(shade => {
                      const shadeInfo = getShadeInfo(shade);
                      const isSelected = selectedShadeLevel === shade;
                      return (
                        <button
                          key={shade}
                          onClick={() => setSelectedShadeLevel(shade === selectedShadeLevel ? '' : shade)}
                          style={{
                            padding: 'var(--space-xs) var(--space-sm)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)',
                            backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-cream-light)',
                            color: isSelected ? 'var(--color-white)' : 'var(--color-text-medium)'
                          }}
                        >
                          <span>{shadeInfo.emoji}</span>
                          <span>{shadeInfo.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Facilities Filter */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '500', 
                    color: 'var(--color-text-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Must Have Facilities
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                    {(['fenced', 'toilets'] as Facility[]).map(facility => {
                      const facilityInfo = getFacilityInfo(facility);
                      const isSelected = selectedFacilities.includes(facility);
                      return (
                        <button
                          key={facility}
                          onClick={() => toggleFacility(facility)}
                          style={{
                            padding: 'var(--space-xs) var(--space-sm)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-xs)',
                            backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-cream-light)',
                            color: isSelected ? 'var(--color-white)' : 'var(--color-text-medium)'
                          }}
                        >
                          <span>{facilityInfo.emoji}</span>
                          <span>{facilityInfo.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Clear Filters */}
              {(selectedAgeGroup || selectedShadeLevel || selectedFacilities.length > 0) && (
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <button
                    onClick={() => {
                      setSelectedAgeGroup('');
                      setSelectedShadeLevel('');
                      setSelectedFacilities([]);
                    }}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Playgrounds List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {filteredPlaygrounds.map((playground) => (
            <div key={playground.id}>
              <Link
                href={`/playground/${playground.slug}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div className="card" style={{ 
                  padding: '0',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}>
                  <div className="playground-card" style={{ display: 'flex', minHeight: '160px', position: 'relative' }}>
                    
                    {/* Left Side - Square Image */}
                    <div className="playground-image" style={{ 
                      width: '160px', 
                      height: '160px',
                      flexShrink: 0,
                      position: 'relative',
                      aspectRatio: '1/1'
                    }}>
                      <img
                        src={`${getPlaygroundImage(playground)}?w=400&h=400&fit=crop`}
                        alt={`${playground.name} playground`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          aspectRatio: '1/1'
                        }}
                      />
                      {/* Go Now Score Badge */}
                      {playground.goNowScore && (
                        <div style={{
                          position: 'absolute',
                          top: 'var(--space-sm)',
                          right: 'var(--space-sm)',
                          padding: 'var(--space-xs) var(--space-sm)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: '600',
                          backgroundColor: playground.goNowScore.status === 'go' ? '#15803d' :
                            playground.goNowScore.status === 'caution' ? '#ca8a04' : '#dc2626',
                          color: 'white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                          {playground.goNowScore.score}/10
                        </div>
                      )}
                    </div>

                    {/* Right Side - Simplified Info */}
                    <div style={{ 
                      flex: 1, 
                      padding: 'var(--space-lg)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Title and Address */}
                      <h3 style={{ 
                        fontSize: 'var(--text-lg)', 
                        fontWeight: '700', 
                        color: 'var(--color-text-dark)', 
                        marginBottom: 'var(--space-xs)',
                        lineHeight: '1.3'
                      }}>
                        {playground.name}
                      </h3>
                      <p style={{ 
                        color: 'var(--color-text-medium)', 
                        fontSize: 'var(--text-sm)',
                        marginBottom: 'var(--space-sm)'
                      }}>
                        {playground.address}
                      </p>
                      
                      {/* Distance */}
                      {playground.distance && (
                        <p style={{ 
                          color: 'var(--color-text-light)', 
                          fontSize: 'var(--text-sm)',
                          marginBottom: 'var(--space-md)'
                        }}>
                          {playground.distance.toFixed(1)} km away
                        </p>
                      )}

                      {/* Top Facility Icons - Small and Inline */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 'var(--space-sm)', 
                        fontSize: '16px'
                      }}>
                        {/* Shade Level Icon */}
                        <span title={`${getShadeInfo(playground.shadeLevel).label}`}>
                          {getShadeInfo(playground.shadeLevel).emoji}
                        </span>

                        {/* Top 3-4 Facility Icons */}
                        {['fenced', 'toilets', 'parking', 'water_fountain'].filter(facility => 
                          playground.facilities.includes(facility as any)
                        ).slice(0, 3).map(facility => {
                          const facilityInfo = getFacilityInfo(facility as any);
                          return (
                            <span key={facility} title={facilityInfo.label}>
                              {facilityInfo.emoji}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* NOT RECOMMENDED Suggestion */}
              {playground.goNowScore?.status === 'avoid' && nearestGoPlayground && nearestGoPlayground.id !== playground.id && (
                <div style={{
                  marginTop: 'var(--space-xs)',
                  padding: 'var(--space-md)',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--space-xs)', 
                    fontSize: 'var(--text-sm)', 
                    color: '#1e40af' 
                  }}>
                    <LightbulbIcon />
                    <span style={{ fontWeight: '500' }}>Instead try:</span>
                    <Link 
                      href={`/playground/${nearestGoPlayground.slug}`}
                      style={{ 
                        fontWeight: '600', 
                        color: '#1e40af', 
                        textDecoration: 'none' 
                      }}
                    >
                      {nearestGoPlayground.name}
                    </Link>
                    <span style={{ color: '#2563eb' }}>
                      ({nearestGoPlayground.distance?.toFixed(1)} km away, 
                      {nearestGoPlayground.goNowScore ? ` ${nearestGoPlayground.goNowScore.score}/10` : ''})
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPlaygrounds.length === 0 && playgrounds.length > 0 && (
          <div className="text-center py-3xl">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-light)' }}>
              <SearchIcon />
            </div>
            <h3 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: '700', 
              color: 'var(--color-text-dark)', 
              marginBottom: 'var(--space-xs)' 
            }}>
              No playgrounds match your filters
            </h3>
            <p style={{ 
              color: 'var(--color-text-medium)', 
              marginBottom: 'var(--space-lg)' 
            }}>
              Try adjusting your filters or clearing them to see more results.
            </p>
            <button
              onClick={() => {
                setSelectedAgeGroup('');
                setSelectedShadeLevel('');
                setSelectedFacilities([]);
              }}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {playgrounds.length === 0 && (
          <div className="text-center py-3xl">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-light)' }}>
              <SadFaceIcon />
            </div>
            <h3 style={{ 
              fontSize: 'var(--text-xl)', 
              fontWeight: '700', 
              color: 'var(--color-text-dark)', 
              marginBottom: 'var(--space-xs)' 
            }}>
              No playgrounds found
            </h3>
            <p style={{ 
              color: 'var(--color-text-medium)', 
              marginBottom: 'var(--space-lg)' 
            }}>
              Try a different postcode or expand your search area.
            </p>
            <button onClick={() => router.push('/')} className="btn-coral">
              <SearchIcon /> Try Another Postcode
            </button>
          </div>
        )}
      </main>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }
        
        .card {
          position: relative;
        }
        
        /* Search input focus styling */
        input[type="text"]:focus {
          border-color: #52b788 !important;
          box-shadow: 0 2px 12px rgba(82,183,136,0.2) !important;
          outline: none;
        }
        input[type="text"]::placeholder {
          color: #9ca3af;
        }
        
        /* Mobile responsiveness for playground cards */
        @media (max-width: 768px) {
          .playground-card {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .playground-image {
            width: 100% !important;
            height: 200px !important;
            aspect-ratio: auto !important;
          }
        }
      `}</style>
    </div>
  );
}