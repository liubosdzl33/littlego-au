'use client';

import React, { useEffect, useState } from 'react';
import { getPlaygroundsByLocation, getPlaygroundImageData, getShadeInfo, getFacilityInfo } from '@/lib/playgrounds';
import { PlaygroundWithScore } from '@/types/playground';

const PlaygroundUIShowcase = () => {
  const [playgrounds, setPlaygrounds] = useState<PlaygroundWithScore[]>([]);
  const [activeSection, setActiveSection] = useState('concept-1');

  useEffect(() => {
    const data = getPlaygroundsByLocation(-37.8136, 145.0, 15).slice(0, 3);
    setPlaygrounds(data);
  }, []);

  // Quick scroll to section
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const concepts = [
    { id: 'concept-1', name: 'Airbnb Classic', description: 'Vertical card: square map image top, text below. Clean, minimal white bg.' },
    { id: 'concept-2', name: 'Horizontal Split', description: 'Image left (40%), info right (60%). Like Google Maps listing cards.' },
    { id: 'concept-3', name: 'Compact List', description: 'No image, just a clean row: name | distance | Free badge | shade icon.' },
    { id: 'concept-4', name: 'Pinterest Masonry', description: 'Varied height cards in a masonry grid. Taller cards for featured parks.' },
    { id: 'concept-5', name: 'Magazine Hero', description: 'One large featured card + 2 smaller cards in a row. Editorial feel.' },
    { id: 'concept-6', name: 'Overlay Gradient', description: 'Map image with dark gradient overlay, white text on the gradient.' },
    { id: 'concept-7', name: 'Circular Map', description: 'Round map thumbnail (like profile pics), info to the right. Kid-friendly.' },
    { id: 'concept-8', name: 'Full Bleed Image', description: 'Image takes entire card, all text overlaid in white. Bold, immersive.' },
    { id: 'concept-9', name: 'Polaroid Style', description: 'White border around map image, tilted slightly, handwritten style name.' },
    { id: 'concept-10', name: 'Split Diagonal', description: 'Map image takes left half with diagonal clip-path, info on right.' },
    { id: 'concept-11', name: 'Dashboard Cards', description: 'Stats-heavy: prominent score, temperature, UV, distance in data-dense card.' },
    { id: 'concept-12', name: 'Minimal Zen', description: 'Ultra-minimal: just name, distance, one icon. Lots of whitespace. Apple inspired.' },
    { id: 'concept-13', name: 'Tag Cloud', description: 'Card body is a visual cloud of facility/feature tags with coloured pills.' },
    { id: 'concept-14', name: 'Timeline Card', description: 'Shows best times to visit as visual timeline. Morning/afternoon/evening slots.' },
    { id: 'concept-15', name: 'Comparison Card', description: 'Two parks side by side with visual comparison bars (shade, distance, score).' },
    { id: 'concept-16', name: 'Glassmorphism', description: 'Frosted glass background, blur effect, soft borders. Modern, premium feel.' },
    { id: 'concept-17', name: 'Neumorphism', description: 'Soft extruded look with light/dark shadows. Tactile, touchable feel.' },
    { id: 'concept-18', name: 'Brutalist', description: 'Raw, bold. Black borders, monospace font, high contrast. Anti-corporate.' },
    { id: 'concept-19', name: 'Pastel Playful', description: 'Soft pastel backgrounds, rounded everything, playful icons. Very kid-friendly.' },
    { id: 'concept-20', name: 'Dark Mode Premium', description: 'Dark background (#1a1a2e), light text, accent colours pop. Sleek evening mode.' }
  ];

  if (playgrounds.length === 0) {
    return <div className="p-8 text-center">Loading playground data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">LittleGo Design Playground</h1>
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
              {concepts.map((concept, idx) => (
                <button
                  key={concept.id}
                  onClick={() => scrollToSection(concept.id)}
                  className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors ${
                    activeSection === concept.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}. {concept.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b p-4">
        <select
          onChange={(e) => scrollToSection(e.target.value)}
          className="w-full p-2 border rounded"
          value={activeSection}
        >
          {concepts.map((concept, idx) => (
            <option key={concept.id} value={concept.id}>
              {idx + 1}. {concept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

        {/* Concept 1: Airbnb Classic */}
        <section id="concept-1" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">1. Airbnb Classic</h2>
            <p className="text-gray-600">Vertical card: square map image top, text below. Clean, minimal white bg.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{playground.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                      <span className={`${shadeInfo.color} flex items-center gap-1`}>
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 2: Horizontal Split */}
        <section id="concept-2" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">2. Horizontal Split</h2>
            <p className="text-gray-600">Image left (40%), info right (60%). Like Google Maps listing cards.</p>
          </div>
          <div className="space-y-4">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer flex"
                >
                  <div className="w-2/5 aspect-square bg-gray-200">
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-3/5 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{playground.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {playground.facilities.slice(0, 3).map((facility) => {
                          const facilityInfo = getFacilityInfo(facility);
                          return (
                            <span key={facility} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {facilityInfo.emoji} {facilityInfo.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                      <span className={`${shadeInfo.color} flex items-center gap-1`}>
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 3: Compact List */}
        <section id="concept-3" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">3. Compact List</h2>
            <p className="text-gray-600">No image, just a clean row: name | distance | Free badge | shade icon.</p>
          </div>
          <div className="space-y-2">
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{playground.name}</h3>
                    <p className="text-sm text-gray-600">{playground.address}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{playground.distance?.toFixed(1)}km</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">FREE</span>
                    <span className={`${shadeInfo.color} text-lg`}>{shadeInfo.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 4: Pinterest Masonry */}
        <section id="concept-4" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">4. Pinterest Masonry</h2>
            <p className="text-gray-600">Varied height cards in a masonry grid. Taller cards for featured parks.</p>
          </div>
          <div className="columns-1 md:columns-3 gap-6">
            {playgrounds.map((playground, idx) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const isLarge = idx === 0;
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer break-inside-avoid mb-6"
                >
                  <div className={`bg-gray-200 relative ${isLarge ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                    {isLarge && (
                      <div className="absolute top-3 left-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className={`font-semibold text-gray-900 mb-1 ${isLarge ? 'text-lg' : ''}`}>{playground.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                    {isLarge && (
                      <p className="text-sm text-gray-500 mb-3">
                        Great for families with multiple age groups. Features varied equipment and excellent shade coverage.
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                      <span className={`${shadeInfo.color} flex items-center gap-1`}>
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 5: Magazine Hero */}
        <section id="concept-5" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">5. Magazine Hero</h2>
            <p className="text-gray-600">One large featured card + 2 smaller cards in a row. Editorial feel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground, idx) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const isHero = idx === 0;
              return (
                <div
                  key={playground.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-200 overflow-hidden cursor-pointer ${
                    isHero ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <div className={`bg-gray-200 relative ${isHero ? 'aspect-[4/3]' : 'aspect-square'}`}>
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                    {isHero && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    )}
                    {isHero && (
                      <div className="absolute bottom-6 left-6 text-white">
                        <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full mb-2 inline-block">
                          🌟 Editor's Pick
                        </span>
                        <h3 className="text-2xl font-bold mb-1">{playground.name}</h3>
                        <p className="text-sm opacity-90">{playground.address}</p>
                      </div>
                    )}
                  </div>
                  {!isHero && (
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{playground.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{playground.distance?.toFixed(1)}km</span>
                        <span className={`${shadeInfo.color} flex items-center gap-1`}>
                          {shadeInfo.emoji}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 6: Overlay Gradient */}
        <section id="concept-6" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">6. Overlay Gradient</h2>
            <p className="text-gray-600">Map image with dark gradient overlay, white text on the gradient.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="relative bg-gray-200 rounded-xl overflow-hidden cursor-pointer aspect-[4/3] group hover:scale-105 transition-transform"
                >
                  <img
                    src={imageData.mapUrl}
                    alt={`Map of ${playground.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                        {playground.distance?.toFixed(1)}km away
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{playground.name}</h3>
                    <p className="text-sm opacity-90">{playground.address}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 7: Circular Map */}
        <section id="concept-7" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">7. Circular Map</h2>
            <p className="text-gray-600">Round map thumbnail (like profile pics), info to the right. Kid-friendly.</p>
          </div>
          <div className="space-y-4">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border-2 border-pink-100 p-6 cursor-pointer flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-pink-200 flex-shrink-0">
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{playground.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{playground.address}</p>
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                        🚗 {playground.distance?.toFixed(1)}km
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl">🎈</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 8: Full Bleed Image */}
        <section id="concept-8" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">8. Full Bleed Image</h2>
            <p className="text-gray-600">Image takes entire card, all text overlaid in white. Bold, immersive.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="relative bg-gray-200 rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] group hover:scale-105 transition-transform"
                >
                  <img
                    src={imageData.mapUrl}
                    alt={`Map of ${playground.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                        FREE
                      </span>
                      <span className="text-2xl">{shadeInfo.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">{playground.name}</h3>
                      <p className="text-sm opacity-90 mb-3">{playground.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{playground.distance?.toFixed(1)}km away</span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs">Open now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 9: Polaroid Style */}
        <section id="concept-9" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">9. Polaroid Style</h2>
            <p className="text-gray-600">White border around map image, tilted slightly, handwritten style name.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {playgrounds.map((playground, idx) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const rotation = idx % 2 === 0 ? 'rotate-2' : '-rotate-1';
              return (
                <div
                  key={playground.id}
                  className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer transform ${rotation} hover:rotate-0 hover:scale-105`}
                >
                  <div className="aspect-square bg-gray-200 mb-4">
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2"
                      style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
                    >
                      {playground.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-sm text-gray-500">{playground.distance?.toFixed(1)}km</span>
                      <span className={`${shadeInfo.color} text-sm flex items-center gap-1`}>
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 10: Split Diagonal */}
        <section id="concept-10" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">10. Split Diagonal</h2>
            <p className="text-gray-600">Map image takes left half with diagonal clip-path, info on right.</p>
          </div>
          <div className="space-y-4">
            {playgrounds.map((playground) => {
              const imageData = getPlaygroundImageData(playground);
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden cursor-pointer flex h-32"
                >
                  <div 
                    className="w-1/2 relative bg-gray-200"
                    style={{ clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }}
                  >
                    <img
                      src={imageData.mapUrl}
                      alt={`Map of ${playground.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 p-4 flex flex-col justify-center ml-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{playground.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{playground.address}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                      <span className={`${shadeInfo.color} flex items-center gap-1`}>
                        {shadeInfo.emoji} {shadeInfo.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 11: Dashboard Cards */}
        <section id="concept-11" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">11. Dashboard Cards</h2>
            <p className="text-gray-600">Stats-heavy: prominent score, temperature, UV, distance in data-dense card.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground, idx) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const score = Math.floor(Math.random() * 30) + 70; // Mock score 70-99
              const temp = Math.floor(Math.random() * 15) + 18; // Mock temp 18-32
              const uv = Math.floor(Math.random() * 8) + 1; // Mock UV 1-8
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-blue-600">{score}</div>
                    <div className="text-right text-sm text-gray-500">
                      <div>Score</div>
                      <div className="text-xs">out of 100</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-1">{playground.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 truncate">{playground.address}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{temp}°C</div>
                      <div className="text-xs text-gray-500">Temp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{uv}</div>
                      <div className="text-xs text-gray-500">UV Index</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{playground.distance?.toFixed(1)}</div>
                      <div className="text-xs text-gray-500">km</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <span className={`${shadeInfo.color} text-sm flex items-center gap-1`}>
                      {shadeInfo.emoji} {shadeInfo.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 12: Minimal Zen */}
        <section id="concept-12" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">12. Minimal Zen</h2>
            <p className="text-gray-600">Ultra-minimal: just name, distance, one icon. Lots of whitespace. Apple inspired.</p>
          </div>
          <div className="space-y-12">
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-3xl border border-gray-100 p-12 cursor-pointer hover:bg-gray-50 transition-colors text-center"
                >
                  <div className="text-4xl mb-6">{shadeInfo.emoji}</div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2">{playground.name}</h3>
                  <p className="text-gray-500 font-light">{playground.distance?.toFixed(1)}km away</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 13: Tag Cloud */}
        <section id="concept-13" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">13. Tag Cloud</h2>
            <p className="text-gray-600">Card body is a visual cloud of facility/feature tags with coloured pills.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const allTags = [
                ...playground.facilities.map(f => getFacilityInfo(f)),
                ...playground.equipment.slice(0, 4).map(e => ({ label: e.replace('_', ' '), emoji: '🎪' })),
                { label: `${playground.distance?.toFixed(1)}km away`, emoji: '📍' },
                { label: shadeInfo.label, emoji: shadeInfo.emoji }
              ];
              
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-4 text-center">{playground.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {allTags.slice(0, 12).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-full ${
                          idx % 4 === 0 ? 'bg-blue-100 text-blue-700' :
                          idx % 4 === 1 ? 'bg-green-100 text-green-700' :
                          idx % 4 === 2 ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {tag.emoji} {tag.label}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 text-center">{playground.address}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 14: Timeline Card */}
        <section id="concept-14" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">14. Timeline Card</h2>
            <p className="text-gray-600">Shows best times to visit as visual timeline. Morning/afternoon/evening slots.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{playground.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{playground.address}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Best times to visit</div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-8 text-xs text-gray-500">6AM</div>
                      <div className="flex-1 flex">
                        <div className="w-1/3 h-2 bg-yellow-200 rounded-l"></div>
                        <div className="w-1/3 h-2 bg-green-400"></div>
                        <div className="w-1/3 h-2 bg-orange-300 rounded-r"></div>
                      </div>
                      <div className="w-8 text-xs text-gray-500 text-right">8PM</div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Morning</span>
                      <span className="font-medium text-green-600">Afternoon</span>
                      <span>Evening</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                    <span className={`${shadeInfo.color} flex items-center gap-1`}>
                      {shadeInfo.emoji} {shadeInfo.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 15: Comparison Card */}
        <section id="concept-15" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">15. Comparison Card</h2>
            <p className="text-gray-600">Two parks side by side with visual comparison bars (shade, distance, score).</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">Compare Playgrounds</h3>
              <div className="grid grid-cols-2 gap-6">
                {playgrounds.slice(0, 2).map((playground, idx) => {
                  const shadeInfo = getShadeInfo(playground.shadeLevel);
                  const score = Math.floor(Math.random() * 30) + 70;
                  const shadeScore = playground.shadeLevel === 'full' ? 90 : playground.shadeLevel === 'partial' ? 60 : 30;
                  
                  return (
                    <div key={playground.id} className={`${idx === 0 ? 'border-r border-gray-200 pr-6' : 'pl-6'}`}>
                      <h4 className="font-medium text-gray-900 mb-2">{playground.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{playground.address}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Score</span>
                            <span className="font-medium">{score}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${score}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Shade Coverage</span>
                            <span className="font-medium">{shadeScore}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${shadeScore}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Distance</span>
                            <span className="font-medium">{playground.distance?.toFixed(1)}km</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${Math.max(10, 100 - (playground.distance || 0) * 10)}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Concept 16: Glassmorphism */}
        <section id="concept-16" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">16. Glassmorphism</h2>
            <p className="text-gray-600">Frosted glass background, blur effect, soft borders. Modern, premium feel.</p>
          </div>
          <div 
            className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl"
            style={{
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 p-6 cursor-pointer hover:bg-white/30 transition-all text-white"
                  style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
                >
                  <h3 className="font-semibold text-white mb-2">{playground.name}</h3>
                  <p className="text-white/80 text-sm mb-4">{playground.address}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 backdrop-blur-sm text-xs px-3 py-1 rounded-full">
                      {playground.distance?.toFixed(1)}km away
                    </span>
                    <span className="text-lg">{shadeInfo.emoji}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 17: Neumorphism */}
        <section id="concept-17" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">17. Neumorphism</h2>
            <p className="text-gray-600">Soft extruded look with light/dark shadows. Tactile, touchable feel.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {playgrounds.map((playground) => {
                const shadeInfo = getShadeInfo(playground.shadeLevel);
                return (
                  <div
                    key={playground.id}
                    className="bg-gray-100 rounded-3xl p-6 cursor-pointer hover:scale-105 transition-transform"
                    style={{
                      boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                    }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                      style={{
                        boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
                      }}
                    >
                      {shadeInfo.emoji}
                    </div>
                    <h3 className="font-medium text-gray-800 text-center mb-2">{playground.name}</h3>
                    <p className="text-sm text-gray-600 text-center mb-3">{playground.address}</p>
                    <div className="text-center">
                      <span className="text-sm text-gray-500">{playground.distance?.toFixed(1)}km away</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Concept 18: Brutalist */}
        <section id="concept-18" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">18. Brutalist</h2>
            <p className="text-gray-600">Raw, bold. Black borders, monospace font, high contrast. Anti-corporate.</p>
          </div>
          <div className="space-y-4">
            {playgrounds.map((playground) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              return (
                <div
                  key={playground.id}
                  className="bg-white border-4 border-black p-6 cursor-pointer hover:bg-yellow-300 transition-colors"
                  style={{ fontFamily: 'monospace' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-1 uppercase tracking-wide">{playground.name}</h3>
                      <p className="text-sm text-black mb-2 uppercase">{playground.address}</p>
                      <div className="flex items-center gap-4">
                        <span className="bg-black text-white px-2 py-1 text-xs font-bold">
                          {playground.distance?.toFixed(1)}KM
                        </span>
                        <span className="bg-black text-white px-2 py-1 text-xs font-bold">
                          {shadeInfo.label.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-6xl text-black">{shadeInfo.emoji}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 19: Pastel Playful */}
        <section id="concept-19" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">19. Pastel Playful</h2>
            <p className="text-gray-600">Soft pastel backgrounds, rounded everything, playful icons. Very kid-friendly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playgrounds.map((playground, idx) => {
              const shadeInfo = getShadeInfo(playground.shadeLevel);
              const colors = ['bg-pink-100', 'bg-blue-100', 'bg-purple-100'];
              const accentColors = ['text-pink-600', 'text-blue-600', 'text-purple-600'];
              const bgColor = colors[idx % 3];
              const accentColor = accentColors[idx % 3];
              
              return (
                <div
                  key={playground.id}
                  className={`${bgColor} rounded-[2rem] p-6 cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🎪</div>
                    <h3 className={`font-bold ${accentColor} text-lg mb-1`}>{playground.name}</h3>
                    <p className="text-sm text-gray-600">{playground.address}</p>
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                      🚗 {playground.distance?.toFixed(1)}km
                    </span>
                    <span className="bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                      {shadeInfo.emoji} {shadeInfo.label}
                    </span>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {['🎠', '🛝', '🌳'].map((icon, i) => (
                      <div key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm">
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Concept 20: Dark Mode Premium */}
        <section id="concept-20" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">20. Dark Mode Premium</h2>
            <p className="text-gray-600">Dark background (#1a1a2e), light text, accent colours pop. Sleek evening mode.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {playgrounds.map((playground) => {
                const shadeInfo = getShadeInfo(playground.shadeLevel);
                return (
                  <div
                    key={playground.id}
                    className="bg-gray-800 rounded-2xl border border-gray-700 p-6 cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{playground.name}</h3>
                        <p className="text-sm text-gray-400">{playground.address}</p>
                      </div>
                      <span className="text-2xl">{shadeInfo.emoji}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {playground.distance?.toFixed(1)}km away
                      </span>
                      <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                        {shadeInfo.label}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          Open now
                        </span>
                        <span className="text-gray-400">Free entry</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            LittleGo Design Playground - 20 Card Design Concepts for Venus to Review
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built with real playground data from Melbourne. Select your favourite designs!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PlaygroundUIShowcase;