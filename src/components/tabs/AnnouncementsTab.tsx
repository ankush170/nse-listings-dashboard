// AnnouncementsTab.tsx
import React, { useState } from 'react';
import { Announcement, Violation } from '../../types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
}

const getColorForValue = (value: number) => {
  if (value < 0) return 'text-red-600';
  if (value > 0) return 'text-green-600';
  return 'text-blue-600';
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export function AnnouncementsTab({ announcements }: AnnouncementsTabProps) {
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<{ [key: string]: boolean }>({});
  const [expandedClaims, setExpandedClaims] = useState<{ [key: string]: boolean }>({});
  const [expandedRules, setExpandedRules] = useState<{ [key: string]: boolean }>({});
  const [expandedViolations, setExpandedViolations] = useState<{ [key: string]: boolean }>({});

  const toggleAnnouncement = (id: string) => {
    setExpandedAnnouncements(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClaim = (id: string) => {
    setExpandedClaims(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRules = (id: string) => {
    setExpandedRules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleViolations = (id: string) => {
    setExpandedViolations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderViolation = (violation: Violation) => (
    <div key={violation.violated_clause} className="bg-white p-4 rounded mt-2 border border-red-200">
      <div className="mb-2">
        <strong className="text-red-800">Violated Act:</strong> 
        <div className="text-black">
        {violation.violated_clause}
        </div>        
      </div>
      <div className="mb-2">
        <strong className="text-red-800">Highlighted Section:</strong> 
        <div className='text-black'>
            page no: {violation.relevant_pageno}
        </div>
      </div>
      <div>
        <strong className="text-red-800">Rationale:</strong> 
        <div className='text-black'>
            {violation.rationale}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="mb-6 border border-purple-200 rounded-lg">
          <div 
            className="flex justify-between items-center p-4 bg-purple-100 cursor-pointer"
            onClick={() => toggleAnnouncement(announcement.id)}
          >
            <span className="font-bold text-purple-800">{announcement.title}</span>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded mr-2 ${getSentimentColor(announcement.sentiment)}`}>
                {announcement.sentiment}
              </span>
              <span className="text-purple-800">
                {expandedAnnouncements[announcement.id] ? '▲' : '▼'}
              </span>
            </div>
          </div>
          {expandedAnnouncements[announcement.id] && (
            <div className="p-4 bg-white">
              <p className="text-purple-800">Published On: {announcement.publishedOn}</p>
              <div className="flex justify-between my-2">
                <span className={getColorForValue(announcement.priceImpact.oneDay ?? 0)}>
                  1 day price impact: {announcement.priceImpact.oneDay ?? 0}%
                </span>
                <span className={getColorForValue(announcement.priceImpact.sevenDay ?? 0)}>
                  7 day price impact: {announcement.priceImpact.sevenDay ?? 0}%
                </span>
                <span className={getColorForValue(announcement.priceImpact.thirtyDay ?? 0)}>
                  30 day price impact: {announcement.priceImpact.thirtyDay ?? 0}%
                </span>
              </div>
              <h4 
                className="font-bold mt-4 text-purple-800 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleClaim(announcement.id);
                }}
              >
                Claims {expandedClaims[announcement.id] ? '▲' : '▼'}
              </h4>
              {expandedClaims[announcement.id] && announcement.claims.map((claim) => (
                <div key={claim.id} className="bg-purple-50 p-4 rounded mt-2">
                  <p className="text-purple-800 font-bold">{claim.title}</p>
                  <p className="text-purple-800">Valid Till: {claim.validTill}</p>
                  <p className="text-purple-800">Importance: {claim.importance}</p>
                  <p className="text-purple-800">Relevant Person: {claim.relevantPerson}</p>
                  <p className="text-purple-800">Sentiment: {claim.sentiment}</p>
                  <p className="text-purple-800">Relevant Metrics: {claim.relevantMetrics.join(', ')}</p>
                  <h5 
                    className="font-bold mt-3 text-purple-800 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRules(claim.id);
                    }}
                  >
                    Proposed Rules {expandedRules[claim.id] ? '▲' : '▼'}
                  </h5>
                  {expandedRules[claim.id] && claim.proposedRules && claim.proposedRules.map((rule) => (
                    <div key={rule.id} className="bg-white p-4 rounded mt-2">
                      <p className="text-purple-800 font-bold">{rule.type}</p>
                      <p className="text-purple-800">Description: {rule.description}</p>
                      <p className="text-purple-800">Sources: {rule.sources.join(', ')}</p>
                      <div className="mt-2">
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-colors">Simulate</button>
                        <button className="bg-[#8117DE] text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">Save Rule</button>
                      </div>
                    </div>
                  ))}
                </div>
          ))}
          {announcement.violations.length > 0 && (
                <>
                  <h4 
                    className="font-bold mt-4 text-red-800 cursor-pointer"
                    onClick={() => toggleViolations(announcement.id)}
                  >
                    Compliance Flags {expandedViolations[announcement.id] ? '▲' : '▼'}
                  </h4>
                  {expandedViolations[announcement.id] && (
                    <div className="bg-red-50 p-4 rounded mt-2">
                      {announcement.violations.map(renderViolation)}
                    </div>
                  )}
                </>
              )}
          </div>
        )}
      </div>
    ))}
  </div>
);
}




