'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Switch } from '@headlessui/react';

const FinancialScreener: React.FC = () => {
  const [isAnnouncementExpanded, setIsAnnouncementExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      {/* Rule Triggered Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex justify-between items-center">
          <span>Rule Triggered (2023-07-15 14:30:00)</span>
          <span>1D Price Impact: -2.5%</span>
          <span>7day price impact: -4.8%</span>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEnabled}
              onChange={setIsEnabled}
              className={`${
                isEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span className="sr-only">Enable rule</span>
              <span
                className={`${
                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <span className="font-medium">
              <span className={isEnabled ? 'font-bold' : 'font-normal'}>Yes</span>
              {' / '}
              <span className={!isEnabled ? 'font-bold' : 'font-normal'}>No</span>
            </span>
          </div>
        </div>
      </div>

      {/* Rule Details Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">%NPA (Numeric)</span>
          <span>Author: Radhalaxmi Pillai</span>
          <span># active triggers: 3 (FP/TP/FN/TN)</span>
          <span>Active since: 3 weeks</span>
        </div>
        <p className="mb-2">Description: Gross NPA / Order Book {'>'} 11%</p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span>Sources:</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded">financials.gross_npa</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded">financials.order_book</span>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded">Delete Rule</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit Rule</button>
          </div>
        </div>
      </div>

      {/* Search Expression */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Expression"
          className="text-gray-800 w-full p-2 border rounded-lg"
        />
      </div>

      {/* Metric Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Metric Name</th>
              <th className="border p-2">FY18-19</th>
              <th className="border p-2">FY19-20</th>
              <th className="border p-2">FY20-21</th>
              <th className="border p-2">FY21-22</th>
              <th className="border p-2">FY22-23</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Gross NPA Ratio</td>
              <td className="border p-2">8.5%</td>
              <td className="border p-2">9.2%</td>
              <td className="border p-2">10.1%</td>
              <td className="border p-2">11.3%</td>
              <td className="border p-2">12.7%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-6 p-4 border rounded-lg">
        <p>The company&apos;s Gross NPA ratio has been steadily increasing over the past 5 years, indicating potential issues with asset quality and credit risk management.</p>
      </div>

      {/* Announcement Section */}
      <div className="mb-6 border rounded-lg">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => setIsAnnouncementExpanded(!isAnnouncementExpanded)}
        >
          <span className="font-bold">Q4 Earnings Release [Negative]</span>
          {isAnnouncementExpanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
        {isAnnouncementExpanded && (
          <div className="p-4 border-t">
            <p>Published On: 2023-04-15</p>
            <div className="flex justify-between my-2">
              <span>1 day price impact: -3.2%</span>
              <span>7 day price impact: -5.7%</span>
              <span>30 day price impact: -8.1%</span>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Claims:</h3>
              <div className="p-2 bg-gray-100 text-gray-800 rounded mt-2">
                <div className="flex justify-between">
                  <span>Declining Profitability</span>
                  <span className="bg-black text-white px-2 rounded">System</span>
                </div>
                <p>Valid Till: 2023-10-15</p>
                <p>Importance: High</p>
                <p>Relevant Person: John Doe (CFO)</p>
                <p>Sentiment: Negative</p>
                <p>Relevant Metrics: financials.net_profit, financials.revenue</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Proposed Rules:</h3>
              <div className="p-2 bg-gray-100 rounded mt-2">
                <input
                  type="text"
                  placeholder="Rule Type"
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded mb-2"
                  rows={3}
                ></textarea>
                <div className="flex space-x-2 mb-2">
                  <input type="text" placeholder="Source 1" className="p-2 border rounded" />
                  <input type="text" placeholder="Source 2" className="p-2 border rounded" />
                  <input type="text" placeholder="Source 3" className="p-2 border rounded" />
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-300 rounded">Simulate</button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">Save Rule</button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-bold">Compliance Flags:</h3>
              <div className="p-2 bg-gray-100 text-gray-800 rounded mt-2">
                <p>Violated Act: Sarbanes-Oxley Act of 2002 (https://www.congress.gov/bill/107th-congress/house-bill/3763)</p>
                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded mt-2">
                  <p>Highlighted Section: Section 302 - Corporate Responsibility for Financial Reports</p>
                </div>
                <p className="mt-2">Rationale: The company&apos;s increasing NPA ratio and declining profitability raise concerns about the accuracy and completeness of financial reporting, potentially violating the CEO/CFO certification requirements under SOX Section 302.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialScreener;