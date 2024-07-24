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
    factor1: true,
    factor2: true,
    factor3: false,
  });
  const [showFactors, setShowFactors] = useState(false);

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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                {Object.entries(factors).map(([key, value]) => (
                  <label key={key} className="block px-4 py-2 hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setFactors({ ...factors, [key]: !value })}
                      className="form-checkbox h-5 w-5 text-[#8117DE] mr-2"
                    />
                    <span className="text-gray-700">{key}</span>
                  </label>
                ))}
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