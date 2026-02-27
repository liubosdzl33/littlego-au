import Link from 'next/link';

const SearchIcon = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const PlaygroundIcon = () => (
  <svg className="icon icon-2xl" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="16" width="16" height="4" rx="2"/>
    <path d="M8 16V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"/>
    <circle cx="12" cy="4" r="2"/>
  </svg>
);

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      backgroundColor: 'var(--color-cream-light)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 var(--space-md)'
    }}>
      <div className="text-center" style={{ maxWidth: '32rem' }}>
        {/* Fun illustration */}
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: 'var(--space-lg)', 
          color: 'var(--color-green-medium)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <PlaygroundIcon />
        </div>
        
        <h1 style={{ 
          fontSize: 'var(--text-3xl)', 
          fontWeight: '700', 
          color: 'var(--color-text-dark)', 
          marginBottom: 'var(--space-md)',
          lineHeight: '1.2'
        }}>
          Oops! This playground doesn't exist
        </h1>
        
        <p style={{ 
          fontSize: 'var(--text-lg)', 
          color: 'var(--color-text-medium)', 
          marginBottom: 'var(--space-2xl)',
          lineHeight: '1.6'
        }}>
          Looks like this page wandered off to play somewhere else. 
          Let's find you a real playground instead!
        </p>
        
        <Link 
          href="/"
          className="btn-coral"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)' }}
        >
          <SearchIcon />
          Find Playgrounds Near Me
        </Link>
        
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-light)' }}>
            Or{' '}
            <Link 
              href="/about" 
              style={{ 
                color: 'var(--color-coral)', 
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              learn more about LittleGo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}