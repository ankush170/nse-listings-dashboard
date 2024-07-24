// AIDiscoveryTab.tsx
import React, { useState } from 'react';
import { Discovery } from '../../types';

interface AIDiscoveryTabProps {
  discoveries: Discovery[];
}

export function AIDiscoveryTab({ discoveries }: AIDiscoveryTabProps) {
  const [expandedDiscoveries, setExpandedDiscoveries] = useState<{ [key: string]: boolean }>({});
  const [expandedRules, setExpandedRules] = useState<{ [key: string]: boolean }>({});

  const toggleDiscovery = (id: string) => {
    setExpandedDiscoveries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRules = (id: string) => {
    setExpandedRules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {discoveries.map((discovery) => (
        <div key={discovery.id} className="mb-6 border border-purple-200 rounded-lg">
          <div 
            className="flex justify-between items-center p-4 bg-purple-100 cursor-pointer"
            onClick={() => toggleDiscovery(discovery.id)}
          >
            <span className="font-bold text-purple-800">{discovery.title}</span>
            <div className="flex items-center">
              <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded mr-2">
                {discovery.aiConfidence}% AI Confidence
              </span>
              <span className="text-purple-800">
                {expandedDiscoveries[discovery.id] ? '▲' : '▼'}
              </span>
            </div>
          </div>
          {expandedDiscoveries[discovery.id] && (
            <div className="p-4 bg-white">
              <div className="flex">
                <p className="text-purple-800 mb-2">Related to:&nbsp;</p>
                <a className="text-blue-500 mb-2" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">{discovery.relatedTo}</a>
              </div>
              <h4 className="font-bold mt-2 text-purple-800">Updates:</h4>
              <ul className="list-disc pl-5 text-purple-800">
                {discovery.updates.map((update, index) => (
                  <li key={index}>{update}</li>
                ))}
              </ul>
              <div 
                className="font-bold mt-4 text-purple-800 cursor-pointer"
                onClick={() => toggleRules(discovery.id)}
              >
                Proposed Rules {expandedRules[discovery.id] ? '▲' : '▼'}
              </div>
              {expandedRules[discovery.id] && (
                <div className="space-y-2 mt-2">
                  {discovery.proposedRules.map((rule) => (
                    <div key={rule.id} className="bg-purple-50 p-4 rounded">
                      <p className="text-purple-800 font-bold">{rule.type}</p>
                      <p className="text-purple-800">Description: {rule.description}</p>
                      <p className="text-purple-800">Sources: {rule.sources.join(', ')}</p>
                      <div className="mt-2">
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-colors">
                          Simulate
                        </button>
                        <button className="bg-[#8117DE] text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                          Save Rule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}