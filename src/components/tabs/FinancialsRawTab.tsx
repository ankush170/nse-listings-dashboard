// FinancialsRawTab.tsx
import React, { useState } from 'react';
import { FinancialMetric } from '../../types';

interface FinancialsRawTabProps {
  financials: FinancialMetric[];
}
export function FinancialsRawTab({ financials }: FinancialsRawTabProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMetric, setSelectedMetric] = useState<FinancialMetric | null>(null);
  
    const filteredFinancials = financials.filter((metric) =>
      metric.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search Expression"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
        />
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse border border-purple-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="border border-purple-200 p-2 text-purple-800">Metric Name</th>
                <th className="border border-purple-200 p-2 text-purple-800">FY18-19</th>
                <th className="border border-purple-200 p-2 text-purple-800">FY19-20</th>
                <th className="border border-purple-200 p-2 text-purple-800">FY20-21</th>
                <th className="border border-purple-200 p-2 text-purple-800">FY21-22</th>
                <th className="border border-purple-200 p-2 text-purple-800">FY22-23</th>
              </tr>
            </thead>
            <tbody>
              {filteredFinancials.map((metric) => (
                <tr
                  key={metric.id}
                  className="hover:bg-purple-50 cursor-pointer"
                  onClick={() => setSelectedMetric(metric)}
                >
                  <td className="border border-purple-200 p-2 text-purple-800">{metric.name}</td>
                  {Object.values(metric.values).map((value, index) => (
                    <td key={index} className="border border-purple-200 p-2 text-purple-800">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedMetric && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-2xl">
              <h3 className="font-bold mb-2 text-purple-800">{selectedMetric.name} - AI Insights</h3>
              <p className="text-purple-800">{selectedMetric.aiInsights}</p>
              <button
                onClick={() => setSelectedMetric(null)}
                className="mt-4 bg-[#8117DE] text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }