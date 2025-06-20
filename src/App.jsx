import { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Additional from './components/Additional';
import Loader from './components/Loader';
import getWeatherIcon from './utils/getWeatherIcon';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (loc, lat = null, lon = null) => {
    setLoading(true);
    setError(null);

    try {
      let currentResponse;

      if (lat && lon) {
        currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );
      } else {
        currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${unit}&appid=${API_KEY}`
        );
      }

      if (!currentResponse.ok) {
        throw new Error('Location not found');
      }

      const currentData = await currentResponse.json();

      // Get full 5-day forecast (40 intervals of 3 hours each)
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${currentData.name}&units=${unit}&appid=${API_KEY}`
      );

      const forecastData = await forecastResponse.json();

      // Group forecast entries by date (1 per day)
      const forecastMap = new Map();
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'numeric',
          day: 'numeric'
        });
        if (!forecastMap.has(date)) {
          forecastMap.set(date, {
            day: date.split(',')[0],
            temp: Math.round(item.main.temp),
            icon: getWeatherIcon(item.weather[0].id)
          });
        }
      });

      const transformedData = {
        location: currentData.name,
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        high: Math.round(currentData.main.temp_max),
        low: Math.round(currentData.main.temp_min),
        humidity: currentData.main.humidity,
        wind: Math.round(currentData.wind.speed),
        icon: getWeatherIcon(currentData.weather[0].id),
        forecast: Array.from(forecastMap.values()).slice(0, 5),
        visibility: currentData.visibility
      };

      setWeatherData(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  const toggleUnit = () => {
    const newUnit = unit === 'imperial' ? 'metric' : 'imperial';
    setUnit(newUnit);
    if (weatherData) {
      fetchWeather(location);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather('', latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeather('Ballia');
        }
      );
    } else {
      fetchWeather('Ballia');
    }
  }, [unit]);

  return (
    <div className="min-h-screen bg-primary text-gray-800">
      <Header
        location={location}
        setLocation={setLocation}
        handleSearch={handleSearch}
        toggleUnit={toggleUnit}
        unit={unit}
      />

      <main className="container mx-auto py-8 px-4">
        {error ? (
          <div className="text-center py-20 text-red-500">
            <p className="text-lg">{error}</p>
            <button
              onClick={() => fetchWeather('Ballia')}
              className="mt-4 bg-accent text-primary px-4 py-2 rounded-lg"
            >
              Reset to current Location
            </button>
          </div>
        ) : loading ? (
          <Loader />
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <CurrentWeather weatherData={weatherData} unit={unit} />
            <Forecast forecast={weatherData.forecast} />
            <Additional visibility={weatherData.visibility} />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg">No weather data available</p>
          </div>
        )}
      </main>

      <footer className="bg-accent text-primary py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>Powered by OpenWeatherMap</p>
          <p>© {new Date().getFullYear()} WeatherCast</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a
              href="https://openweathermap.org/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
