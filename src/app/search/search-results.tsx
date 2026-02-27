'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlaygroundWithScore, WeatherData, AgeTag, Facility } from '@/types/playground';
import { fetchWeatherData, calculateGoNowScore, getWeatherEmoji, getWindDescription } from '@/lib/weather';
import { getPostcodeCoordinates, getPlaygroundsByLocation, getAgeTagInfo, getFacilityInfo, getShadeInfo } from '@/lib/playgrounds';

export default function SearchResults() {
  const [playgrounds, setPlaygrounds] = useState<PlaygroundWithScore[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeTag | ''>('');
  const [selectedShadeLevel, setSelectedShadeLevel] = useState<string>('');
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  
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

        // Fetch weather data
        const weatherData = await fetchWeatherData(coords.lat, coords.lng);
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
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Finding the best playgrounds for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            🔍 Try Another Postcode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50">
      <main className="container mx-auto px-4 py-6">
        {/* Search Again Section */}
        <div className="card p-6 mb-6">
          <form onSubmit={handleNewSearch} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <label htmlFor="search-postcode" className="block text-sm font-medium text-gray-700 mb-2">
                Search another postcode
              </label>
              <input
                id="search-postcode"
                type="text"
                value={searchPostcode}
                onChange={(e) => setSearchPostcode(e.target.value)}
                placeholder="e.g. 3000, 3163, 3204"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              🔍 Search
            </button>
          </form>
        </div>

        {/* Weather & Location Info */}
        {weather && (
          <div className="card p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Showing {filteredPlaygrounds.length} playground{filteredPlaygrounds.length !== 1 ? 's' : ''} near {postcode}
                </h1>
                <p className="text-gray-600">
                  {filteredPlaygrounds.length !== playgrounds.length && (
                    <span>Filtered from {playgrounds.length} total • </span>
                  )}
                  Current conditions below
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-center md:text-left">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">{getWeatherEmoji(weather.weathercode)}</span>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{Math.round(weather.temperature)}°</div>
                    <div className="text-sm text-gray-600">{getWindDescription(weather.windSpeed)}</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">UV {weather.uvIndex}</div>
                  <div className="text-sm text-gray-600">
                    {weather.uvIndex >= 11 ? 'Extreme' :
                     weather.uvIndex >= 8 ? 'Very High' :
                     weather.uvIndex >= 6 ? 'High' :
                     weather.uvIndex >= 3 ? 'Moderate' : 'Low'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{Math.round(weather.windSpeed)} km/h</div>
                  <div className="text-sm text-gray-600">Wind</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="card p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filter playgrounds</h3>
          
          <div className="space-y-4">
            {/* Age Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAgeGroup('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedAgeGroup === '' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Ages
                </button>
                {(['toddler', 'kinder', 'primary', 'older'] as AgeTag[]).map(age => {
                  const ageInfo = getAgeTagInfo(age);
                  return (
                    <button
                      key={age}
                      onClick={() => setSelectedAgeGroup(age === selectedAgeGroup ? '' : age)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                        selectedAgeGroup === age ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Shade Level</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedShadeLevel('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedShadeLevel === '' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Any Shade
                </button>
                {['minimal', 'partial', 'full'].map(shade => {
                  const shadeInfo = getShadeInfo(shade);
                  return (
                    <button
                      key={shade}
                      onClick={() => setSelectedShadeLevel(shade === selectedShadeLevel ? '' : shade)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                        selectedShadeLevel === shade ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Must Have Facilities</label>
              <div className="flex flex-wrap gap-2">
                {(['fenced', 'toilets'] as Facility[]).map(facility => {
                  const facilityInfo = getFacilityInfo(facility);
                  const isSelected = selectedFacilities.includes(facility);
                  return (
                    <button
                      key={facility}
                      onClick={() => toggleFacility(facility)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                        isSelected ? 'bg-yellow-400 text-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
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
            <div className="mt-4">
              <button
                onClick={() => {
                  setSelectedAgeGroup('');
                  setSelectedShadeLevel('');
                  setSelectedFacilities([]);
                }}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Playgrounds List */}
        <div className="space-y-4">
          {filteredPlaygrounds.map((playground) => (
            <div key={playground.id}>
              <Link
                href={`/playground/${playground.slug}`}
                className="block card hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Left Side - Playground Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{playground.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{playground.address}</p>
                          {playground.distance && (
                            <p className="text-gray-500 text-sm">{playground.distance.toFixed(1)} km away</p>
                          )}
                        </div>
                        
                        {/* Go Now Score */}
                        {playground.goNowScore && (
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                            playground.goNowScore.status === 'go' ? 'score-go' :
                            playground.goNowScore.status === 'caution' ? 'score-caution' : 'score-avoid'
                          }`}>
                            {playground.goNowScore.status === 'go' ? '🟢' :
                             playground.goNowScore.status === 'caution' ? '🟡' : '🔴'} 
                            {playground.goNowScore.score}/10
                          </div>
                        )}
                      </div>

                      {/* Age Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {playground.ageTags.map((tag) => {
                          const tagInfo = getAgeTagInfo(tag);
                          return (
                            <span key={tag} className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${tagInfo.color}`}>
                              <span>{tagInfo.emoji}</span>
                              <span>{tagInfo.label}</span>
                            </span>
                          );
                        })}
                      </div>

                      {/* Facilities */}
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        {playground.facilities.slice(0, 6).map((facility) => {
                          const facilityInfo = getFacilityInfo(facility);
                          return (
                            <span key={facility} className="flex items-center space-x-1">
                              <span>{facilityInfo.emoji}</span>
                              <span>{facilityInfo.label}</span>
                            </span>
                          );
                        })}
                        {playground.facilities.length > 6 && (
                          <span className="text-gray-400">+{playground.facilities.length - 6} more</span>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Shade & Recommendation */}
                    <div className="lg:w-64 space-y-3">
                      {/* Shade Level */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Shade Level</span>
                          <span className={`font-medium ${getShadeInfo(playground.shadeLevel).color}`}>
                            {getShadeInfo(playground.shadeLevel).emoji} {getShadeInfo(playground.shadeLevel).label}
                          </span>
                        </div>
                        <div className={`shade-bar shade-${playground.shadeLevel}`}>
                          <div className="shade-bar-fill"></div>
                        </div>
                      </div>

                      {/* Go Now Recommendation */}
                      {playground.goNowScore && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="font-semibold text-sm text-gray-800 mb-1">
                            {playground.goNowScore.message}
                          </div>
                          {playground.goNowScore.tips.length > 0 && (
                            <div className="text-xs text-gray-600">
                              {playground.goNowScore.tips[0]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* NOT RECOMMENDED Suggestion */}
              {playground.goNowScore?.status === 'avoid' && nearestGoPlayground && nearestGoPlayground.id !== playground.id && (
                <div className="mt-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-800">
                    <span>💡</span>
                    <span className="font-medium">Instead try:</span>
                    <Link 
                      href={`/playground/${nearestGoPlayground.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {nearestGoPlayground.name}
                    </Link>
                    <span className="text-blue-600">
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No playgrounds match your filters</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or clearing them to see more results.</p>
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
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No playgrounds found</h3>
            <p className="text-gray-600 mb-6">Try a different postcode or expand your search area.</p>
            <button onClick={() => router.push('/')} className="btn-primary">
              🔍 Try Another Postcode
            </button>
          </div>
        )}
      </main>
    </div>
  );
}