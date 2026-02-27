export type VenueType = 'free_playground' | 'indoor_play' | 'trampoline_park' | 'adventure_park' | 'water_park' | 'animal_farm';

export interface Playground {
  id: string;
  name: string;
  slug: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  ageTags: AgeTag[];
  shadeLevel: ShadeLevel;
  shadeNotes: string;
  hasCoveredStructure: boolean;
  hasMetalEquipment: boolean;
  facilities: Facility[];
  equipment: Equipment[];
  surface: SurfaceType;
  nearbyFacilities?: string[];
  bestTimes: {
    summer: string;
    winter: string;
  };
  // Phase 2: Venue fields
  venueType?: VenueType;
  isPaid?: boolean;
  priceRange?: string; // "$", "$$", "$$$"
  entryPrice?: string; // "From $15/child"
  openingHours?: {
    weekday: string; // "9am - 5pm"
    weekend: string; // "9am - 6pm"
  };
  website?: string;
  phone?: string;
  isIndoor?: boolean;
  hasParking?: boolean;
  hasCafe?: boolean; // different from cafe_nearby in facilities
  ageRange?: string; // "0-12" or "All ages"
}

export type AgeTag = 'toddler' | 'kinder' | 'primary' | 'older';

export type ShadeLevel = 'minimal' | 'partial' | 'full';

export type Facility = 
  | 'fenced' 
  | 'toilets' 
  | 'parking' 
  | 'water_fountain' 
  | 'bbq' 
  | 'picnic_tables'
  | 'oval'
  | 'tennis_courts'
  | 'beach_nearby'
  | 'cafe_nearby'
  | 'footy_oval'
  | 'dog_park'
  | 'basketball'
  | 'skate_park'
  | 'bike_path';

export type Equipment = 
  | 'baby_swing'
  | 'toddler_swing' 
  | 'swing'
  | 'slide'
  | 'toddler_slide'
  | 'climbing'
  | 'sandpit'
  | 'monkey_bars'
  | 'see_saw'
  | 'spinning_cup'
  | 'balance_beam'
  | 'flying_fox'
  | 'spinning_equipment'
  | 'balance_equipment'
  | 'sensory_play';

export type SurfaceType = 'rubber' | 'mulch' | 'sand' | 'grass';

export interface WeatherData {
  temperature: number;
  weathercode: number;
  windSpeed: number;
  uvIndex: number;
}

export type TimeBlock = 'morning' | 'afternoon' | 'evening';

export interface TimeBlockForecast {
  timeBlock: TimeBlock;
  label: string; // "Morning (6am-12pm)"
  temperature: number;
  uvIndex: number;
  weathercode: number;
  windSpeed: number;
  feelsLike: number; // wind chill adjusted
}

export interface WeatherWithForecast extends WeatherData {
  feelsLike: number; // wind chill for current conditions
  timeBlocks: TimeBlockForecast[];
}

export interface GoNowScore {
  score: number;
  status: 'go' | 'caution' | 'avoid';
  message: string; // contextual, not generic
  tips: string[];
  bestTimeBlock?: TimeBlock; // "try afternoon instead"
  bestTimeBlockScore?: number;
}

export interface PlaygroundWithScore extends Playground {
  distance?: number;
  goNowScore?: GoNowScore;
}