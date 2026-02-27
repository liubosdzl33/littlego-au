import Link from 'next/link';

const LogoIcon = () => (
  <svg className="icon icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

const GlobeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="pure-g">
          
          {/* Brand & Copyright */}
          <div className="pure-u-1 pure-u-md-1-3" style={{ marginBottom: 'var(--space-lg)' }}>
            <Link 
              href="/" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-sm)', 
                textDecoration: 'none',
                color: 'inherit',
                marginBottom: 'var(--space-md)'
              }}
            >
              <LogoIcon />
              <span style={{ 
                fontSize: 'var(--text-xl)', 
                fontWeight: '700', 
                color: 'var(--color-white)' 
              }}>
                LittleGo
              </span>
            </Link>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: 'var(--text-sm)', 
              lineHeight: '1.6',
              marginBottom: 'var(--space-md)'
            }}>
              Discover amazing places for families across Australia. Weather-aware suggestions, parent reviews, and age-perfect filtering for kids of all ages.
            </p>
            <p style={{ 
              color: '#6b7280', 
              fontSize: 'var(--text-xs)'
            }}>
              © 2026 LittleGo — Made with <HeartIcon /> by parents in Melbourne
            </p>
          </div>

          {/* Quick Links */}
          <div className="pure-u-1 pure-u-md-1-3" style={{ marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: 'var(--color-white)', 
              marginBottom: 'var(--space-md)',
              fontSize: 'var(--text-lg)'
            }}>
              Quick Links
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <Link href="/about" className="footer-link">
                About LittleGo
              </Link>
              <Link href="/blog" className="footer-link">
                Blog
              </Link>
              <Link href="/search" className="footer-link">
                Find Places
              </Link>
              <a 
                href="mailto:hello@littlego.com.au" 
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}
              >
                <EmailIcon />
                Contact Us
              </a>
            </div>
          </div>

          {/* Location & Info */}
          <div className="pure-u-1 pure-u-md-1-3" style={{ marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: 'var(--color-white)', 
              marginBottom: 'var(--space-md)',
              fontSize: 'var(--text-lg)'
            }}>
              Coverage
            </h3>
            
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--space-xs)', 
                marginBottom: 'var(--space-sm)',
                color: 'var(--color-green-light)' 
              }}>
                <GlobeIcon />
                <span style={{ fontWeight: '600' }}>Melbourne</span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: 'var(--text-sm)' }}>
                Starting with Melbourne, expanding across Australia
              </p>
            </div>

            <div style={{ 
              fontSize: 'var(--text-xs)', 
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              <p style={{ marginBottom: 'var(--space-xs)' }}>
                Weather data from Open-Meteo API
              </p>
              <p style={{ marginBottom: 'var(--space-xs)' }}>
                Place data is community-contributed
              </p>
              <p>
                All ages welcome · Parent reviews · Melbourne first
              </p>
            </div>
          </div>
          
        </div>
        
        <div style={{ 
          borderTop: '1px solid #374151', 
          marginTop: 'var(--space-2xl)', 
          paddingTop: 'var(--space-xl)', 
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>
            🇦🇺 Proudly Australian · Built by parents, for parents
          </p>
        </div>
      </div>
    </footer>
  );
}