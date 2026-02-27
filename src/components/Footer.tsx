import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Copyright */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">LittleGo</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              © 2026 LittleGo — Helping Australian parents find the best playground
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
              >
                About
              </Link>
              <a 
                href="mailto:hello@littlego.com.au" 
                className="text-gray-600 hover:text-yellow-600 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social & Credits */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Connect</h3>
            <div className="flex space-x-4">
              {/* Social placeholder links */}
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.467 4.467-4.467c2.458 0 4.468 2.009 4.468 4.467s-2.01 4.468-4.468 4.468z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>Weather data from Open-Meteo</p>
              <p>Playground data is community-contributed</p>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            Built by parents, for parents 💛
          </p>
        </div>
      </div>
    </footer>
  );
}