'use client';

import { useState } from 'react';

// SVG Icon Components
const SearchIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const SparkleIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24" fill="none">
    <path d="M12 3l1.09 3.26L16 7.18l-2.91 1.09L12 11.45 10.91 8.27 8 7.18l2.91-1.08L12 3z" fill="currentColor"/>
    <path d="M19 12l.72 2.16L22 15.12l-2.28.84L19 18.12 18.28 16.96 16 15.12l2.28-.84L19 12z" fill="currentColor"/>
    <path d="M5 21l.72-2.16L8 18.12l-2.28-.84L5 15.12l-.72 1.16L2 18.12l2.28.84L5 21z" fill="currentColor"/>
  </svg>
);

const PencilIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M11 4h-7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3l-9.5 9.5-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const SunIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
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

const TargetIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const DollarIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const StarIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
  </svg>
);

const HomeIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const PlaygroundIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <rect x="4" y="16" width="16" height="4" rx="2" fill="currentColor"/>
    <path d="M8 16V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"/>
    <circle cx="12" cy="4" r="2" fill="currentColor"/>
  </svg>
);

const CafeIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const ArtIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M9.06 11.9c.18-.98.74-1.86 1.5-2.5a6 6 0 0 1 8.48 0c.76.64 1.32 1.52 1.5 2.5"/>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 3v6l4-2-4-2z" fill="currentColor"/>
  </svg>
);

const WaterIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor"/>
    <path d="M8 12h8M10 16h4" stroke="white" strokeWidth="2"/>
  </svg>
);

const ShoppingIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const BookIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const AnimalIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
    <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
  </svg>
);

const CheckIcon = ({ style, ...props }: { style?: React.CSSProperties } & React.SVGProps<SVGSVGElement>) => (
  <svg className="icon" viewBox="0 0 24 24" style={style} {...props}>
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const RocketIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const PartyIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="currentColor"/>
  </svg>
);

const LogoIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" fill="var(--color-green-medium)" stroke="white" strokeWidth="1"/>
    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2"/>
  </svg>
);

const HeartIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// Note: Metadata moved to layout.tsx to avoid client component export issues

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowSuccess(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="py-3xl bg-cream-light">
        <div className="container">
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Logo & Brand */}
            <div className="mb-2xl">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: 'var(--space-lg)' 
              }}>
                <LogoIcon />
              </div>
              <h1 style={{ color: 'var(--color-green-dark)', marginBottom: 'var(--space-md)' }}>
                About LittleGo
              </h1>
              <div style={{ 
                width: '8rem', 
                height: '4px', 
                background: 'linear-gradient(to right, var(--color-green-medium), var(--color-coral))',
                margin: '0 auto',
                borderRadius: 'var(--radius-full)'
              }}></div>
            </div>

            {/* Main Headline */}
            <h2 style={{ 
              fontSize: 'var(--text-4xl)',
              fontWeight: '700',
              color: 'var(--color-text-dark)',
              marginBottom: 'var(--space-lg)',
              lineHeight: '1.2'
            }}>
              Discover amazing places for your{' '}
              <span style={{ color: 'var(--color-green-medium)' }}>little ones</span>
            </h2>

            {/* Subtitle */}
            <p className="lead" style={{ 
              fontSize: 'var(--text-xl)',
              color: 'var(--color-text-medium)',
              marginBottom: 'var(--space-2xl)',
              maxWidth: '48rem',
              margin: '0 auto var(--space-2xl)'
            }}>
              Like Yelp for parents! Find playgrounds, cafes, indoor play centres and activities 
              perfect for parents and kids of all ages across Australia. Weather-aware suggestions included!
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-3xl bg-white">
        <div className="container">
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <h3 className="mb-md">How LittleGo Works</h3>
            <p className="lead mb-3xl" style={{ maxWidth: '32rem', margin: '0 auto var(--space-3xl)' }}>
              Three simple steps to discover the perfect place for your family today
            </p>
            
            <div className="pure-g" style={{ gap: 'var(--space-lg)' }}>
              <div className="pure-u-1 pure-u-md-1-3 text-center">
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  backgroundColor: 'var(--color-green-light)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-lg)',
                  color: 'var(--color-green-dark)'
                }}>
                  <SearchIcon />
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--color-green-medium)',
                  color: 'var(--color-white)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '700',
                  margin: '0 auto var(--space-md)'
                }}>
                  1
                </div>
                <h4 className="mb-sm">Search</h4>
                <p style={{ color: 'var(--color-text-medium)' }}>
                  Enter your location and tell us your child's age. Filter by indoor/outdoor, cost, and distance.
                </p>
              </div>
              
              <div className="pure-u-1 pure-u-md-1-3 text-center">
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-lg)',
                  color: '#f59e0b'
                }}>
                  <SparkleIcon />
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#f59e0b',
                  color: 'var(--color-white)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '700',
                  margin: '0 auto var(--space-md)'
                }}>
                  2
                </div>
                <h4 className="mb-sm">Discover</h4>
                <p style={{ color: 'var(--color-text-medium)' }}>
                  Get personalised suggestions based on weather, UV levels, and community reviews from other parents.
                </p>
              </div>
              
              <div className="pure-u-1 pure-u-md-1-3 text-center">
                <div style={{ 
                  width: '5rem', 
                  height: '5rem', 
                  backgroundColor: '#fed7aa', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-lg)',
                  color: '#ea580c'
                }}>
                  <PencilIcon />
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#ea580c',
                  color: 'var(--color-white)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xl)',
                  fontWeight: '700',
                  margin: '0 auto var(--space-md)'
                }}>
                  3
                </div>
                <h4 className="mb-sm">Review</h4>
                <p style={{ color: 'var(--color-text-medium)' }}>
                  Share photos and reviews to help other parents discover amazing places too!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-3xl bg-cream-light">
        <div className="container">
          <div style={{ maxWidth: '96rem', margin: '0 auto' }}>
            <div className="text-center mb-3xl">
              <h3 className="mb-md">Smart Features for Aussie Parents</h3>
              <p className="lead" style={{ maxWidth: '32rem', margin: '0 auto' }}>
                We understand the unique challenges of parenting in Australia - from UV concerns to unpredictable weather
              </p>
            </div>
            
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-coral)', marginBottom: 'var(--space-md)' }}>
                    <SunIcon />
                  </div>
                  <h4 className="mb-sm">Weather-Aware Suggestions</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Rainy day? We'll show you the best indoor play centres. Sunny? Here are shaded parks and splash pads nearby.
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)' }}>
                    <TargetIcon />
                  </div>
                  <h4 className="mb-sm">Age-Perfect Filtering</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Find spots specifically suited for your child's age and developmental stage. No more guessing!
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-coral)', marginBottom: 'var(--space-md)' }}>
                    <DollarIcon />
                  </div>
                  <h4 className="mb-sm">Free & Paid Options</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Budget-conscious? Filter for free activities or set your spending limit. We've got options for every wallet.
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)' }}>
                    <MapPinIcon />
                  </div>
                  <h4 className="mb-sm">Distance-Smart Search</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Find places within walking distance, short drive, or plan a special day trip. You choose the radius.
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-coral)', marginBottom: 'var(--space-md)' }}>
                    <StarIcon />
                  </div>
                  <h4 className="mb-sm">Parent Reviews</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Real reviews from real parents. See photos, safety tips, and honest opinions from your local community.
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div className="feature-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)' }}>
                    <HomeIcon />
                  </div>
                  <h4 className="mb-sm">Indoor/Outdoor Toggle</h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Need shelter or fresh air? Instantly filter between covered areas and outdoor adventures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-3xl bg-white">
        <div className="container">
          <div style={{ maxWidth: '96rem', margin: '0 auto' }}>
            <div className="text-center mb-3xl">
              <h3 className="mb-md">Every Type of Adventure</h3>
              <p className="lead" style={{ maxWidth: '32rem', margin: '0 auto' }}>
                From energetic playground sessions to quiet cafe visits - we've got every kind of family outing covered
              </p>
            </div>
            
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)', transition: 'transform 0.2s ease' }}>
                    <PlaygroundIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Playgrounds & Parks
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Swings, slides, and open spaces for active play
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: 'var(--color-coral)', marginBottom: 'var(--space-md)' }}>
                    <HomeIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Indoor Play Centres
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Climate-controlled fun for any weather
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: '#8b5cf6', marginBottom: 'var(--space-md)' }}>
                    <CafeIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Kid-Friendly Cafes
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Great coffee + entertainment for little ones
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)' }}>
                    <ArtIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Classes & Activities
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Music, art, swimming, and learning experiences
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: '#06b6d4', marginBottom: 'var(--space-md)' }}>
                    <WaterIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Splash Pads & Pools
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Water play for hot Australian days
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: 'var(--color-coral)', marginBottom: 'var(--space-md)' }}>
                    <ShoppingIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Family Shopping
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Kid-friendly shops and shopping centres
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: 'var(--color-green-medium)', marginBottom: 'var(--space-md)' }}>
                    <BookIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Libraries & Learning
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Story time, programs, and quiet activities
                  </p>
                </div>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" style={{ padding: 'var(--space-xs)' }}>
                <div className="category-card">
                  <div style={{ color: '#f59e0b', marginBottom: 'var(--space-md)' }}>
                    <AnimalIcon />
                  </div>
                  <h4 style={{ fontWeight: '600', color: 'var(--color-text-dark)', marginBottom: 'var(--space-xs)' }}>
                    Unique Experiences
                  </h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-medium)' }}>
                    Zoos, farms, festivals, and special events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Community */}
      <section className="py-3xl bg-green-light" style={{ backgroundColor: 'var(--color-green-light)' }}>
        <div className="container">
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)', color: 'var(--color-green-dark)' }}>
              <PartyIcon />
            </div>
            <h3 style={{ color: 'var(--color-green-dark)', marginBottom: 'var(--space-lg)' }}>
              Built by Parents, for Parents
            </h3>
            <p style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'var(--color-green-dark)', 
              marginBottom: 'var(--space-3xl)',
              maxWidth: '32rem',
              margin: '0 auto var(--space-3xl)',
              lineHeight: '1.6'
            }}>
              We're Melbourne parents who got tired of wondering "where should we go with the kids today?" 
              So we built the platform we wished existed - and we're sharing it with you!
            </p>
            
            <div className="pure-g" style={{ marginBottom: 'var(--space-3xl)' }}>
              <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)', color: 'var(--color-green-medium)' }}>
                    <MapPinIcon />
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-2xl)', 
                    fontWeight: '700', 
                    color: 'var(--color-green-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Melbourne First
                  </div>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Starting with our home city, then expanding across Australia
                  </p>
                </div>
              </div>
              
              <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)', color: 'var(--color-green-medium)' }}>
                    <TargetIcon />
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-2xl)', 
                    fontWeight: '700', 
                    color: 'var(--color-green-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Family Focus
                  </div>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Specifically designed for families with children of all ages
                  </p>
                </div>
              </div>
              
              <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                <div style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-lg)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)', color: 'var(--color-green-medium)' }}>
                    <StarIcon />
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-2xl)', 
                    fontWeight: '700', 
                    color: 'var(--color-green-medium)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Community Driven
                  </div>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    Real reviews and photos from parents in your neighbourhood
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <p style={{ 
                fontSize: 'var(--text-lg)', 
                color: 'var(--color-text-medium)', 
                fontStyle: 'italic', 
                marginBottom: 'var(--space-md)' 
              }}>
                "We spent too many weekends driving around aimlessly, hoping to find somewhere suitable for our 2-year-old. 
                Now we're building the solution we always wanted - and we can't wait to share it!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-md)' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'var(--color-green-light)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green-dark)'
                }}>
                  <PartyIcon />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--color-text-dark)' }}>The LittleGo Team</div>
                  <div style={{ color: 'var(--color-text-medium)' }}>Parent founders in Melbourne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section id="waitlist" className="py-3xl bg-gradient-green">
        <div className="container">
          <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ 
              color: 'var(--color-white)', 
              marginBottom: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-sm)'
            }}>
              <RocketIcon />
              Be the First to Know!
            </h3>
            <p style={{ 
              fontSize: 'var(--text-xl)', 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: 'var(--space-2xl)' 
            }}>
              Join our waitlist to get early access when we launch in Melbourne. 
              Plus, get a sneak peek at the best kid-friendly spots we've already discovered!
            </p>
            
            <div style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-2xl)',
              boxShadow: 'var(--shadow-xl)'
            }}>
              {showSuccess ? (
                <div className="text-center success-message">
                  <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)', color: 'var(--color-green-medium)' }}>
                    <PartyIcon />
                  </div>
                  <h4 style={{ 
                    fontSize: 'var(--text-2xl)', 
                    fontWeight: '700', 
                    color: 'var(--color-green-dark)', 
                    marginBottom: 'var(--space-xs)' 
                  }}>
                    Welcome aboard!
                  </h4>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    We'll be in touch soon with exclusive early access info.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="pure-form">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                      style={{ fontSize: 'var(--text-lg)' }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      className="btn-primary"
                      style={{ 
                        padding: 'var(--space-md) var(--space-2xl)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: '700',
                        opacity: (isSubmitting || !email.trim()) ? 0.5 : 1,
                        cursor: (isSubmitting || !email.trim()) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSubmitting ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)' }}>
                          <div className="loading-spinner"></div>
                          Joining...
                        </div>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginTop: 'var(--space-lg)', 
                gap: 'var(--space-lg)', 
                fontSize: 'var(--text-sm)', 
                color: 'var(--color-text-light)',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <CheckIcon style={{ color: 'var(--color-green-medium)' }} />
                  <span>No spam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <CheckIcon style={{ color: 'var(--color-green-medium)' }} />
                  <span>Melbourne parents only</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                  <CheckIcon style={{ color: 'var(--color-green-medium)' }} />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-3xl bg-white">
        <div className="container">
          <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: 'var(--text-2xl)',
              fontWeight: '700',
              color: 'var(--color-text-dark)',
              marginBottom: 'var(--space-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-xs)'
            }}>
              Built by parents, for parents <HeartIcon />
            </h2>
            <p style={{ 
              color: 'var(--color-text-medium)', 
              marginBottom: 'var(--space-lg)' 
            }}>
              Have feedback or want to add a playground to our database?
            </p>
            <a 
              href="mailto:hello@littlego.com.au"
              className="btn-coral"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 'var(--space-xs)',
                marginBottom: 'var(--space-md)'
              }}
            >
              Contact Us
              <EmailIcon />
            </a>
            <p style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--color-text-light)',
              margin: '0'
            }}>
              Email: hello@littlego.com.au
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}