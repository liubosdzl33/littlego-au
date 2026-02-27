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
  bestTimes: {
    summer: string;
    winter: string;
  };
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
  | 'cafe_nearby';

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