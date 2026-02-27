'use client';

import { useState } from 'react';

export default function LandingPage() {
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
                🌟 LittleGo
              </h1>
              <div className="w-32 h-2 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full"></div>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Discover amazing places for your{' '}
              <span className="text-green-600">little ones</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Like Yelp for parents! Find playgrounds, cafes, indoor play centres and activities 
              perfect for 1-4 year olds across Australia. Weather-aware suggestions included! 🌤️
            </p>

            {/* CTA Button */}
            <div className="mb-12">
              <a 
                href="#waitlist" 
                className="btn-coral text-lg md:text-xl font-bold inline-block"
              >
                🚀 Join the Waitlist - Coming Soon!
              </a>
            </div>

            {/* Hero Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm md:text-base">
              <div className="flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3">
                <span className="text-2xl">☔</span>
                <span className="font-semibold text-gray-700">Weather-aware</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3">
                <span className="text-2xl">💰</span>
                <span className="font-semibold text-gray-700">Free & paid options</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-3">
                <span className="text-2xl">📍</span>
                <span className="font-semibold text-gray-700">Melbourne first</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 pulse-gentle">🎠</div>
        <div className="absolute top-40 right-16 text-5xl opacity-20 pulse-gentle" style={{animationDelay: '0.5s'}}>🏃‍♀️</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-20 pulse-gentle" style={{animationDelay: '1s'}}>🌳</div>
        <div className="absolute bottom-20 right-12 text-5xl opacity-20 pulse-gentle" style={{animationDelay: '1.5s'}}>☀️</div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How LittleGo Works
            </h3>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Three simple steps to discover the perfect place for your family today
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  🔍
                </div>
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Search</h4>
                <p className="text-gray-600">
                  Enter your location and tell us your child's age. Filter by indoor/outdoor, cost, and distance.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  ✨
                </div>
                <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Discover</h4>
                <p className="text-gray-600">
                  Get personalised suggestions based on weather, UV levels, and community reviews from other parents.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  📝
                </div>
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Review</h4>
                <p className="text-gray-600">
                  Share photos and reviews to help other parents discover amazing places too!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Smart Features for Aussie Parents
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We understand the unique challenges of parenting in Australia - from UV concerns to unpredictable weather
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card text-center">
                <div className="text-4xl mb-4">🌤️</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Weather-Aware Suggestions</h4>
                <p className="text-gray-600">
                  Rainy day? We'll show you the best indoor play centres. Sunny? Here are shaded parks and splash pads nearby.
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Age-Perfect Filtering</h4>
                <p className="text-gray-600">
                  Find spots specifically suited for your toddler's developmental stage (1-4 years). No more guessing!
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="text-4xl mb-4">💰</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Free & Paid Options</h4>
                <p className="text-gray-600">
                  Budget-conscious? Filter for free activities or set your spending limit. We've got options for every wallet.
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="text-4xl mb-4">📍</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Distance-Smart Search</h4>
                <p className="text-gray-600">
                  Find places within walking distance, short drive, or plan a special day trip. You choose the radius.
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="text-4xl mb-4">⭐</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Parent Reviews</h4>
                <p className="text-gray-600">
                  Real reviews from real parents. See photos, safety tips, and honest opinions from your local community.
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">Indoor/Outdoor Toggle</h4>
                <p className="text-gray-600">
                  Need shelter or fresh air? Instantly filter between covered areas and outdoor adventures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Every Type of Adventure
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From energetic playground sessions to quiet cafe visits - we've got every kind of family outing covered
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏞️</div>
                <h4 className="font-bold text-gray-800 mb-2">Playgrounds & Parks</h4>
                <p className="text-sm text-gray-600">Swings, slides, and open spaces for active play</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎪</div>
                <h4 className="font-bold text-gray-800 mb-2">Indoor Play Centres</h4>
                <p className="text-sm text-gray-600">Climate-controlled fun for any weather</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">☕</div>
                <h4 className="font-bold text-gray-800 mb-2">Kid-Friendly Cafes</h4>
                <p className="text-sm text-gray-600">Great coffee + entertainment for little ones</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                <h4 className="font-bold text-gray-800 mb-2">Classes & Activities</h4>
                <p className="text-sm text-gray-600">Music, art, swimming, and learning experiences</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💦</div>
                <h4 className="font-bold text-gray-800 mb-2">Splash Pads & Pools</h4>
                <p className="text-sm text-gray-600">Water play for hot Australian days</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛍️</div>
                <h4 className="font-bold text-gray-800 mb-2">Family Shopping</h4>
                <p className="text-sm text-gray-600">Kid-friendly shops and shopping centres</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h4 className="font-bold text-gray-800 mb-2">Libraries & Learning</h4>
                <p className="text-sm text-gray-600">Story time, programs, and quiet activities</p>
              </div>

              <div className="category-card text-center group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🦘</div>
                <h4 className="font-bold text-gray-800 mb-2">Unique Experiences</h4>
                <p className="text-sm text-gray-600">Zoos, farms, festivals, and special events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Community */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">👨‍👩‍👧‍👦</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Built by Parents, for Parents
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              We're Melbourne parents who got tired of wondering "where should we go with the kids today?" 
              So we built the platform we wished existed - and we're sharing it with you! 💚
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🌏</div>
                <div className="text-2xl font-bold text-green-600 mb-2">Melbourne First</div>
                <p className="text-gray-600">Starting with our home city, then expanding across Australia</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">👶</div>
                <div className="text-2xl font-bold text-green-600 mb-2">Ages 1-4 Focus</div>
                <p className="text-gray-600">Specifically designed for the unique needs of toddlers</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🤝</div>
                <div className="text-2xl font-bold text-green-600 mb-2">Community Driven</div>
                <p className="text-gray-600">Real reviews and photos from parents in your neighbourhood</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 italic mb-4">
                "We spent too many weekends driving around aimlessly, hoping to find somewhere suitable for our 2-year-old. 
                Now we're building the solution we always wanted - and we can't wait to share it!"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  👨‍💼
                </div>
                <div>
                  <div className="font-bold text-gray-800">The LittleGo Team</div>
                  <div className="text-gray-600">Parent founders in Melbourne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Signup */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-green-400 to-yellow-400">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🚀 Be the First to Know!
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join our waitlist to get early access when we launch in Melbourne. 
              Plus, get a sneak peek at the best kid-friendly spots we've already discovered!
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {showSuccess ? (
                <div className="text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h4 className="text-2xl font-bold text-green-600 mb-2">Welcome aboard!</h4>
                  <p className="text-gray-600">We'll be in touch soon with exclusive early access info.</p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      className="btn-secondary text-lg font-bold px-8 py-4 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Joining...
                        </div>
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>No spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Melbourne parents only</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">✓</span>
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h4 className="text-2xl font-bold mb-2">🌟 LittleGo</h4>
                <p className="text-gray-400">Discover amazing places for your little ones across Australia</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                &copy; 2024 LittleGo. Made with 💚 by parents in Melbourne, for parents across Australia.
              </p>
              <div className="mt-4 flex justify-center items-center space-x-4 text-sm text-gray-500">
                <span>🇦🇺 Proudly Australian</span>
                <span>•</span>
                <span>Starting in Melbourne</span>
                <span>•</span>
                <span>Expanding Australia-wide</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}