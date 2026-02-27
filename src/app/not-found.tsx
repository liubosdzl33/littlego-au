import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Fun illustration */}
        <div className="text-6xl mb-6">🏞️</div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! This playground doesn't exist
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Looks like this page wandered off to play somewhere else. 
          Let's find you a real playground instead!
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Playgrounds Near Me
        </Link>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Or{' '}
            <Link href="/about" className="text-yellow-600 hover:text-yellow-700 font-medium">
              learn more about LittleGo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}