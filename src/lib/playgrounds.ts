import { Playground, PlaygroundWithScore, AgeTag, Facility, Equipment } from '@/types/playground';
import playgroundsData from '@/data/playgrounds.json';

export const playgrounds: Playground[] = playgroundsData as Playground[];

// Calculate distance between two points using Haversine formula
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get playground by slug
export function getPlaygroundBySlug(slug: string): Playground | null {
  return playgrounds.find(p => p.slug === slug) || null;
}

// Get playgrounds by postcode with distance calculation from a center point
export function getPlaygroundsByLocation(centerLat: number, centerLng: number, radiusKm: number = 10): PlaygroundWithScore[] {
  return playgrounds
    .map(playground => ({
      ...playground,
      distance: calculateDistance(centerLat, centerLng, playground.lat, playground.lng)
    }))
    .filter(playground => playground.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);
}

// Get playgrounds by postcode
export function getPlaygroundsByPostcode(postcode: string): Playground[] {
  return playgrounds.filter(p => p.postcode === postcode);
}

// Get center coordinates for a postcode (simplified - in production would use a proper postcode API)
export function getPostcodeCoordinates(postcode: string): { lat: number; lng: number } | null {
  // For demo purposes, return coordinates based on known postcodes in our data
  const postcodeMap: Record<string, { lat: number; lng: number }> = {
    '3163': { lat: -37.8900, lng: 145.0650 }, // Murrumbeena/Carnegie
    '3162': { lat: -37.8950, lng: 145.0270 }, // Caulfield South
    '3166': { lat: -37.8900, lng: 145.0450 }, // Malvern East/Caulfield East
    '3204': { lat: -37.9150, lng: 145.0380 }, // Bentleigh/McKinnon
    '3148': { lat: -37.8850, lng: 145.0850 }, // Malvern/Toorak
    '3146': { lat: -37.8750, lng: 145.0550 }, // Toorak/Armadale
    '3144': { lat: -37.8650, lng: 145.0350 }, // Malvern/Toorak
    '3161': { lat: -37.8760, lng: 145.0330 }, // Caulfield North
    '3185': { lat: -37.8840, lng: 145.0120 }, // Elsternwick
    '3187': { lat: -37.9100, lng: 145.0100 }, // Brighton East
    '3183': { lat: -37.8700, lng: 145.0000 }, // St Kilda East
    '3186': { lat: -37.9120, lng: 145.0010 }, // Brighton
    '3189': { lat: -37.9380, lng: 145.0420 }, // Moorabbin
    '3145': { lat: -37.8800, lng: 145.0680 }, // Malvern East
    '3165': { lat: -37.9180, lng: 145.0580 }, // Bentleigh East
  };
  
  return postcodeMap[postcode] || null;
}

// Get age tag display info
export function getAgeTagInfo(tag: AgeTag): { label: string; emoji: string; color: string } {
  const tagMap = {
    'toddler': { label: 'Toddler (1-3)', emoji: '👶', color: 'bg-pink-100 text-pink-800' },
    'kinder': { label: 'Kinder (3-5)', emoji: '🧒', color: 'bg-blue-100 text-blue-800' },
    'primary': { label: 'Primary (5-12)', emoji: '🧑‍🎓', color: 'bg-green-100 text-green-800' },
    'older': { label: 'Older (12+)', emoji: '👦', color: 'bg-purple-100 text-purple-800' }
  };
  return tagMap[tag];
}

// Get facility display info
export function getFacilityInfo(facility: Facility): { label: string; emoji: string } {
  const facilityMap = {
    'fenced': { label: 'Fenced', emoji: '🔒' },
    'toilets': { label: 'Toilets', emoji: '🚻' },
    'parking': { label: 'Parking', emoji: '🅿️' },
    'water_fountain': { label: 'Water', emoji: '🚰' },
    'bbq': { label: 'BBQ', emoji: '🔥' },
    'picnic_tables': { label: 'Picnic Tables', emoji: '🪑' },
    'oval': { label: 'Oval', emoji: '⚽' },
    'tennis_courts': { label: 'Tennis', emoji: '🎾' },
    'beach_nearby': { label: 'Beach Nearby', emoji: '🏖️' },
    'cafe_nearby': { label: 'Cafe Nearby', emoji: '☕' }
  };
  return facilityMap[facility];
}

// Get equipment display info
export function getEquipmentInfo(equipment: Equipment): { label: string; emoji: string } {
  const equipmentMap = {
    'baby_swing': { label: 'Baby Swing', emoji: '👶' },
    'toddler_swing': { label: 'Toddler Swing', emoji: '🪆' },
    'swing': { label: 'Swing', emoji: '🎪' },
    'slide': { label: 'Slide', emoji: '🛝' },
    'toddler_slide': { label: 'Toddler Slide', emoji: '🛝' },
    'climbing': { label: 'Climbing', emoji: '🧗' },
    'sandpit': { label: 'Sandpit', emoji: '🏖️' },
    'monkey_bars': { label: 'Monkey Bars', emoji: '🐵' },
    'see_saw': { label: 'See Saw', emoji: '⚖️' },
    'spinning_cup': { label: 'Spinning Cup', emoji: '🌀' },
    'balance_beam': { label: 'Balance Beam', emoji: '⚖️' },
    'flying_fox': { label: 'Flying Fox', emoji: '🦊' },
    'spinning_equipment': { label: 'Spinning Equipment', emoji: '🌀' },
    'balance_equipment': { label: 'Balance Equipment', emoji: '⚖️' },
    'sensory_play': { label: 'Sensory Play', emoji: '🎨' }
  };
  return equipmentMap[equipment];
}

// Get shade level display info
export function getShadeInfo(shadeLevel: string): { label: string; color: string; emoji: string } {
  const shadeMap: Record<string, { label: string; color: string; emoji: string }> = {
    'minimal': { label: 'Minimal Shade', color: 'text-red-600', emoji: '☀️' },
    'partial': { label: 'Partial Shade', color: 'text-yellow-600', emoji: '⛅' },
    'full': { label: 'Full Shade', color: 'text-green-600', emoji: '🌳' }
  };
  return shadeMap[shadeLevel] || shadeMap['minimal'];
}