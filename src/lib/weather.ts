import { WeatherData, WeatherWithForecast, Playground, GoNowScore, TimeBlock, TimeBlockForecast } from '@/types/playground';

// ============================================
// WIND CHILL CALCULATION
// ============================================

/**
 * Australian apparent temperature (wind chill / feels like)
 * Uses the standard formula for wind chill when temp < 10°C and wind > 5 km/h
 * For warmer temps, combines heat + wind for "feels like"
 */
function calculateFeelsLike(tempC: number, windKmh: number): number {
  if (tempC <= 10 && windKmh > 4.8) {
    // Wind chill formula (Environment Canada / BOM style)
    const feelsLike = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
    return Math.round(feelsLike * 10) / 10;
  } else if (tempC >= 27) {
    // Heat index approximation — wind provides relief
    const relief = Math.min(windKmh * 0.1, 3); // wind cools you down in heat
    return Math.round((tempC - relief) * 10) / 10;
  }
  return tempC;
}

// ============================================
// TIME BLOCK HELPERS
// ============================================

function getCurrentTimeBlock(): TimeBlock {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
}

function getTimeBlockLabel(block: TimeBlock): string {
  switch (block) {
    case 'morning': return 'Morning (6am–12pm)';
    case 'afternoon': return 'Afternoon (12pm–5pm)';
    case 'evening': return 'Evening (5pm–8pm)';
  }
}

function getTimeBlockHours(block: TimeBlock): number[] {
  switch (block) {
    case 'morning': return [6, 7, 8, 9, 10, 11];
    case 'afternoon': return [12, 13, 14, 15, 16];
    case 'evening': return [17, 18, 19];
  }
}

// ============================================
// WEATHER DATA FETCHING
// ============================================

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
    return { temperature: 20, weathercode: 0, windSpeed: 10, uvIndex: 5 };
  }
}

/**
 * Fetch current weather + hourly forecast for time block recommendations
 */
export async function fetchWeatherWithForecast(lat: number, lng: number): Promise<WeatherWithForecast> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weathercode,wind_speed_10m,uv_index&hourly=temperature_2m,weathercode,wind_speed_10m,uv_index&timezone=Australia/Melbourne&forecast_days=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const current: WeatherData = {
      temperature: data.current.temperature_2m,
      weathercode: data.current.weathercode,
      windSpeed: data.current.wind_speed_10m,
      uvIndex: data.current.uv_index
    };

    const feelsLike = calculateFeelsLike(current.temperature, current.windSpeed);

    // Build time block forecasts from hourly data
    const timeBlocks: TimeBlockForecast[] = (['morning', 'afternoon', 'evening'] as TimeBlock[]).map(block => {
      const hours = getTimeBlockHours(block);
      const hourlyTemps: number[] = [];
      const hourlyUV: number[] = [];
      const hourlyWind: number[] = [];
      const hourlyCodes: number[] = [];

      hours.forEach(h => {
        if (data.hourly?.temperature_2m?.[h] !== undefined) {
          hourlyTemps.push(data.hourly.temperature_2m[h]);
          hourlyUV.push(data.hourly.uv_index?.[h] ?? 0);
          hourlyWind.push(data.hourly.wind_speed_10m?.[h] ?? 0);
          hourlyCodes.push(data.hourly.weathercode?.[h] ?? 0);
        }
      });

      const avgTemp = hourlyTemps.length > 0 ? hourlyTemps.reduce((a, b) => a + b, 0) / hourlyTemps.length : current.temperature;
      const maxUV = hourlyUV.length > 0 ? Math.max(...hourlyUV) : current.uvIndex;
      const avgWind = hourlyWind.length > 0 ? hourlyWind.reduce((a, b) => a + b, 0) / hourlyWind.length : current.windSpeed;
      const worstWeather = hourlyCodes.length > 0 ? Math.max(...hourlyCodes) : current.weathercode;

      return {
        timeBlock: block,
        label: getTimeBlockLabel(block),
        temperature: Math.round(avgTemp * 10) / 10,
        uvIndex: Math.round(maxUV * 10) / 10,
        weathercode: worstWeather,
        windSpeed: Math.round(avgWind * 10) / 10,
        feelsLike: calculateFeelsLike(avgTemp, avgWind)
      };
    });

    return { ...current, feelsLike, timeBlocks };
  } catch (error) {
    console.error('Failed to fetch weather forecast:', error);
    const fallback: WeatherData = { temperature: 20, weathercode: 0, windSpeed: 10, uvIndex: 5 };
    return {
      ...fallback,
      feelsLike: 20,
      timeBlocks: []
    };
  }
}

// ============================================
// GO NOW SCORE CALCULATION (Enhanced)
// ============================================

export function calculateGoNowScore(playground: Playground, weather: WeatherData | WeatherWithForecast): GoNowScore {
  let score = 10;
  const tips: string[] = [];
  const { uvIndex, temperature, windSpeed, weathercode } = weather;
  const { shadeLevel, hasMetalEquipment, hasCoveredStructure } = playground;

  // Wind chill / feels like
  const feelsLike = 'feelsLike' in weather ? weather.feelsLike : calculateFeelsLike(temperature, windSpeed);

  // ========== UV + SHADE ==========
  if (uvIndex >= 11) {
    if (shadeLevel === 'minimal') { score -= 10; tips.push('⚠️ Extreme UV with no shade — avoid completely'); }
    else if (shadeLevel === 'partial') { score -= 8; tips.push('☂️ Extreme UV — not enough shade, try a fully covered playground'); }
    else { score -= 4; tips.push('🌳 Extreme UV but shaded — limit to 30 minutes, hat + sunscreen essential'); }
  } else if (uvIndex >= 8) {
    if (shadeLevel === 'minimal') { score -= 8; tips.push('🧴 Very high UV and no shade — sunburn risk for little ones'); }
    else if (shadeLevel === 'partial') { score -= 5; tips.push('🧢 High UV with some shade — hat, sunscreen, and stay in shaded areas'); }
    else { score -= 2; tips.push('😎 High UV but good shade here — still bring a hat'); }
  } else if (uvIndex >= 6) {
    if (shadeLevel === 'minimal') { score -= 6; tips.push('☀️ Moderate UV with no shade — slip slop slap!'); }
    else if (shadeLevel === 'partial') { score -= 2; tips.push('👕 Some shade — light sun protection advised'); }
  } else if (uvIndex >= 3 && shadeLevel === 'minimal') {
    score -= 2; tips.push('🌤️ Mild UV — a hat is still a good idea');
  }

  // ========== TEMPERATURE ==========
  if (temperature >= 38) {
    score -= 6; tips.push('🔥 Extreme heat — too hot for little kids');
    if (hasMetalEquipment) tips.push('⚠️ Metal slides will burn — do NOT let kids touch without testing first');
  } else if (temperature >= 35) {
    score -= 4; tips.push('🌡️ Very hot — bring lots of water, take shade breaks every 15 min');
    if (hasMetalEquipment) tips.push('🔥 Touch-test metal equipment before kids use it');
  } else if (temperature >= 32) {
    score -= 2; tips.push('💧 Hot day — pack water bottles and take breaks');
  }

  // ========== WIND CHILL (Enhanced) ==========
  // Cold + windy = miserable for kids at exposed playgrounds
  if (temperature <= 15 && windSpeed >= 30) {
    // Cold and very windy
    if (shadeLevel === 'minimal' || !hasCoveredStructure) {
      score -= 5;
      tips.push(`🥶 Feels like ${Math.round(feelsLike)}°C with wind chill — too cold and windy with no shelter`);
    } else {
      score -= 2;
      tips.push(`🌬️ Feels like ${Math.round(feelsLike)}°C but sheltered areas available`);
    }
  } else if (temperature <= 15 && windSpeed >= 20) {
    if (shadeLevel === 'minimal') {
      score -= 3;
      tips.push(`🧣 Feels like ${Math.round(feelsLike)}°C — exposed and windy, rug up warm`);
    } else {
      score -= 1;
      tips.push(`🧥 Breezy and cool (feels like ${Math.round(feelsLike)}°C) — bring layers`);
    }
  } else if (temperature <= 10 && windSpeed >= 10) {
    score -= 2;
    tips.push(`🥶 Cold and breezy — feels like ${Math.round(feelsLike)}°C, dress warmly`);
  } else if (temperature <= 5) {
    score -= 3; tips.push('🧊 Very cold — short visit only, warm clothes essential');
  } else if (temperature <= 10) {
    score -= 1; tips.push('🧥 Chilly — bring jackets for the kids');
  }

  // Overcast + cold + windy + no sun = not fun
  if (temperature <= 15 && windSpeed >= 15 && weathercode >= 3 && shadeLevel === 'minimal') {
    score -= 1;
    tips.push('☁️ Grey, cold and windy with no shelter — not the most fun day out');
  }

  // ========== WIND (General Safety) ==========
  if (windSpeed >= 50) {
    score -= 6; tips.push('💨 Dangerous wind gusts — unsafe for climbing equipment and swings');
  } else if (windSpeed >= 40) {
    score -= 4; tips.push('🌬️ Very windy — flying fox and high equipment not safe');
  } else if (windSpeed >= 30 && temperature >= 20) {
    // Wind on a warm day is actually nice
    tips.push('🍃 Breezy but warm — actually quite pleasant!');
  }

  // ========== RAIN ==========
  const isHeavyRain = weathercode >= 95 || weathercode >= 81;
  const isRaining = weathercode >= 80 || (weathercode >= 61 && weathercode <= 67);

  if (isHeavyRain) {
    if (!hasCoveredStructure) { score -= 8; tips.push('☔ Heavy rain with no cover — save it for another day'); }
    else { score -= 3; tips.push('🏠 Heavy rain but covered play area available — bring towels!'); }
  } else if (isRaining) {
    if (!hasCoveredStructure) { score -= 3; tips.push('🌧️ Light rain — equipment will be wet and slippery'); }
    else { tips.push('☔ Light rain but covered area keeps you dry!'); }
  }

  // ========== HOT EQUIPMENT WARNING ==========
  if (temperature >= 30 && uvIndex >= 6 && shadeLevel === 'minimal' && hasMetalEquipment) {
    tips.push('⚠️ Metal slides and surfaces in direct sun — likely too hot to touch safely');
  }

  // ========== CONTEXTUAL MESSAGE (not generic!) ==========
  score = Math.max(0, Math.min(10, score));

  let status: 'go' | 'caution' | 'avoid';
  let message: string;

  const currentBlock = getCurrentTimeBlock();

  if (score >= 8) {
    status = 'go';
    // Contextual positive messages
    if (temperature >= 20 && temperature <= 28 && uvIndex <= 5 && windSpeed < 20) {
      message = '🎉 Perfect playground weather! Get out there!';
    } else if (temperature >= 28 && shadeLevel === 'full') {
      message = '☀️ Hot but this park has great shade — nice choice!';
    } else if (currentBlock === 'morning' && uvIndex <= 3) {
      message = '🌅 Beautiful morning for the playground — low UV, go enjoy!';
    } else if (currentBlock === 'evening') {
      message = '🌆 Lovely evening for a park visit — UV is low, temps are cooling';
    } else {
      message = '✅ Great conditions right now — have fun!';
    }
  } else if (score >= 5) {
    status = 'caution';
    if (temperature >= 32) {
      message = `🌡️ It's ${Math.round(temperature)}°C — playable but keep it short and hydrate`;
    } else if (uvIndex >= 6 && shadeLevel === 'partial') {
      message = '🧢 UV is up but there\'s some shade — stick to covered areas';
    } else if (feelsLike <= 8) {
      message = `🌬️ Feels like ${Math.round(feelsLike)}°C with wind — bundle up if you go`;
    } else if (isRaining) {
      message = '🌧️ A bit wet — bring spare clothes and watch for slippery equipment';
    } else {
      message = '⚠️ Okay with precautions — check the tips below';
    }
  } else {
    status = 'avoid';
    if (temperature >= 38) {
      message = `🔥 ${Math.round(temperature)}°C is too hot for the playground — try again this evening`;
    } else if (uvIndex >= 8 && shadeLevel === 'minimal') {
      message = `☀️ UV index ${Math.round(uvIndex)} with no shade — find a shaded park or wait until after 4pm`;
    } else if (feelsLike <= 3) {
      message = `🥶 Feels like ${Math.round(feelsLike)}°C — too cold and windy for little ones`;
    } else if (isHeavyRain && !hasCoveredStructure) {
      message = '☔ Heavy rain and nowhere to shelter — definitely an indoor play day';
    } else if (windSpeed >= 40 && temperature <= 15) {
      message = '💨 Cold and dangerously windy — not safe or fun today';
    } else {
      message = '🚫 Not great conditions right now — check the time blocks below for a better window';
    }
  }

  // ========== BEST TIME BLOCK SUGGESTION ==========
  let bestTimeBlock: TimeBlock | undefined;
  let bestTimeBlockScore: number | undefined;

  if ('timeBlocks' in weather && weather.timeBlocks.length > 0) {
    const blockScores = weather.timeBlocks.map(block => {
      const blockWeather: WeatherData = {
        temperature: block.temperature,
        uvIndex: block.uvIndex,
        weathercode: block.weathercode,
        windSpeed: block.windSpeed
      };
      const blockResult = calculateGoNowScoreSimple(playground, blockWeather);
      return { block: block.timeBlock, score: blockResult, label: block.label, feelsLike: block.feelsLike };
    });

    // Find the best time block that's not the current one
    const futureBlocks = blockScores.filter(b => {
      if (currentBlock === 'morning') return b.block === 'afternoon' || b.block === 'evening';
      if (currentBlock === 'afternoon') return b.block === 'evening';
      return false;
    });

    const bestFuture = futureBlocks.sort((a, b) => b.score - a.score)[0];
    if (bestFuture && bestFuture.score > score + 1) {
      bestTimeBlock = bestFuture.block;
      bestTimeBlockScore = bestFuture.score;

      if (status === 'avoid' || status === 'caution') {
        tips.push(`💡 Better later: ${bestFuture.label} looks like a ${bestFuture.score}/10 — try then!`);
      }
    }
  }

  return { score, status, message, tips, bestTimeBlock, bestTimeBlockScore };
}

/**
 * Simplified score calc for time block comparisons (no recursion)
 */
function calculateGoNowScoreSimple(playground: Playground, weather: WeatherData): number {
  let score = 10;
  const { uvIndex, temperature, windSpeed, weathercode } = weather;
  const { shadeLevel, hasCoveredStructure } = playground;
  const feelsLike = calculateFeelsLike(temperature, windSpeed);

  // UV
  if (uvIndex >= 11) { score -= shadeLevel === 'minimal' ? 10 : shadeLevel === 'partial' ? 8 : 4; }
  else if (uvIndex >= 8) { score -= shadeLevel === 'minimal' ? 8 : shadeLevel === 'partial' ? 5 : 2; }
  else if (uvIndex >= 6) { score -= shadeLevel === 'minimal' ? 6 : shadeLevel === 'partial' ? 2 : 0; }
  else if (uvIndex >= 3 && shadeLevel === 'minimal') { score -= 2; }

  // Temp
  if (temperature >= 38) score -= 6;
  else if (temperature >= 35) score -= 4;
  else if (temperature >= 32) score -= 2;

  // Wind chill on cold days
  if (temperature <= 15 && windSpeed >= 30) {
    score -= shadeLevel === 'minimal' ? 5 : 2;
  } else if (temperature <= 15 && windSpeed >= 20) {
    score -= shadeLevel === 'minimal' ? 3 : 1;
  } else if (temperature <= 10 && windSpeed >= 10) {
    score -= 2;
  } else if (temperature <= 5) score -= 3;
  else if (temperature <= 10) score -= 1;

  // Overcast cold windy
  if (temperature <= 15 && windSpeed >= 15 && weathercode >= 3 && shadeLevel === 'minimal') score -= 1;

  // Wind safety
  if (windSpeed >= 50) score -= 6;
  else if (windSpeed >= 40) score -= 4;

  // Rain
  const isHeavyRain = weathercode >= 95 || weathercode >= 81;
  const isRaining = weathercode >= 80 || (weathercode >= 61 && weathercode <= 67);
  if (isHeavyRain) { score -= hasCoveredStructure ? 3 : 8; }
  else if (isRaining) { score -= hasCoveredStructure ? 0 : 3; }

  return Math.max(0, Math.min(10, score));
}

// ============================================
// DISPLAY HELPERS
// ============================================

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

export function getUVLabel(uv: number): string {
  if (uv <= 2) return 'Low';
  if (uv <= 5) return 'Moderate';
  if (uv <= 7) return 'High';
  if (uv <= 10) return 'Very High';
  return 'Extreme';
}

export function getTimeBlockEmoji(block: TimeBlock): string {
  switch (block) {
    case 'morning': return '🌅';
    case 'afternoon': return '☀️';
    case 'evening': return '🌆';
  }
}
