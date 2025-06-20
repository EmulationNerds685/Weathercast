import React from 'react';

const Loader = () => (
  <div className="text-center py-20">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    <p className="mt-4 text-lg">Loading weather data...</p>
  </div>
);

export default Loader;
