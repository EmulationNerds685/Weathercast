import React from 'react';

const Header = ({ location, setLocation, handleSearch, toggleUnit, unit }) => (
  <header className="bg-accent text-primary py-4 px-6 shadow-md">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">WeatherCast</h1>
      <form onSubmit={handleSearch} className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <input
            type="text"
            placeholder="Search location..."
            className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            🔍
          </button>
        </div>
        <button 
          type="button"
          onClick={toggleUnit}
          className="bg-white text-accent px-3 py-1 rounded-full font-bold"
        >
          °{unit === 'imperial' ? 'F' : 'C'}
        </button>
      </form>
    </div>
  </header>
);

export default Header;
