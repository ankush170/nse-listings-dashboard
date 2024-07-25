// components/Graph.tsx
'use client'

import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { marked } from "marked";

const riskScoreData = [
  // Data for 2018
  { name: "Jan 2018", AI_Discovery: 85, Raw_Financials: 70, Overall: 78 },
  { name: "Feb 2018", AI_Discovery: 80, Raw_Financials: 68, Overall: 74 },
  { name: "Mar 2018", AI_Discovery: 78, Raw_Financials: 72, Overall: 75 },
  { name: "Apr 2018", AI_Discovery: 82, Raw_Financials: 69, Overall: 76 },
  { name: "May 2018", AI_Discovery: 76, Raw_Financials: 65, Overall: 70 },
  { name: "Jun 2018", AI_Discovery: 79, Raw_Financials: 67, Overall: 73 },
  { name: "Jul 2018", AI_Discovery: 81, Raw_Financials: 71, Overall: 76 },
  { name: "Aug 2018", AI_Discovery: 77, Raw_Financials: 66, Overall: 72 },
  { name: "Sep 2018", AI_Discovery: 84, Raw_Financials: 73, Overall: 78 },
  { name: "Oct 2018", AI_Discovery: 75, Raw_Financials: 64, Overall: 69 },
  { name: "Nov 2018", AI_Discovery: 83, Raw_Financials: 72, Overall: 77 },
  { name: "Dec 2018", AI_Discovery: 86, Raw_Financials: 74, Overall: 80 },

  // Data for 2019
  { name: "Jan 2019", AI_Discovery: 88, Raw_Financials: 75, Overall: 82 },
  { name: "Feb 2019", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Mar 2019", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Apr 2019", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "May 2019", AI_Discovery: 82, Raw_Financials: 70, Overall: 76 },
  { name: "Jun 2019", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "Jul 2019", AI_Discovery: 84, Raw_Financials: 72, Overall: 78 },
  { name: "Aug 2019", AI_Discovery: 90, Raw_Financials: 77, Overall: 83 },
  { name: "Sep 2019", AI_Discovery: 88, Raw_Financials: 76, Overall: 82 },
  { name: "Oct 2019", AI_Discovery: 85, Raw_Financials: 73, Overall: 79 },
  { name: "Nov 2019", AI_Discovery: 87, Raw_Financials: 75, Overall: 81 },
  { name: "Dec 2019", AI_Discovery: 89, Raw_Financials: 77, Overall: 83 },

  // Data for 2020
  { name: "Jan 2020", AI_Discovery: 83, Raw_Financials: 71, Overall: 77 },
  { name: "Feb 2020", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Mar 2020", AI_Discovery: 80, Raw_Financials: 68, Overall: 74 },
  { name: "Apr 2020", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "May 2020", AI_Discovery: 84, Raw_Financials: 71, Overall: 77 },
  { name: "Jun 2020", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "Jul 2020", AI_Discovery: 82, Raw_Financials: 70, Overall: 76 },
  { name: "Aug 2020", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Sep 2020", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Oct 2020", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Nov 2020", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Dec 2020", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },

  // Data for 2021
  { name: "Jan 2021", AI_Discovery: 84, Raw_Financials: 71, Overall: 77 },
  { name: "Feb 2021", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "Mar 2021", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Apr 2021", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "May 2021", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Jun 2021", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Jul 2021", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },
  { name: "Aug 2021", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "Sep 2021", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Oct 2021", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Nov 2021", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Dec 2021", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },

  // Data for 2022
  { name: "Jan 2022", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Feb 2022", AI_Discovery: 83, Raw_Financials: 70, Overall: 76 },
  { name: "Mar 2022", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Apr 2022", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "May 2022", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Jun 2022", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },
  { name: "Jul 2022", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "Aug 2022", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Sep 2022", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Oct 2022", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Nov 2022", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Dec 2022", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },

  // Data for 2023
  { name: "Jan 2023", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Feb 2023", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Mar 2023", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Apr 2023", AI_Discovery: 86, Raw_Financials: 73, Overall: 79 },
  { name: "May 2023", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },
  { name: "Jun 2023", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Jul 2023", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
  { name: "Aug 2023", AI_Discovery: 88, Raw_Financials: 75, Overall: 81 },
  { name: "Sep 2023", AI_Discovery: 85, Raw_Financials: 72, Overall: 78 },
  { name: "Oct 2023", AI_Discovery: 89, Raw_Financials: 76, Overall: 82 },
  { name: "Nov 2023", AI_Discovery: 90, Raw_Financials: 78, Overall: 84 },
  { name: "Dec 2023", AI_Discovery: 87, Raw_Financials: 74, Overall: 80 },
];

const riskScoreData1 = [
  // Data for 2018
  { name: "Jan 2018", AI_Discovery: 82, Raw_Financials: 75, Overall: 78 },
  { name: "Feb 2018", AI_Discovery: 80, Raw_Financials: 74, Overall: 77 },
  { name: "Mar 2018", AI_Discovery: 78, Raw_Financials: 76, Overall: 77 },
  { name: "Apr 2018", AI_Discovery: 81, Raw_Financials: 75, Overall: 78 },
  { name: "May 2018", AI_Discovery: 79, Raw_Financials: 74, Overall: 77 },
  { name: "Jun 2018", AI_Discovery: 80, Raw_Financials: 75, Overall: 77 },
  { name: "Jul 2018", AI_Discovery: 82, Raw_Financials: 76, Overall: 78 },
  { name: "Aug 2018", AI_Discovery: 83, Raw_Financials: 77, Overall: 79 },
  { name: "Sep 2018", AI_Discovery: 81, Raw_Financials: 75, Overall: 78 },
  { name: "Oct 2018", AI_Discovery: 84, Raw_Financials: 78, Overall: 80 },
  { name: "Nov 2018", AI_Discovery: 83, Raw_Financials: 77, Overall: 80 },
  { name: "Dec 2018", AI_Discovery: 85, Raw_Financials: 79, Overall: 82 },

  // Data for 2019
  { name: "Jan 2019", AI_Discovery: 86, Raw_Financials: 78, Overall: 82 },
  { name: "Feb 2019", AI_Discovery: 85, Raw_Financials: 77, Overall: 81 },
  { name: "Mar 2019", AI_Discovery: 84, Raw_Financials: 78, Overall: 81 },
  { name: "Apr 2019", AI_Discovery: 87, Raw_Financials: 79, Overall: 83 },
  { name: "May 2019", AI_Discovery: 85, Raw_Financials: 77, Overall: 81 },
  { name: "Jun 2019", AI_Discovery: 86, Raw_Financials: 78, Overall: 82 },
  { name: "Jul 2019", AI_Discovery: 88, Raw_Financials: 80, Overall: 84 },
  { name: "Aug 2019", AI_Discovery: 87, Raw_Financials: 79, Overall: 83 },
  { name: "Sep 2019", AI_Discovery: 86, Raw_Financials: 78, Overall: 82 },
  { name: "Oct 2019", AI_Discovery: 89, Raw_Financials: 80, Overall: 85 },
  { name: "Nov 2019", AI_Discovery: 88, Raw_Financials: 79, Overall: 84 },
  { name: "Dec 2019", AI_Discovery: 90, Raw_Financials: 81, Overall: 86 },

  // Data for 2020
  { name: "Jan 2020", AI_Discovery: 88, Raw_Financials: 80, Overall: 84 },
  { name: "Feb 2020", AI_Discovery: 87, Raw_Financials: 79, Overall: 83 },
  { name: "Mar 2020", AI_Discovery: 85, Raw_Financials: 78, Overall: 82 },
  { name: "Apr 2020", AI_Discovery: 89, Raw_Financials: 81, Overall: 85 },
  { name: "May 2020", AI_Discovery: 88, Raw_Financials: 80, Overall: 84 },
  { name: "Jun 2020", AI_Discovery: 89, Raw_Financials: 81, Overall: 85 },
  { name: "Jul 2020", AI_Discovery: 90, Raw_Financials: 82, Overall: 86 },
  { name: "Aug 2020", AI_Discovery: 89, Raw_Financials: 81, Overall: 85 },
  { name: "Sep 2020", AI_Discovery: 90, Raw_Financials: 82, Overall: 86 },
  { name: "Oct 2020", AI_Discovery: 91, Raw_Financials: 83, Overall: 87 },
  { name: "Nov 2020", AI_Discovery: 92, Raw_Financials: 84, Overall: 88 },
  { name: "Dec 2020", AI_Discovery: 93, Raw_Financials: 85, Overall: 89 },

  // Data for 2021
  { name: "Jan 2021", AI_Discovery: 91, Raw_Financials: 83, Overall: 87 },
  { name: "Feb 2021", AI_Discovery: 90, Raw_Financials: 82, Overall: 86 },
  { name: "Mar 2021", AI_Discovery: 92, Raw_Financials: 84, Overall: 88 },
  { name: "Apr 2021", AI_Discovery: 93, Raw_Financials: 85, Overall: 89 },
  { name: "May 2021", AI_Discovery: 92, Raw_Financials: 84, Overall: 88 },
  { name: "Jun 2021", AI_Discovery: 94, Raw_Financials: 86, Overall: 90 },
  { name: "Jul 2021", AI_Discovery: 95, Raw_Financials: 87, Overall: 91 },
  { name: "Aug 2021", AI_Discovery: 94, Raw_Financials: 86, Overall: 90 },
  { name: "Sep 2021", AI_Discovery: 95, Raw_Financials: 87, Overall: 91 },
  { name: "Oct 2021", AI_Discovery: 96, Raw_Financials: 88, Overall: 92 },
  { name: "Nov 2021", AI_Discovery: 97, Raw_Financials: 89, Overall: 93 },
  { name: "Dec 2021", AI_Discovery: 98, Raw_Financials: 90, Overall: 94 },

  // Data for 2022
  { name: "Jan 2022", AI_Discovery: 97, Raw_Financials: 89, Overall: 93 },
  { name: "Feb 2022", AI_Discovery: 96, Raw_Financials: 88, Overall: 92 },
  { name: "Mar 2022", AI_Discovery: 98, Raw_Financials: 90, Overall: 94 },
  { name: "Apr 2022", AI_Discovery: 99, Raw_Financials: 91, Overall: 95 },
  { name: "May 2022", AI_Discovery: 98, Raw_Financials: 90, Overall: 94 },
  { name: "Jun 2022", AI_Discovery: 99, Raw_Financials: 91, Overall: 95 },
  { name: "Jul 2022", AI_Discovery: 100, Raw_Financials: 92, Overall: 96 },
  { name: "Aug 2022", AI_Discovery: 99, Raw_Financials: 91, Overall: 95 },
  { name: "Sep 2022", AI_Discovery: 100, Raw_Financials: 92, Overall: 96 },
  { name: "Oct 2022", AI_Discovery: 101, Raw_Financials: 93, Overall: 97 },
  { name: "Nov 2022", AI_Discovery: 102, Raw_Financials: 94, Overall: 98 },
  { name: "Dec 2022", AI_Discovery: 103, Raw_Financials: 95, Overall: 99 },

  // Data for 2023
  { name: "Jan 2023", AI_Discovery: 101, Raw_Financials: 93, Overall: 97 },
  { name: "Feb 2023", AI_Discovery: 100, Raw_Financials: 92, Overall: 96 },
  { name: "Mar 2023", AI_Discovery: 102, Raw_Financials: 94, Overall: 98 },
  { name: "Apr 2023", AI_Discovery: 103, Raw_Financials: 95, Overall: 99 },
  { name: "May 2023", AI_Discovery: 102, Raw_Financials: 94, Overall: 98 },
  { name: "Jun 2023", AI_Discovery: 103, Raw_Financials: 95, Overall: 99 },
  { name: "Jul 2023", AI_Discovery: 104, Raw_Financials: 96, Overall: 100 },
  { name: "Aug 2023", AI_Discovery: 103, Raw_Financials: 95, Overall: 99 },
  { name: "Sep 2023", AI_Discovery: 104, Raw_Financials: 96, Overall: 100 },
  { name: "Oct 2023", AI_Discovery: 105, Raw_Financials: 97, Overall: 101 },
  { name: "Nov 2023", AI_Discovery: 106, Raw_Financials: 98, Overall: 102 },
  { name: "Dec 2023", AI_Discovery: 107, Raw_Financials: 99, Overall: 103 },
];

interface GraphProps {
  selectedCompany: string;
}

export function Graph({ selectedCompany }: GraphProps) {
  const [data, setData] = useState(riskScoreData);
  const [factors, setFactors] = useState({
    Raw_Financials: { selected: true, weight: 50 },
    AI_Discovery: { selected: true, weight: 50 },
    Overall: { selected: false, weight: 50 },
  });
  const [showFactors, setShowFactors] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  useEffect(() => {
    const selectedData = selectedCompany === 'PNCINFRA' ? riskScoreData : riskScoreData1;
    setData(selectedData);
  }, [selectedCompany]);

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

  const handleAIInsightsClick = () => {
    setShowAIInsights(true);
  };

  const aiInsightsContent =
    selectedCompany === "PNCINFRA"
      ? `1. **Gross NPA Ratio Increase**:
    - Significant rise from 8.5% in FY18-19 to 12.7% in FY22-23, indicating potential asset quality deterioration and increased credit risk.
 
 2. **Sales and Profit Growth**:
    - Consistent growth in sales (from 1000 Cr to 1400 Cr) and EPS (from 5 to 7) suggests strong market presence and revenue generation.
 
 3. **Operational Efficiency**:
    - Improved Operating Profit Margin (OPM) from 15% to 19%, indicating better cost management, partially mitigating NPA risks.
 
 4. **Increased Contingent Liabilities**:
    - Rising contingent liabilities highlight potential future financial obligations, requiring careful management.
 
 5. **Stable Promoter Holding and Decreased Borrowings**:
    - Stability in promoter holding and reduced borrowings indicate confidence in future performance and improved financial leverage.
 
 ## Recommendations
 
 - **Enhance Risk Management**: Improve credit risk assessment and monitor NPA trends closely.
 - **Strategic Growth Monitoring**: Maintain growth momentum while ensuring robust project management to mitigate expansion risks.
 - **Operational Efficiency**: Continue enhancing operational efficiency through cost management and lean practices.`
      : `1. **Gross NPA Ratio Increase**:
    - TCS has seen a steady increase in the Gross NPA ratio from 8.5% in FY18-19 to 12.7% in FY22-23. This indicates potential challenges in asset quality and heightened credit risk, which could impact financial stability.
 
 2. **Revenue and Profit Growth**:
    - The company has demonstrated consistent growth in revenue, as indicated by the 9% YoY growth in Q2 FY24. This suggests strong market positioning and resilience in generating income despite macroeconomic challenges.
 
 3. **Operational Efficiency**:
    - TCS's Operating Profit Margin (OPM) has improved over the years, now standing at 19%. This improvement reflects enhanced cost management and operational efficiencies, which contribute positively to the overall risk profile.
 
 4. **Contingent Liabilities**:
    - An increase in contingent liabilities has been noted, which may pose potential financial risks in the future. This factor requires careful monitoring to avoid unforeseen financial obligations.
 
 5. **Market Position and Financial Stability**:
    - Stable promoter holding and a reduction in borrowings indicate confidence in TCS's future performance and a solid financial structure. This stability helps mitigate some of the risks associated with the increasing NPA ratio.
 
 ### Recommendations
 
 - **Enhance Risk Management**: TCS should focus on improving its credit risk assessment processes to manage the rising NPA levels effectively.
 - **Monitor Growth Metrics**: Continued vigilance on revenue and profit growth metrics is essential to maintain the company's market position.
 - **Operational Efficiency Initiatives**: Sustaining and expanding on operational efficiencies will further strengthen TCS's financial stability.
 - **Manage Contingent Liabilities**: Proactive management of contingent liabilities is crucial to prevent potential financial strains.`;

 return (
  <div className="bg-white p-6 shadow-md w-full relative z-0">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-[#8117DE]">Overall Weighted Risk Score Graph</h2>
      <div className="space-x-4">
        <button
          onClick={handleAIInsightsClick}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
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
        <Line type="monotone" dataKey="AI_Discovery" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="Raw_Financials" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="Overall" stroke="#8117DE" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    {showAIInsights && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-auto">
          <h2 className="text-2xl text-[#8117DE] font-bold mb-4">AI Insights</h2>
          <div dangerouslySetInnerHTML={{ __html: marked(aiInsightsContent) }} className="text-black"/>
          <button 
            onClick={() => setShowAIInsights(false)}
            className="mt-4 px-4 py-2 bg-[#8117DE] text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
);
}
