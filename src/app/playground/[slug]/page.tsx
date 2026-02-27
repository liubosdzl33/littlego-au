'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Playground, WeatherData, GoNowScore } from '@/types/playground';
import { fetchWeatherData, calculateGoNowScore, getWeatherEmoji, getWindDescription } from '@/lib/weather';
import { getPlaygroundBySlug, getAgeTagInfo, getFacilityInfo, getEquipmentInfo, getShadeInfo } from '@/lib/playgrounds';

export default function PlaygroundDetailPage() {
  const [playground, setPlayground] = useState<Playground | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [goNowScore, setGoNowScore] = useState<GoNowScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Get playground data
        const playgroundData = getPlaygroundBySlug(slug);
        if (!playgroundData) {
          setError('Playground not found');
          setLoading(false);
          return;
        }

        setPlayground(playgroundData);

        // Fetch weather data
        const weatherData = await fetchWeatherData(playgroundData.lat, playgroundData.lng);
        setWeather(weatherData);

        // Calculate Go Now score
        const score = calculateGoNowScore(playgroundData, weatherData);
        setGoNowScore(score);

      } catch (err) {
        setError('Failed to load playground data');
        console.error('Detail page error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading playground details...</p>
        </div>
      </div>
    );
  }

  if (error || !playground) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Playground Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find this playground.</p>
          <Link href="/" className="btn-primary">
            🏠 Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🏃‍♀️</span>
              <span className="text-xl font-bold text-gray-800">LittleGo</span>
            </Link>
            <button 
              onClick={() => router.back()}
              className="text-sm bg-yellow-100 hover:bg-yellow-200 text-gray-800 px-4 py-2 rounded-full transition-colors"
            >
              ← Back to Results
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Playground Header */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{playground.name}</h1>
              <div className="space-y-2 mb-4">
                <p className="text-lg text-gray-600 flex items-center">
                  📍 {playground.address}
                </p>
                <p className="text-gray-500">
                  📮 {playground.postcode} • 📊 Surface: {playground.surface}
                </p>
              </div>

              {/* Age Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {playground.ageTags.map((tag) => {
                  const tagInfo = getAgeTagInfo(tag);
                  return (
                    <span key={tag} className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${tagInfo.color}`}>
                      <span>{tagInfo.emoji}</span>
                      <span>{tagInfo.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Go Now Score Card */}
            {goNowScore && weather && (
              <div className="lg:w-80">
                <div className={`p-6 rounded-2xl border-2 ${
                  goNowScore.status === 'go' ? 'bg-green-50 border-green-200' :
                  goNowScore.status === 'caution' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">
                      {goNowScore.status === 'go' ? '🟢' :
                       goNowScore.status === 'caution' ? '🟡' : '🔴'}
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${
                      goNowScore.status === 'go' ? 'text-green-800' :
                      goNowScore.status === 'caution' ? 'text-yellow-800' : 'text-red-800'
                    }`}>
                      {goNowScore.score}/10
                    </div>
                    <div className={`font-semibold text-lg ${
                      goNowScore.status === 'go' ? 'text-green-800' :
                      goNowScore.status === 'caution' ? 'text-yellow-800' : 'text-red-800'
                    }`}>
                      {goNowScore.message}
                    </div>
                  </div>

                  {/* Current Weather */}
                  <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getWeatherEmoji(weather.weathercode)}</span>
                        <div>
                          <div className="text-xl font-bold text-gray-800">{Math.round(weather.temperature)}°C</div>
                          <div className="text-sm text-gray-600">{getWindDescription(weather.windSpeed)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-orange-600">UV {weather.uvIndex}</div>
                        <div className="text-sm text-gray-600">{Math.round(weather.windSpeed)} km/h wind</div>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  {goNowScore.tips.length > 0 && (
                    <div className="space-y-2">
                      {goNowScore.tips.slice(0, 3).map((tip, index) => (
                        <div key={index} className="text-sm bg-white bg-opacity-50 rounded px-3 py-2">
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shade Information */}
        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">☀️ Shade & Weather Protection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-700">Shade Level</span>
                <span className={`font-medium ${getShadeInfo(playground.shadeLevel).color}`}>
                  {getShadeInfo(playground.shadeLevel).emoji} {getShadeInfo(playground.shadeLevel).label}
                </span>
              </div>
              <div className={`shade-bar shade-${playground.shadeLevel} mb-3`}>
                <div className="shade-bar-fill"></div>
              </div>
              <p className="text-gray-600 mb-4">{playground.shadeNotes}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>{playground.hasCoveredStructure ? '✅' : '❌'}</span>
                  <span className="text-gray-700">Covered play structure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{playground.hasMetalEquipment ? '⚠️' : '✅'}</span>
                  <span className="text-gray-700">
                    {playground.hasMetalEquipment ? 'Has metal equipment (check temp)' : 'No metal equipment'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">🕐 Best Times to Visit</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-orange-600">☀️ Summer:</span>
                  <p className="text-gray-700">{playground.bestTimes.summer}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-600">❄️ Winter:</span>
                  <p className="text-gray-700">{playground.bestTimes.winter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Equipment */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Facilities */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏗️ Facilities</h2>
            <div className="grid grid-cols-2 gap-3">
              {playground.facilities.map((facility) => {
                const facilityInfo = getFacilityInfo(facility);
                return (
                  <div key={facility} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xl">{facilityInfo.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{facilityInfo.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Equipment */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎪 Play Equipment</h2>
            <div className="grid grid-cols-2 gap-3">
              {playground.equipment.map((item) => {
                const equipmentInfo = getEquipmentInfo(item);
                return (
                  <div key={item} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xl">{equipmentInfo.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{equipmentInfo.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Location</h2>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🗺️</div>
              <p>Interactive map coming soon!</p>
              <p className="text-sm mt-2">Lat: {playground.lat.toFixed(4)}, Lng: {playground.lng.toFixed(4)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(playground.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              🗺️ Open in Google Maps
            </a>
            <a
              href={`https://maps.apple.com/?q=${encodeURIComponent(playground.address)}`}
              target="_blank"
              rel="noopener noreferrer"  
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full transition-colors text-sm"
            >
              🍎 Open in Apple Maps
            </a>
          </div>
        </div>

        {/* Photo Gallery Placeholder */}
        <div className="card p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📸 Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-3xl mb-1">📷</div>
                  <p className="text-xs">Photo {i}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-4">
            📸 Photos coming soon! Help us by sharing photos of this playground.
          </p>
        </div>

        {/* Reviews Placeholder */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Parent Reviews & Tips</h2>
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💭</div>
            <p className="mb-2">Be the first to share your experience!</p>
            <p className="text-sm">Parent reviews and tips coming soon.</p>
          </div>
        </div>
      </main>
    </div>
  );
}