// src/components/Graph.tsx
'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full relative z-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Overall Weighted Risk Score Graph</h2>
        <div className="space-x-4">
          {Object.entries(factors).map(([key, value]) => (
            <label key={key} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setFactors({ ...factors, [key]: !value })}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-100">{key}</span>
            </label>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}