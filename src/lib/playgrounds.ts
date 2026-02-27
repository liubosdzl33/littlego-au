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
  // Comprehensive Melbourne postcode mapping (3000-3210)
  const postcodeMap: Record<string, { lat: number; lng: number }> = {
    // Inner Melbourne
    '3000': { lat: -37.8136, lng: 144.9631 }, // Melbourne CBD
    '3001': { lat: -37.8136, lng: 144.9631 }, // Melbourne CBD
    '3002': { lat: -37.8200, lng: 144.9700 }, // East Melbourne
    '3003': { lat: -37.8150, lng: 144.9400 }, // West Melbourne
    '3004': { lat: -37.8300, lng: 144.9800 }, // St Kilda Road
    '3005': { lat: -37.8100, lng: 144.9450 }, // World Trade Centre
    '3006': { lat: -37.8250, lng: 144.9650 }, // Southbank
    '3008': { lat: -37.8050, lng: 144.9350 }, // Docklands

    // Inner North
    '3010': { lat: -37.7700, lng: 144.9300 }, // Flemington
    '3011': { lat: -37.8010, lng: 144.8890 }, // Footscray
    '3012': { lat: -37.7850, lng: 144.8700 }, // Brooklyn
    '3013': { lat: -37.8150, lng: 144.8890 }, // Yarraville
    '3015': { lat: -37.8600, lng: 144.8900 }, // Newport
    '3016': { lat: -37.8450, lng: 144.8950 }, // Williamstown
    '3018': { lat: -37.7650, lng: 144.8950 }, // Aberfeldie
    '3019': { lat: -37.7950, lng: 144.8450 }, // Braybrook
    '3020': { lat: -37.7400, lng: 144.8700 }, // Albion
    '3021': { lat: -37.7400, lng: 144.8500 }, // Albanvale
    '3022': { lat: -37.7600, lng: 144.8200 }, // Ardeer
    '3023': { lat: -37.7250, lng: 144.8350 }, // Caroline Springs
    '3024': { lat: -37.7100, lng: 144.8650 }, // Wyndham Vale
    '3025': { lat: -37.8200, lng: 144.8500 }, // Altona
    '3026': { lat: -37.8350, lng: 144.8400 }, // Laverton
    '3027': { lat: -37.8100, lng: 144.8250 }, // Williams Landing
    '3028': { lat: -37.8710, lng: 144.8120 }, // Altona Meadows
    '3029': { lat: -37.8600, lng: 144.7800 }, // Hoppers Crossing
    '3030': { lat: -37.8950, lng: 144.7700 }, // Werribee

    // Inner East
    '3031': { lat: -37.8000, lng: 144.9900 }, // Flemington
    '3032': { lat: -37.7900, lng: 145.0100 }, // Ascot Vale
    '3033': { lat: -37.7950, lng: 145.0250 }, // Keilor East
    '3034': { lat: -37.7600, lng: 145.0600 }, // Avondale Heights
    '3036': { lat: -37.7350, lng: 144.9150 }, // Maribyrnong
    '3037': { lat: -37.7200, lng: 144.9400 }, // Glenroy
    '3038': { lat: -37.7050, lng: 144.9150 }, // Keilor Downs
    '3039': { lat: -37.7200, lng: 144.9600 }, // Moonee Ponds
    '3040': { lat: -37.7350, lng: 144.9700 }, // Aberfeldie
    '3041': { lat: -37.7450, lng: 144.9850 }, // Essendon
    '3042': { lat: -37.7550, lng: 145.0050 }, // Airport West
    '3043': { lat: -37.7300, lng: 145.0300 }, // Gladstone Park
    '3044': { lat: -37.7100, lng: 145.0450 }, // Jacana
    '3045': { lat: -37.7050, lng: 145.0200 }, // Broadmeadows
    '3046': { lat: -37.6900, lng: 145.0350 }, // Campbellfield
    '3047': { lat: -37.6800, lng: 145.0100 }, // Broadmeadows North
    '3048': { lat: -37.7250, lng: 145.0850 }, // Coolaroo
    '3049': { lat: -37.6650, lng: 145.0550 }, // Mickleham
    '3050': { lat: -37.7650, lng: 145.0150 }, // Royal Melbourne Hospital

    // Carlton, Fitzroy, Collingwood area
    '3051': { lat: -37.8000, lng: 144.9700 }, // North Melbourne
    '3052': { lat: -37.7950, lng: 144.9850 }, // Parkville
    '3053': { lat: -37.8050, lng: 144.9720 }, // Carlton
    '3054': { lat: -37.7920, lng: 144.9670 }, // Carlton North
    '3055': { lat: -37.7750, lng: 144.9800 }, // Brunswick South
    '3056': { lat: -37.7670, lng: 144.9580 }, // Brunswick West
    '3057': { lat: -37.7600, lng: 144.9750 }, // Brunswick
    '3058': { lat: -37.7430, lng: 144.9590 }, // Coburg
    '3059': { lat: -37.7200, lng: 144.9900 }, // Coburg North
    '3060': { lat: -37.7850, lng: 145.0000 }, // Fawkner
    '3061': { lat: -37.7800, lng: 145.0150 }, // Thornbury
    '3062': { lat: -37.7700, lng: 145.0300 }, // Northcote
    '3063': { lat: -37.7550, lng: 145.0200 }, // Fairfield
    '3064': { lat: -37.7400, lng: 145.0350 }, // Craigieburn
    '3065': { lat: -37.7800, lng: 145.0050 }, // Fitzroy
    '3066': { lat: -37.7750, lng: 145.0200 }, // Collingwood
    '3067': { lat: -37.7700, lng: 145.0400 }, // Abbotsford
    '3068': { lat: -37.7890, lng: 144.9780 }, // Fitzroy North
    '3070': { lat: -37.7710, lng: 144.9960 }, // Northcote
    '3071': { lat: -37.7550, lng: 145.0350 }, // Thornbury
    '3072': { lat: -37.7420, lng: 145.0020 }, // Preston
    '3073': { lat: -37.7200, lng: 145.0150 }, // Reservoir
    '3083': { lat: -37.7100, lng: 145.0300 }, // Bundoora
    '3075': { lat: -37.6950, lng: 145.0500 }, // Lalor
    '3076': { lat: -37.6800, lng: 145.0450 }, // Epping
    '3074': { lat: -37.6650, lng: 145.0650 }, // Thomastown
    '3078': { lat: -37.7050, lng: 145.0750 }, // West Heidelberg
    '3079': { lat: -37.6900, lng: 145.0900 }, // Ivanhoe East
    '3080': { lat: -37.7200, lng: 145.1000 }, // Heidelberg
    '3081': { lat: -37.7400, lng: 145.1100 }, // Heidelberg Heights
    '3082': { lat: -37.7100, lng: 145.1200 }, // Banyule
    '3084': { lat: -37.6800, lng: 145.1500 }, // Viewbank

    // Inner South
    '3121': { lat: -37.8200, lng: 145.0000 }, // Richmond
    '3122': { lat: -37.8350, lng: 145.0150 }, // Hawthorn
    '3123': { lat: -37.8250, lng: 145.0350 }, // Hawthorn East
    '3124': { lat: -37.8200, lng: 145.0500 }, // Camberwell
    '3125': { lat: -37.8100, lng: 145.0650 }, // Burwood
    '3126': { lat: -37.8050, lng: 145.0800 }, // Canterbury
    '3127': { lat: -37.8000, lng: 145.0950 }, // Surrey Hills
    '3128': { lat: -37.8190, lng: 145.1170 }, // Box Hill
    '3129': { lat: -37.8100, lng: 145.1300 }, // Box Hill South
    '3130': { lat: -37.8300, lng: 145.1200 }, // Blackburn
    '3131': { lat: -37.8450, lng: 145.1100 }, // Nunawading
    '3132': { lat: -37.8150, lng: 145.1450 }, // Mitcham
    '3133': { lat: -37.8000, lng: 145.1600 }, // Vermont
    '3134': { lat: -37.8140, lng: 145.2290 }, // Ringwood
    '3135': { lat: -37.8350, lng: 145.1850 }, // Ringwood East
    '3136': { lat: -37.8200, lng: 145.2100 }, // Croydon
    '3137': { lat: -37.8050, lng: 145.2250 }, // Croydon North
    '3138': { lat: -37.7900, lng: 145.2400 }, // Mooroolbark
    '3139': { lat: -37.7750, lng: 145.2550 }, // Lilydale
    '3140': { lat: -37.7600, lng: 145.2700 }, // Chirnside Park

    // South/Southeast
    '3141': { lat: -37.8400, lng: 144.9950 }, // South Yarra
    '3142': { lat: -37.8550, lng: 144.9900 }, // Toorak
    '3143': { lat: -37.8450, lng: 145.0250 }, // Armadale
    '3144': { lat: -37.8650, lng: 145.0350 }, // Malvern
    '3145': { lat: -37.8800, lng: 145.0680 }, // Malvern East
    '3146': { lat: -37.8750, lng: 145.0550 }, // Glen Iris
    '3147': { lat: -37.8550, lng: 145.0700 }, // Ashburton
    '3148': { lat: -37.8850, lng: 145.0850 }, // Chadstone
    '3149': { lat: -37.8650, lng: 145.1000 }, // Mount Waverley
    '3150': { lat: -37.8760, lng: 145.1610 }, // Glen Waverley
    '3151': { lat: -37.8900, lng: 145.1400 }, // Burwood East
    '3152': { lat: -37.9050, lng: 145.1250 }, // Wantirna South
    '3153': { lat: -37.9200, lng: 145.1100 }, // Bayswater
    '3154': { lat: -37.9350, lng: 145.0950 }, // Boronia
    '3155': { lat: -37.9200, lng: 145.1800 }, // Ferntree Gully
    '3156': { lat: -37.9050, lng: 145.2000 }, // Rowville
    '3158': { lat: -37.9100, lng: 145.2300 }, // Knoxfield
    '3159': { lat: -37.8950, lng: 145.2450 }, // Wantirna
    '3160': { lat: -37.8800, lng: 145.2200 }, // Belgrave Heights

    // Bayside/South
    '3161': { lat: -37.8760, lng: 145.0330 }, // Caulfield North
    '3162': { lat: -37.8950, lng: 145.0270 }, // Caulfield South
    '3163': { lat: -37.8900, lng: 145.0650 }, // Carnegie
    '3164': { lat: -37.9050, lng: 145.0450 }, // Caulfield East
    '3165': { lat: -37.9180, lng: 145.0580 }, // Bentleigh East
    '3166': { lat: -37.8900, lng: 145.0450 }, // Malvern East
    '3167': { lat: -37.9300, lng: 145.0700 }, // Glen Huntly
    '3168': { lat: -37.9250, lng: 145.1170 }, // Clayton
    '3169': { lat: -37.9420, lng: 145.1050 }, // Clayton South
    '3170': { lat: -37.9310, lng: 145.1350 }, // Mulgrave
    '3171': { lat: -37.9500, lng: 145.1470 }, // Springvale
    '3172': { lat: -37.9650, lng: 145.1200 }, // Clarinda
    '3173': { lat: -37.9750, lng: 145.1740 }, // Keysborough
    '3174': { lat: -37.9680, lng: 145.1770 }, // Noble Park
    '3175': { lat: -37.9870, lng: 145.2170 }, // Dandenong
    '3176': { lat: -37.9750, lng: 145.2350 }, // Dandenong North
    '3177': { lat: -37.9900, lng: 145.2500 }, // Dandenong South
    '3178': { lat: -38.0200, lng: 145.2700 }, // Rowville
    '3179': { lat: -38.0350, lng: 145.2300 }, // Knoxfield
    '3180': { lat: -38.0500, lng: 145.1900 }, // Ferntree Gully

    // St Kilda/Brighton area  
    '3181': { lat: -37.8600, lng: 144.9700 }, // Prahran
    '3182': { lat: -37.8700, lng: 144.9800 }, // St Kilda
    '3183': { lat: -37.8700, lng: 145.0000 }, // St Kilda East
    '3184': { lat: -37.8800, lng: 144.9900 }, // Elwood
    '3185': { lat: -37.8840, lng: 145.0120 }, // Elsternwick
    '3186': { lat: -37.9120, lng: 145.0010 }, // Brighton
    '3187': { lat: -37.9100, lng: 145.0100 }, // Brighton East
    '3188': { lat: -37.9380, lng: 145.0110 }, // Hampton
    '3189': { lat: -37.9380, lng: 145.0420 }, // Moorabbin
    '3190': { lat: -37.9500, lng: 145.0200 }, // Highett
    '3191': { lat: -37.9470, lng: 144.9630 }, // Sandringham
    '3192': { lat: -37.9650, lng: 144.9800 }, // Cheltenham
    '3193': { lat: -37.9750, lng: 144.9950 }, // Mentone
    '3194': { lat: -37.9850, lng: 145.0100 }, // Parkdale
    '3195': { lat: -38.0000, lng: 145.0300 }, // Mordialloc
    '3196': { lat: -38.0150, lng: 145.0450 }, // Aspendale
    '3197': { lat: -38.0300, lng: 145.0600 }, // Carrum
    '3198': { lat: -38.0450, lng: 145.0750 }, // Seaford
    '3199': { lat: -38.0600, lng: 145.0900 }, // Frankston

    // Southeast suburbs
    '3200': { lat: -38.1000, lng: 145.1200 }, // Frankston South
    '3201': { lat: -38.0800, lng: 145.1400 }, // Carrum Downs
    '3202': { lat: -38.0650, lng: 145.1600 }, // Skye
    '3204': { lat: -37.9150, lng: 145.0380 }, // Bentleigh
    '3205': { lat: -37.9700, lng: 145.0900 }, // Dingley Village
    '3206': { lat: -37.9850, lng: 145.1050 }, // Heatherton
    '3207': { lat: -38.0000, lng: 145.1200 }, // Braeside
    '3208': { lat: -38.0200, lng: 145.1350 }, // Waterways
    '3802': { lat: -37.9670, lng: 145.2520 }, // Endeavour Hills  
    '3805': { lat: -38.0420, lng: 145.3050 }, // Narre Warren South
    '3806': { lat: -38.0350, lng: 145.3350 }, // Berwick
    '3777': { lat: -37.6650, lng: 145.5350 }, // Healesville
    '3782': { lat: -37.9350, lng: 145.4550 }, // Emerald
    '3936': { lat: -38.3550, lng: 145.0150 }, // Arthurs Seat / Safety Beach
    '3939': { lat: -38.3650, lng: 144.9150 }, // Rosebud / Fingal
    '3977': { lat: -38.1250, lng: 145.2850 }, // Cranbourne
  };
  
  return postcodeMap[postcode] || null;
}

// Get age tag display info
export function getAgeTagInfo(tag: AgeTag): { label: string; emoji: string; color: string } {
  const tagMap = {
    'toddler': { label: 'Little Ones', emoji: '👶', color: 'bg-pink-100 text-pink-800' },
    'kinder': { label: 'Preschool', emoji: '🧒', color: 'bg-blue-100 text-blue-800' },
    'primary': { label: 'School Age', emoji: '🧑‍🎓', color: 'bg-green-100 text-green-800' },
    'older': { label: 'All Ages', emoji: '👦', color: 'bg-purple-100 text-purple-800' }
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
    'cafe_nearby': { label: 'Cafe Nearby', emoji: '☕' },
    'footy_oval': { label: 'Football Oval', emoji: '🏈' },
    'dog_park': { label: 'Dog Park', emoji: '🐕' },
    'basketball': { label: 'Basketball Court', emoji: '🏀' },
    'skate_park': { label: 'Skate Park', emoji: '🛹' },
    'bike_path': { label: 'Bike Path', emoji: '🚴' }
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

// Generate a deterministic colour from venue name
export function getVenueColor(name: string): string {
  const colors = ['#52b788', '#2d6a4f', '#40916c', '#74c69d', '#95d5b2', '#b7e4c7',
                   '#3a86ff', '#8338ec', '#ff006e', '#fb5607', '#ffbe0b', '#06d6a0'];
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

// Get playground image data for rendering colored placeholders
export function getPlaygroundImageData(playground: Playground): { color: string; letter: string; icon: string } {
  const color = getVenueColor(playground.name);
  const letter = playground.name.charAt(0).toUpperCase();
  
  // Determine icon based on venue type
  let icon = '🌳'; // Default park icon
  
  // Check if it's an indoor venue based on facilities or name
  const isIndoor = playground.facilities?.includes('indoor' as any) || 
                   playground.name.toLowerCase().includes('indoor') ||
                   playground.name.toLowerCase().includes('centre') ||
                   playground.name.toLowerCase().includes('center');
  
  if (isIndoor) {
    icon = '🏠';
  }
  
  return { color, letter, icon };
}

// Legacy function for backward compatibility - returns placeholder data instead of URL
export function getPlaygroundImage(playground: Playground): string {
  const { color } = getPlaygroundImageData(playground);
  // Return a data structure that can be used to render a colored div instead of img
  return `placeholder:${color}:${playground.name}`;
}