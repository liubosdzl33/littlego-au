import { WeatherData, Playground, GoNowScore, ShadeLevel } from '@/types/playground';

export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weathercode,wind_speed_10m,uv_index&timezone=Australia/Melbourne`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      temperature: data.current.temperature_2m,
      weathercode: data.current.weathercode,
      windSpeed: data.current.wind_speed_10m,
      uvIndex: data.current.uv_index
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    // Return default values if API fails
    return {
      temperature: 20,
      weathercode: 0,
      windSpeed: 10,
      uvIndex: 5
    };
  }
}

export function calculateGoNowScore(playground: Playground, weather: WeatherData): GoNowScore {
  let score = 10; // Start perfect
  const tips: string[] = [];
  
  // UV Check
  const { uvIndex } = weather;
  const { shadeLevel, hasMetalEquipment } = playground;
  
  if (uvIndex >= 11) {
    if (shadeLevel === 'minimal') {
      score -= 10;
      tips.push('⚠️ Extreme UV with no shade - avoid completely');
    } else if (shadeLevel === 'partial') {
      score -= 8;
      tips.push('☂️ Extreme UV - stay in shaded areas only');
    } else {
      score -= 4;
      tips.push('🌳 Extreme UV but good shade available');
    }
  } else if (uvIndex >= 8) {
    if (shadeLevel === 'minimal') {
      score -= 8;
      tips.push('🧴 High UV with little shade - sunscreen essential');
    } else if (shadeLevel === 'partial') {
      score -= 5;
      tips.push('🧢 High UV - hat and sunscreen recommended');
    } else {
      score -= 2;
      tips.push('😎 High UV but good shade - bring a hat');
    }
  } else if (uvIndex >= 6) {
    if (shadeLevel === 'minimal') {
      score -= 6;
      tips.push('☀️ Moderate UV - protection needed');
    } else if (shadeLevel === 'partial') {
      score -= 2;
      tips.push('👕 Some shade available - light protection advised');
    }
    // No deduction for full shade at moderate UV
  } else if (uvIndex >= 3 && shadeLevel === 'minimal') {
    score -= 2;
    tips.push('🌤️ Light UV protection recommended');
  }
  
  // Temperature Check
  const { temperature } = weather;
  
  if (temperature >= 38) {
    score -= 6;
    tips.push('🔥 Extremely hot - equipment will burn skin!');
    if (hasMetalEquipment) {
      tips.push('⚠️ Metal equipment dangerous - test before touching');
    }
  } else if (temperature >= 35) {
    score -= 4;
    tips.push('🌡️ Very hot - bring extra water');
    if (hasMetalEquipment) {
      tips.push('🔥 Check metal equipment temperature first');
    }
  } else if (temperature >= 32) {
    score -= 2;
    tips.push('💧 Hot day - stay hydrated');
  } else if (temperature <= 5) {
    score -= 3;
    tips.push('🥶 Very cold - dress warmly');
  } else if (temperature <= 10) {
    score -= 1;
    tips.push('🧥 Chilly - bring jackets');
  }
  
  // Rain Check (based on weathercode)
  const { weathercode } = weather;
  const isRaining = weathercode >= 80 || (weathercode >= 61 && weathercode <= 67);
  const isHeavyRain = weathercode >= 95 || weathercode >= 81;
  
  if (isHeavyRain) {
    if (!playground.hasCoveredStructure) {
      score -= 8;
      tips.push('☔ Heavy rain and no cover - not suitable');
    } else {
      score -= 3;
      tips.push('🏠 Heavy rain but covered areas available');
    }
  } else if (isRaining) {
    if (!playground.hasCoveredStructure) {
      score -= 3;
      tips.push('🌧️ Light rain - may get wet');
    } else {
      tips.push('☔ Light rain but covered play available');
    }
  }
  
  // Wind Check
  const { windSpeed } = weather;
  
  if (windSpeed >= 50) {
    score -= 6;
    tips.push('💨 Dangerous winds - avoid high equipment');
  } else if (windSpeed >= 40) {
    score -= 4;
    tips.push('🌬️ Very windy - be careful on climbing equipment');
  } else if (windSpeed >= 25) {
    tips.push('🍃 Breezy conditions - good for hot days');
  }
  
  // Determine status and message
  let status: 'go' | 'caution' | 'avoid';
  let message: string;
  
  if (score >= 8) {
    status = 'go';
    message = 'Perfect conditions for playground fun!';
  } else if (score >= 5) {
    status = 'caution';
    message = 'Good for play with some precautions';
  } else {
    status = 'avoid';
    message = 'Not recommended right now';
  }
  
  // Ensure score doesn't go below 0
  score = Math.max(0, score);
  
  return {
    score,
    status,
    message,
    tips
  };
}

export function getWeatherEmoji(weathercode: number): string {
  if (weathercode === 0) return '☀️';
  if (weathercode <= 3) return '🌤️';
  if (weathercode <= 48) return '☁️';
  if (weathercode <= 67) return '🌧️';
  if (weathercode <= 82) return '☔';
  if (weathercode <= 99) return '⛈️';
  return '🌤️';
}

export function getWindDescription(windSpeed: number): string {
  if (windSpeed < 10) return 'Calm';
  if (windSpeed < 20) return 'Light breeze';
  if (windSpeed < 30) return 'Moderate breeze';
  if (windSpeed < 40) return 'Fresh breeze';
  if (windSpeed < 50) return 'Strong breeze';
  return 'Very windy';
}