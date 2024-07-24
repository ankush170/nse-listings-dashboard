// AnnouncementsTab.tsx
import React, { useState } from 'react';
import { Announcement } from '../../types';

interface AnnouncementsTabProps {
  announcements: Announcement[];
}

export function AnnouncementsTab({ announcements }: AnnouncementsTabProps) {
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<{ [key: string]: boolean }>({});
  const [expandedClaims, setExpandedClaims] = useState<{ [key: string]: boolean }>({});
  const [expandedRules, setExpandedRules] = useState<{ [key: string]: boolean }>({});

  const toggleAnnouncement = (id: string) => {
    setExpandedAnnouncements(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClaim = (id: string) => {
    setExpandedClaims(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRules = (id: string) => {
    setExpandedRules(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded mr-2">
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
              <div className="flex justify-between my-2 text-purple-800">
                <span>1 day price impact: {announcement.priceImpact.oneDay}%</span>
                <span>7 day price impact: {announcement.priceImpact.sevenDay}%</span>
                <span>30 day price impact: {announcement.priceImpact.thirtyDay}%</span>
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
}