import React from 'react';

const Additional = ({ visibility }) => (
  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-accent text-primary rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2">UV Index</h3>
      <p className="text-3xl font-bold">N/A</p>
      <p className="mt-2">(Available in One Call API)</p>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2">Sunrise & Sunset</h3>
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-gray-500">Sunrise</p>
          <p className="font-bold">N/A</p>
        </div>
        <div>
          <p className="text-gray-500">Sunset</p>
          <p className="font-bold">N/A</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2">Visibility</h3>
      <p className="text-3xl font-bold">
        {visibility ? `${visibility / 1000} km` : 'N/A'}
      </p>
    </div>
  </div>
);

export default Additional;
