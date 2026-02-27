'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Playground, WeatherData, GoNowScore } from '@/types/playground';
import { fetchWeatherData, calculateGoNowScore, getWeatherEmoji, getWindDescription } from '@/lib/weather';
import { getPlaygroundBySlug, getAgeTagInfo, getFacilityInfo, getEquipmentInfo, getShadeInfo } from '@/lib/playgrounds';

// SVG Icons
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

const HomeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const MailIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const SunIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const ClockIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const PlayIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
  </svg>
);

const MapIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const GlobeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CameraIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const LogoIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" fill="var(--color-green-medium)" stroke="white" strokeWidth="1"/>
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2"/>
  </svg>
);

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
            Loading playground details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !playground) {
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
            Playground Not Found
          </h2>
          <p style={{ color: 'var(--color-text-medium)', marginBottom: 'var(--space-lg)' }}>
            Sorry, we couldn't find this playground.
          </p>
          <Link href="/" className="btn-coral">
            <HomeIcon /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, var(--color-cream), var(--color-green-light))'
    }}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-md) 0' }}>
            <Link href="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-xs)', 
              textDecoration: 'none',
              color: 'inherit' 
            }}>
              <LogoIcon />
              <span style={{ fontSize: 'var(--text-xl)', fontWeight: '700', color: 'var(--color-text-dark)' }}>
                LittleGo
              </span>
            </Link>
            <button 
              onClick={() => router.back()}
              className="back-btn"
              style={{
                fontSize: 'var(--text-sm)',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-text-dark)',
                padding: 'var(--space-xs) var(--space-md)',
                borderRadius: 'var(--radius-full)',
                transition: 'background-color 0.2s ease',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)'
              }}
            >
              <ArrowLeftIcon />
              Back to Results
            </button>
          </div>
        </div>
      </header>

      <main className="container py-lg">
        {/* Playground Header */}
        <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
          <div className="pure-g" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div className="pure-u-1 pure-u-lg-2-3" style={{ paddingRight: 'var(--space-md)' }}>
              <h1 style={{ 
                fontSize: 'var(--text-3xl)', 
                fontWeight: '700', 
                color: 'var(--color-text-dark)', 
                marginBottom: 'var(--space-sm)' 
              }}>
                {playground.name}
              </h1>
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <p style={{ 
                  fontSize: 'var(--text-lg)', 
                  color: 'var(--color-text-medium)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-xs)',
                  marginBottom: 'var(--space-xs)'
                }}>
                  <MapPinIcon />
                  {playground.address}
                </p>
                <p style={{ color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <MailIcon />
                  <span>{playground.postcode} • Surface: {playground.surface}</span>
                </p>
              </div>

              {/* Age Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--space-md)' }}>
                {playground.ageTags.map((tag) => {
                  const tagInfo = getAgeTagInfo(tag);
                  return (
                    <span key={tag} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '500',
                      backgroundColor: tagInfo.color === 'bg-blue-100 text-blue-800' ? '#dbeafe' :
                        tagInfo.color === 'bg-green-100 text-green-800' ? '#dcfce7' :
                        tagInfo.color === 'bg-yellow-100 text-yellow-800' ? '#fef3c7' : '#f3e8ff',
                      color: tagInfo.color === 'bg-blue-100 text-blue-800' ? '#1e40af' :
                        tagInfo.color === 'bg-green-100 text-green-800' ? '#166534' :
                        tagInfo.color === 'bg-yellow-100 text-yellow-800' ? '#92400e' : '#6b21a8',
                      marginRight: '8px',
                      marginBottom: '4px'
                    }}>
                      <span>{tagInfo.emoji}</span>
                      <span>{tagInfo.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Go Now Score Card */}
            {goNowScore && weather && (
              <div className="pure-u-1 pure-u-lg-1-3" style={{ paddingLeft: 'var(--space-md)' }}>
                <div style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-xl)',
                  border: '2px solid',
                  backgroundColor: goNowScore.status === 'go' ? '#f0fdf4' :
                    goNowScore.status === 'caution' ? '#fefce8' : '#fef2f2',
                  borderColor: goNowScore.status === 'go' ? '#bbf7d0' :
                    goNowScore.status === 'caution' ? '#fde047' : '#fecaca',
                  overflow: 'hidden',
                  maxWidth: '100%'
                }}>
                  <div className="text-center" style={{ marginBottom: 'var(--space-md)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-xs)' }}>
                      {goNowScore.status === 'go' ? '🟢' :
                       goNowScore.status === 'caution' ? '🟡' : '🔴'}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: '700',
                      marginBottom: 'var(--space-xs)',
                      color: goNowScore.status === 'go' ? '#166534' :
                        goNowScore.status === 'caution' ? '#a16207' : '#991b1b'
                    }}>
                      {goNowScore.score}/10
                    </div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: 'var(--text-lg)',
                      color: goNowScore.status === 'go' ? '#166534' :
                        goNowScore.status === 'caution' ? '#a16207' : '#991b1b'
                    }}>
                      {goNowScore.message}
                    </div>
                  </div>

                  {/* Current Weather */}
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-md)',
                    marginBottom: 'var(--space-md)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <span style={{ fontSize: '2rem' }}>{getWeatherEmoji(weather.weathercode)}</span>
                        <div>
                          <div style={{ 
                            fontSize: 'var(--text-xl)', 
                            fontWeight: '700', 
                            color: 'var(--color-text-dark)' 
                          }}>
                            {Math.round(weather.temperature)}°C
                          </div>
                          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                            {getWindDescription(weather.windSpeed)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: '#ea580c' }}>
                          UV {weather.uvIndex}
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                          {Math.round(weather.windSpeed)} km/h wind
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  {goNowScore.tips.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                      {goNowScore.tips.slice(0, 3).map((tip, index) => (
                        <div key={index} style={{
                          fontSize: 'var(--text-sm)',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-xs) var(--space-sm)'
                        }}>
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
        <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
          <h2 style={{ 
            fontSize: 'var(--text-2xl)', 
            fontWeight: '700', 
            color: 'var(--color-text-dark)', 
            marginBottom: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)'
          }}>
            <SunIcon />
            Shade & Weather Protection
          </h2>
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-2" style={{ paddingRight: 'var(--space-md)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: 'var(--space-sm)' 
              }}>
                <span style={{ fontWeight: '600', color: 'var(--color-text-medium)' }}>Shade Level</span>
                <span style={{ 
                  fontWeight: '500',
                  color: getShadeInfo(playground.shadeLevel).color === 'text-red-600' ? '#dc2626' :
                    getShadeInfo(playground.shadeLevel).color === 'text-yellow-600' ? '#d97706' : '#059669'
                }}>
                  {getShadeInfo(playground.shadeLevel).emoji} {getShadeInfo(playground.shadeLevel).label}
                </span>
              </div>
              <div className={`shade-bar shade-${playground.shadeLevel}`} style={{ marginBottom: 'var(--space-sm)' }}>
                <div className="shade-bar-fill"></div>
              </div>
              <p style={{ color: 'var(--color-text-medium)', marginBottom: 'var(--space-md)' }}>
                {playground.shadeNotes}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <span>{playground.hasCoveredStructure ? '✅' : '❌'}</span>
                  <span style={{ color: 'var(--color-text-medium)' }}>Covered play structure</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <span>{playground.hasMetalEquipment ? '⚠️' : '✅'}</span>
                  <span style={{ color: 'var(--color-text-medium)' }}>
                    {playground.hasMetalEquipment ? 'Has metal equipment (check temp)' : 'No metal equipment'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pure-u-1 pure-u-md-1-2">
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md)'
              }}>
                <h3 style={{ 
                  fontWeight: '700', 
                  color: 'var(--color-text-dark)', 
                  marginBottom: 'var(--space-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)'
                }}>
                  <ClockIcon />
                  Best Times to Visit
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                  <div>
                    <span style={{ fontWeight: '500', color: '#ea580c', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <SunIcon />
                      Summer:
                    </span>
                    <p style={{ color: 'var(--color-text-medium)', marginTop: 'var(--space-xs)' }}>
                      {playground.bestTimes.summer}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontWeight: '500', color: '#2563eb' }}>❄️ Winter:</span>
                    <p style={{ color: 'var(--color-text-medium)', marginTop: 'var(--space-xs)' }}>
                      {playground.bestTimes.winter}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Equipment */}
        <div className="pure-g" style={{ marginBottom: 'var(--space-lg)' }}>
          {/* Facilities */}
          <div className="pure-u-1 pure-u-lg-1-2" style={{ paddingRight: 'var(--space-sm)' }}>
            <div className="card" style={{ padding: 'var(--space-lg)', height: '100%' }}>
              <h2 style={{ 
                fontSize: 'var(--text-2xl)', 
                fontWeight: '700', 
                color: 'var(--color-text-dark)', 
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)'
              }}>
                <SettingsIcon />
                Facilities
              </h2>
              <div className="pure-g">
                {playground.facilities.map((facility) => {
                  const facilityInfo = getFacilityInfo(facility);
                  return (
                    <div key={facility} className="pure-u-1-2" style={{ padding: 'var(--space-xs)' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        backgroundColor: 'var(--color-cream-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-xs) var(--space-sm)'
                      }}>
                        <span style={{ fontSize: 'var(--text-xl)' }}>{facilityInfo.emoji}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: '500', color: 'var(--color-text-medium)' }}>
                          {facilityInfo.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="pure-u-1 pure-u-lg-1-2" style={{ paddingLeft: 'var(--space-sm)' }}>
            <div className="card" style={{ padding: 'var(--space-lg)', height: '100%' }}>
              <h2 style={{ 
                fontSize: 'var(--text-2xl)', 
                fontWeight: '700', 
                color: 'var(--color-text-dark)', 
                marginBottom: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)'
              }}>
                <PlayIcon />
                Play Equipment
              </h2>
              <div className="pure-g">
                {playground.equipment.map((item) => {
                  const equipmentInfo = getEquipmentInfo(item);
                  return (
                    <div key={item} className="pure-u-1-2" style={{ padding: 'var(--space-xs)' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-xs)',
                        backgroundColor: 'var(--color-cream-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-xs) var(--space-sm)'
                      }}>
                        <span style={{ fontSize: 'var(--text-xl)' }}>{equipmentInfo.emoji}</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: '500', color: 'var(--color-text-medium)' }}>
                          {equipmentInfo.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Location Links */}
        <div className="card mb-lg" style={{ padding: 'var(--space-lg)' }}>
          <h2 style={{ 
            fontSize: 'var(--text-2xl)', 
            fontWeight: '700', 
            color: 'var(--color-text-dark)', 
            marginBottom: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)'
          }}>
            <MapPinIcon />
            Location
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(playground.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}
            >
              <GlobeIcon />
              Open in Google Maps
            </a>
            <a
              href={`https://maps.apple.com/?q=${encodeURIComponent(playground.address)}`}
              target="_blank"
              rel="noopener noreferrer"  
              style={{
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-text-dark)',
                fontWeight: '600',
                padding: 'var(--space-xs) var(--space-md)',
                borderRadius: 'var(--radius-full)',
                transition: 'background-color 0.2s ease',
                fontSize: 'var(--text-sm)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xs)'
              }}
            >
              🍎 Open in Apple Maps
            </a>
          </div>
        </div>

        {/* Photos section removed - will be implemented when real photos are available */}

        {/* Reviews section removed - will be implemented when review feature is built */}
      </main>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .pure-u-1.pure-u-lg-2-3,
          .pure-u-1.pure-u-lg-1-3,
          .pure-u-1.pure-u-md-1-2 {
            padding-right: 0 !important;
            margin-bottom: var(--space-md);
          }
        }
        
        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 var(--space-md);
        }
      `}</style>
    </div>
  );
}