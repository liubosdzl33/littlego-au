export const metadata = {
  title: 'About LittleGo - Smart Playground Finder for Australian Parents',
  description: 'Learn about LittleGo\'s mission to help Australian parents find the best playground for their kids right now using real-time weather, UV index, and shade data.',
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About LittleGo
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Australia's smartest playground finder, built by parents for parents
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                LittleGo helps Australian parents find the best playground for their kids, right now. 
                We combine real-time weather, UV index, and shade data to give you a smart recommendation — 
                so you never waste a trip.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  📍
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enter Your Postcode</h3>
                <p className="text-sm text-gray-600">We'll find playgrounds in your area</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  🌤️
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Analysis</h3>
                <p className="text-sm text-gray-600">Weather, UV, shade, and age suitability</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  🎯
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
                <p className="text-sm text-gray-600">Go Now, Caution, or Avoid guidance</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Makes LittleGo Different</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-Time Weather Integration</h3>
                  <p className="text-gray-600">Live temperature, UV index, and wind data to help you plan the perfect playground visit</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Shade Intelligence</h3>
                  <p className="text-gray-600">Detailed shade mapping so you know when equipment will be too hot to touch</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Age-Appropriate Filtering</h3>
                  <p className="text-gray-600">Find playgrounds perfect for your child's age group and development stage</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Facility Matching</h3>
                  <p className="text-gray-600">Filter by toilets, parking, fencing, and other parent essentials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-2">🏢</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Indoor Play Centres</h3>
                  <p className="text-sm text-gray-600">Rainy day alternatives</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">🎨</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Kids Classes</h3>
                  <p className="text-sm text-gray-600">Swimming, sports, art</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">📅</div>
                  <h3 className="font-semibold text-gray-900 mb-1">Council Events</h3>
                  <p className="text-sm text-gray-600">Festivals and activities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Built by parents, for parents 💛</h2>
            <p className="text-gray-600 mb-6">
              Have feedback or want to add a playground to our database?
            </p>
            <a 
              href="mailto:hello@littlego.com.au"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Contact Us
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Email: hello@littlego.com.au
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}