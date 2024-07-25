'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RiskScore {
  date: Date;
  score: number;
  factors: {
    factor1: number;
    factor2: number;
    factor3: number;
  };
}

const data = [
  { name: 'Jan', score: 4000 },
  { name: 'Feb', score: 3000 },
  { name: 'Mar', score: 2000 },
  { name: 'Apr', score: 2780 },
  { name: 'May', score: 1890 },
  { name: 'Jun', score: 2390 },
];

export function Graph() {
  const [factors, setFactors] = useState({
    factor1: { selected: true, weight: 50 },
    factor2: { selected: true, weight: 50 },
    factor3: { selected: false, weight: 50 },
  });
  const [showFactors, setShowFactors] = useState(false);

  const handleFactorChange = (key: string, field: 'selected' | 'weight', value: boolean | number) => {
    setFactors(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof typeof prev], [field]: value }
    }));
  };

  const saveFactors = () => {
    console.log('Saving factors:', factors);
    setShowFactors(false);
  };

  return (
    <div className="bg-white p-6 shadow-md w-full relative z-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#8117DE]">Overall Weighted Risk Score Graph</h2>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            AI Insights
          </button>
          <div className="relative inline-block">
            <button 
              onClick={() => setShowFactors(!showFactors)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Adjust factors
            </button>
            {showFactors && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4">
                {Object.entries(factors).map(([key, { selected, weight }]) => (
                  <div key={key} className="mb-4">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700 mr-2">{key}</span>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) => handleFactorChange(key, 'selected', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-[#8117DE]"
                      />
                    </label>
                    {selected && (
                      <div className="mt-2 flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={weight}
                          onChange={(e) => handleFactorChange(key, 'weight', parseInt(e.target.value))}
                          className="w-full mr-2"
                        />
                        <span className="text-sm text-gray-600">{weight}</span>
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  onClick={saveFactors}
                  className="w-full px-4 py-2 bg-[#8117DE] text-white rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8117DE" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}