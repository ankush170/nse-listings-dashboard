"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Switch } from "@headlessui/react";
import { Navigation } from "./Navigation";

const FinancialScreener: React.FC = () => {
  const [isAnnouncementExpanded, setIsAnnouncementExpanded] = useState(false);
  const [isClaimsExpanded, setIsClaimsExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isDiscoveryExpanded, setIsDiscoveryExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Navigation />
      <div className="p-6">
        {/* Rule Triggered Section */}
        <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <div className="flex justify-between items-center">
            <span className="text-purple-800">
              Rule Triggered (2023-07-15 14:30:00)
            </span>
            <span className="text-red-600">1 day Price Impact: -2.5%</span>
            <span className="text-red-600">7 day Price Impact: -4.8%</span>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isEnabled}
                onChange={setIsEnabled}
                className={`${
                  isEnabled ? "bg-[#8117DE]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
              >
                <span className="sr-only">Enable rule</span>
                <span
                  className={`${
                    isEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <span className="font-medium text-purple-800">
                <span className={isEnabled ? "font-bold" : "font-normal"}>
                  Yes
                </span>
                {" / "}
                <span className={!isEnabled ? "font-bold" : "font-normal"}>
                  No
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Rule Details Section */}
        <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-purple-800">%NPA (Numeric)</span>
            <span className="text-purple-700">Author: Radhalaxmi Pillai</span>
            <span className="text-purple-700">
              Active Triggers: 3 (FP/TP/FN/TN)
            </span>
            <span className="text-purple-700">Active since: 3 weeks</span>
          </div>
          <p className="mb-2 text-purple-800">
            Description: Gross NPA / Order Book {">"} 11%
          </p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <span className="text-purple-800">Sources:</span>
              <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded">
                financials.gross_npa
              </span>
              <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded">
                financials.order_book
              </span>
            </div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete Rule
              </button>
              <button className="px-4 py-2 bg-[#8117DE] text-white rounded hover:bg-purple-700 transition-colors">
                Edit Rule
              </button>
            </div>
          </div>
        </div>

        {/* Search Expression */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Expression"
            className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
          />
        </div>

        {/* Metric Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse border border-purple-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="border border-purple-200 p-2 text-purple-800">
                  Metric Name
                </th>
                <th className="border border-purple-200 p-2 text-purple-800">
                  FY18-19
                </th>
                <th className="border border-purple-200 p-2 text-purple-800">
                  FY19-20
                </th>
                <th className="border border-purple-200 p-2 text-purple-800">
                  FY20-21
                </th>
                <th className="border border-purple-200 p-2 text-purple-800">
                  FY21-22
                </th>
                <th className="border border-purple-200 p-2 text-purple-800">
                  FY22-23
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-purple-200 p-2 text-purple-800">
                  Gross NPA Ratio
                </td>
                <td className="border border-purple-200 p-2 text-purple-800">
                  8.5%
                </td>
                <td className="border border-purple-200 p-2 text-purple-800">
                  9.2%
                </td>
                <td className="border border-purple-200 p-2 text-purple-800">
                  10.1%
                </td>
                <td className="border border-purple-200 p-2 text-purple-800">
                  11.3%
                </td>
                <td className="border border-purple-200 p-2 text-purple-800">
                  12.7%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
          <p className="text-purple-800">
            The company's Gross NPA ratio has been steadily increasing over the
            past 5 years, indicating potential issues with asset quality and
            credit risk management.
          </p>
        </div>

        {/* Announcement Section */}
        <div className="mb-6 border border-purple-200 rounded-lg">
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors"
            onClick={() => setIsAnnouncementExpanded(!isAnnouncementExpanded)}
          >
            <span className="font-bold text-purple-800">
              Q4 Earnings Release [Negative]
            </span>
            {isAnnouncementExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-purple-800" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-purple-800" />
            )}
          </div>
          {isAnnouncementExpanded && (
            <div className="p-4 border-t border-purple-200 bg-white">
              <p className="text-purple-800">Published On: 2023-04-15</p>
              <div className="flex justify-between my-2 text-purple-800">
                <span className="text-red-600">1 day price impact: -3.2%</span>
                <span className="text-red-600">7 day price impact: -5.7%</span>
                <span className="text-red-600">30 day price impact: -8.1%</span>
              </div>
              <div className="mt-4">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors rounded-t-lg"
                  onClick={() => setIsClaimsExpanded(!isClaimsExpanded)}
                >
                  <h3 className="font-bold text-purple-800">Claims:</h3>
                  {isClaimsExpanded ? (
                    <ChevronUpIcon className="h-5 w-5 text-purple-800" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-purple-800" />
                  )}
                </div>
                {isClaimsExpanded && (
                  <div className="p-4 bg-purple-50 text-purple-800 rounded-b-lg border-t border-purple-200">
                    <div className="flex justify-between">
                      <span className="font-bold text-purple-800">
                        Declining Profitability
                      </span>
                      <span className="bg-[#8117DE] text-white px-2 rounded">
                        System
                      </span>
                    </div>
                    <p>Valid Till: 2023-10-15</p>
                    <p>Importance: High</p>
                    <p>Relevant Person: John Doe (CFO)</p>
                    <p>Sentiment: Negative</p>
                    <p>
                      Relevant Metrics: financials.net_profit,
                      financials.revenue
                    </p>

                    <h4 className="font-bold mt-4 mb-2">Proposed Rules:</h4>
                    <div className="p-2 bg-purple-50 rounded mt-2">
                      <input
                        type="text"
                        placeholder="Rule Type"
                        className="w-full p-2 border border-purple-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-2 border border-purple-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      ></textarea>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          placeholder="Source 1"
                          className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Source 2"
                          className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Source 3"
                          className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors text-gray-800">
                          Simulate
                        </button>
                        <button className="px-4 py-2 bg-[#8117DE] text-white rounded hover:bg-purple-700 transition-colors">
                          Save Rule
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-purple-800">Compliance Flags:</h3>
                <div className="p-2 bg-purple-50 text-purple-800 rounded mt-2">
                  <p>Violated Act: Sarbanes-Oxley Act of 2002</p>
                  <div className="p-2 bg-yellow-100 border border-yellow-300 rounded mt-2">
                    <p>
                      Highlighted Section: Section 302 - Corporate
                      Responsibility for Financial Reports
                    </p>
                  </div>
                  <p className="mt-2">
                    Rationale: The company's increasing NPA ratio and declining
                    profitability raise concerns about the accuracy and
                    completeness of financial reporting, potentially violating
                    the CEO/CFO certification requirements under SOX Section
                    302.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Discovery Section */}
        <div className="mb-6 border border-purple-200 rounded-lg">
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors"
            onClick={() => setIsDiscoveryExpanded(!isDiscoveryExpanded)}
          >
            <span className="font-bold text-purple-800">
              Potential Asset Quality Deterioration
            </span>
            <div className="flex items-center">
              <span className="mr-4 bg-purple-200 text-purple-800 px-2 py-1 rounded">
                95% AI Confidence
              </span>
              {isDiscoveryExpanded ? (
                <ChevronUpIcon className="h-5 w-5 text-purple-800" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-purple-800" />
              )}
            </div>
          </div>
          {isDiscoveryExpanded && (
            <div className="p-4 border-t border-purple-200 bg-white">
              <p className="text-purple-800 mb-2">
                Related to: Increasing NPA Ratio (Rules trigger + Claims Missed
                + Reconciliation Anomalies)
              </p>
              <div className="bg-purple-50 p-3 rounded mb-4">
                <p className="text-purple-800">
                  Latest updates on relevant clarifications:
                </p>
                <p className="text-purple-800">
                  • Management acknowledged rising NPAs in the latest earnings
                  call
                </p>
                <p className="text-purple-800">
                  • New risk assessment procedures implemented to address credit
                  quality
                </p>
                <p className="text-purple-800">
                  • Board of Directors called for an emergency meeting to
                  discuss asset quality
                </p>
              </div>

              <h3 className="font-bold text-purple-800 mb-2">
                Proposed Rules:
              </h3>
              <div className="p-2 bg-purple-50 rounded mt-2">
                <input
                  type="text"
                  placeholder="Rule Type"
                  className="w-full p-2 border border-purple-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border border-purple-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                ></textarea>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Source 1"
                    className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Source 2"
                    className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Source 3"
                    className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors text-gray-800">
                    Simulate
                  </button>
                  <button className="px-4 py-2 bg-[#8117DE] text-white rounded hover:bg-purple-700 transition-colors">
                    Save Rule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialScreener;
