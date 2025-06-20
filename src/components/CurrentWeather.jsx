import React from 'react';

const CurrentWeather = ({ weatherData, unit }) => (
  <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h2 className="text-3xl font-bold">{weatherData.location}</h2>
        <p className="text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      <span className="text-6xl self-center sm:self-auto">{weatherData.icon}</span>
    </div>

    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
      <div>
        <span className="text-7xl font-bold">{weatherData.temperature}°</span>
        <span className="text-2xl ml-2">{weatherData.condition}</span>
      </div>
      <div className="text-left sm:text-right">
        <p>H: {weatherData.high}° L: {weatherData.low}°</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind: {weatherData.wind} {unit === 'imperial' ? 'mph' : 'm/s'}</p>
      </div>
    </div>
  </div>
);

export default CurrentWeather;
