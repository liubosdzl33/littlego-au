// SVG Icon Components
const MapPinIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
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

const TargetIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const HomeIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const ArtIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <path d="M9.06 11.9c.18-.98.74-1.86 1.5-2.5a6 6 0 0 1 8.48 0c.76.64 1.32 1.52 1.5 2.5"/>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 3v6l4-2-4-2z" fill="currentColor"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
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

export const metadata = {
  title: 'About LittleGo - Smart Playground Finder for Australian Parents',
  description: 'Learn about LittleGo\'s mission to help Australian parents find the best playground for their kids right now using real-time weather, UV index, and shade data.',
};

export default function AboutPage() {
  return (
    <div className="bg-cream-light py-3xl">
      <div className="container">
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div className="card" style={{ padding: 'var(--space-3xl)' }}>
            
            {/* Hero Section */}
            <div className="text-center mb-3xl">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 'var(--space-lg)'
              }}>
                <LogoIcon />
              </div>
              <h1 style={{ 
                fontSize: 'var(--text-4xl)',
                fontWeight: '700',
                color: 'var(--color-text-dark)',
                marginBottom: 'var(--space-md)'
              }}>
                About LittleGo
              </h1>
              <p className="lead" style={{ 
                maxWidth: '32rem', 
                margin: '0 auto',
                color: 'var(--color-text-medium)'
              }}>
                Australia's smartest playground finder, built by parents for parents
              </p>
            </div>

            {/* Mission Statement */}
            <div className="mb-3xl">
              <h2 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-dark)',
                marginBottom: 'var(--space-lg)'
              }}>
                Our Mission
              </h2>
              <div style={{
                backgroundColor: 'var(--color-green-light)',
                borderLeft: '4px solid var(--color-green-medium)',
                padding: 'var(--space-lg)',
                borderRadius: '0 var(--radius-lg) var(--radius-lg) 0'
              }}>
                <p style={{ 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-green-dark)',
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  LittleGo helps Australian parents find the best playground for their kids, right now. 
                  We combine real-time weather, UV index, and shade data to give you a smart recommendation — 
                  so you never waste a trip.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-3xl">
              <h2 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-dark)',
                marginBottom: 'var(--space-lg)'
              }}>
                How It Works
              </h2>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                  <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-lg)',
                    backgroundColor: 'var(--color-cream-light)',
                    borderRadius: 'var(--radius-xl)'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#dbeafe',
                      color: '#2563eb',
                      borderRadius: 'var(--radius-xl)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--space-md)'
                    }}>
                      <MapPinIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Enter Your Postcode
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      We'll find playgrounds in your area
                    </p>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                  <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-lg)',
                    backgroundColor: 'var(--color-cream-light)',
                    borderRadius: 'var(--radius-xl)'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: 'var(--color-green-light)',
                      color: 'var(--color-green-dark)',
                      borderRadius: 'var(--radius-xl)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--space-md)'
                    }}>
                      <SunIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Real-Time Analysis
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      Weather, UV, shade, and age suitability
                    </p>
                  </div>
                </div>
                
                <div className="pure-u-1 pure-u-md-1-3" style={{ padding: 'var(--space-sm)' }}>
                  <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-lg)',
                    backgroundColor: 'var(--color-cream-light)',
                    borderRadius: 'var(--radius-xl)'
                  }}>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      backgroundColor: '#fef3c7',
                      color: '#f59e0b',
                      borderRadius: 'var(--radius-xl)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto var(--space-md)'
                    }}>
                      <TargetIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Smart Recommendations
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      Go Now, Caution, or Avoid guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-3xl">
              <h2 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-dark)',
                marginBottom: 'var(--space-lg)'
              }}>
                What Makes LittleGo Different
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'var(--color-green-light)',
                    color: 'var(--color-green-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '0.125rem'
                  }}>
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Real-Time Weather Integration
                    </h3>
                    <p style={{ color: 'var(--color-text-medium)', margin: '0' }}>
                      Live temperature, UV index, and wind data to help you plan the perfect playground visit
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'var(--color-green-light)',
                    color: 'var(--color-green-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '0.125rem'
                  }}>
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Shade Intelligence
                    </h3>
                    <p style={{ color: 'var(--color-text-medium)', margin: '0' }}>
                      Detailed shade mapping so you know when equipment will be too hot to touch
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'var(--color-green-light)',
                    color: 'var(--color-green-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '0.125rem'
                  }}>
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Age-Appropriate Filtering
                    </h3>
                    <p style={{ color: 'var(--color-text-medium)', margin: '0' }}>
                      Find playgrounds perfect for your child's age group and development stage
                    </p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: 'var(--color-green-light)',
                    color: 'var(--color-green-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: '0',
                    marginTop: '0.125rem'
                  }}>
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Facility Matching
                    </h3>
                    <p style={{ color: 'var(--color-text-medium)', margin: '0' }}>
                      Filter by toilets, parking, fencing, and other parent essentials
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="mb-3xl">
              <h2 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: '700',
                color: 'var(--color-text-dark)',
                marginBottom: 'var(--space-lg)'
              }}>
                Coming Soon
              </h2>
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-lg)'
              }}>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-md-1-3" style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
                    <div style={{ 
                      color: '#2563eb', 
                      marginBottom: 'var(--space-xs)',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <HomeIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Indoor Play Centres
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      Rainy day alternatives
                    </p>
                  </div>
                  
                  <div className="pure-u-1 pure-u-md-1-3" style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
                    <div style={{ 
                      color: '#7c3aed', 
                      marginBottom: 'var(--space-xs)',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <ArtIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Kids Classes
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      Swimming, sports, art
                    </p>
                  </div>
                  
                  <div className="pure-u-1 pure-u-md-1-3" style={{ textAlign: 'center', padding: 'var(--space-md)' }}>
                    <div style={{ 
                      color: '#059669', 
                      marginBottom: 'var(--space-xs)',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <CalendarIcon />
                    </div>
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-dark)',
                      marginBottom: 'var(--space-xs)'
                    }}>
                      Council Events
                    </h3>
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-medium)',
                      margin: '0'
                    }}>
                      Festivals and activities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center">
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
        </div>
      </div>
    </div>
  );
}