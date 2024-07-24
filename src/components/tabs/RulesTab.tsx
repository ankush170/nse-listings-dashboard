// RulesTab.tsx
import React from 'react';
import { Rule } from '../../types';

interface RulesTabProps {
  rules: Rule[];
}

export function RulesTab({ rules }: RulesTabProps) {
    return (
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-purple-800">{rule.name}</span>
              <span className="text-purple-700">Author: {rule.author}</span>
              <span className="text-purple-700"># active triggers: {rule.activeTriggers}</span>
              <span className="text-purple-700">Active since: {rule.activeSince}</span>
            </div>
            <p className="mb-2 text-purple-800">Description: {rule.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <span className="text-purple-800">Sources:</span>
                {rule.sources.map((source, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-200 text-purple-800 rounded">{source}</span>
                ))}
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Delete Rule</button>
                <button className="px-4 py-2 bg-[#8117DE] text-white rounded hover:bg-purple-700 transition-colors">Edit Rule</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }