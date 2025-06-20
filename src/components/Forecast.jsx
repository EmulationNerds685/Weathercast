import React from 'react';

const Forecast = ({ forecast }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
    <div className="space-y-4">
  {forecast.map((day, index) => (
  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="font-medium">{day.day}</span>
    <span className="text-2xl">{day.icon}</span>
    <span className="font-bold">{day.temp}°</span>
  </div>
))}

    </div>
  </div>
);

export default Forecast;
