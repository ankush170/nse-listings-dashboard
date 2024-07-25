// types.ts

export interface Rule {
    id: string;
    name: string;
    type: string;
    author: string;
    activeTriggers: number;
    activeSince: string;
    description: string;
    sources: string[];
  }
  
  export interface UrgentAlert {
    id: string;
    name: string;
    triggeredAt: string;
    priceImpact1D: number;
    priceImpact7D: number;
  }
  
  export interface FinancialMetric {
    id: string;
    name: string;
    values: {
      [key: string]: string;
    };
    aiInsights: string;
  }
  
  export interface ProposedRule {
    id: string;
    type: string;
    description: string;
    sources: string[];
  }
  
  export interface Discovery {
    id: string;
    title: string;
    relatedTo: string;
    aiConfidence: number;
    updates: string[];
    proposedRules: ProposedRule[];
  }

  export interface Violation {
    violated_clause: string;
    rationale: string;
    relevant_pageno: string;
  }
  
  export interface Claim {
    id: string;
    title: string;
    validTill: string;
    importance: string;
    relevantPerson: string;
    sentiment: string;
    relevantMetrics: string[];
    proposedRules: ProposedRule[];
  }
  
  export interface Announcement {
    id: string;
    title: string;
    publishedOn: string;
    sentiment: string;
    priceImpact: {
      oneDay: number | null;
      sevenDay: number | null;
      thirtyDay: number | null;
    };
    claims: Claim[];
    violations: Violation[];
  }
  
  export interface HardcodedData {
    rules: Rule[];
    urgentAlerts: UrgentAlert[];
    financials: FinancialMetric[];
    discoveries: Discovery[];
    announcements: Announcement[];
  }