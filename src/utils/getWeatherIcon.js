const getWeatherIcon = (weatherCode) => {
  if (weatherCode >= 200 && weatherCode < 300) return '⛈️';
  if (weatherCode >= 300 && weatherCode < 500) return '🌧️';
  if (weatherCode >= 500 && weatherCode < 600) return '🌧️';
  if (weatherCode >= 600 && weatherCode < 700) return '❄️';
  if (weatherCode >= 700 && weatherCode < 800) return '🌫️';
  if (weatherCode === 800) return '☀️';
  if (weatherCode > 800) return '☁️';
  return '🌈';
};

export default getWeatherIcon;
