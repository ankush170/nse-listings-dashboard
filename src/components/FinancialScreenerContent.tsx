// FinancialScreenerContent.tsx
import React, { useState, useEffect } from 'react';
import { RulesTab } from './tabs/RulesTab';
import { UrgentAlertsTab } from './tabs/UrgentAlertsTab';
import { FinancialsRawTab } from './tabs/FinancialsRawTab';
import { AIDiscoveryTab } from './tabs/AIDiscoveryTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';
import { HardcodedData } from '../types';

const hardcodedData = {
    rules: [
      {
        id: '1',
        name: '%NPA (Numeric)',
        type: 'Numeric',
        author: 'Radhalaxmi Pillai',
        activeTriggers: 3,
        activeSince: '3 weeks',
        description: 'Gross NPA / Order Book > 11%',
        sources: ['financials.gross_npa', 'financials.order_book'],
      },
    ],
    urgentAlerts: [
      {
        id: '1',
        name: 'Rule Triggered',
        triggeredAt: '2023-07-15 14:30:00',
        priceImpact1D: -2.5,
        priceImpact7D: -4.8,
      },
    ],
    financials: [
      {
        id: '1',
        name: 'Gross NPA Ratio',
        values: {
          'FY18-19': '8.5%',
          'FY19-20': '9.2%',
          'FY20-21': '10.1%',
          'FY21-22': '11.3%',
          'FY22-23': '12.7%',
        },
        aiInsights: "The company's Gross NPA ratio has been steadily increasing over the past 5 years, indicating potential issues with asset quality and credit risk management.",
      },
    ],
    discoveries: [
      {
        id: '1',
        title: 'Potential Asset Quality Deterioration',
        relatedTo: 'Increasing NPA Ratio (Rules trigger + Claims Missed + Reconciliation Anomalies)',
        aiConfidence: 95,
        updates: [
          'Management acknowledged rising NPAs in the latest earnings call',
          'New risk assessment procedures implemented to address credit quality',
          'Board of Directors called for an emergency meeting to discuss asset quality',
        ],
        proposedRules: [
          {
            id: '1',
            type: 'NPA Trend Monitoring',
            description: 'Monitor quarterly changes in Gross NPA Ratio. Flag if the ratio increases by more than 1% in a single quarter or shows consistent increase for 3 consecutive quarters.',
            sources: ['financials.gross_npa', 'financials.total_assets', 'financials.quarterly_reports'],
          },
        ],
      },
    ],
    announcements: [
      {
        id: '1',
        title: 'Q4 Earnings Release',
        publishedOn: '2023-04-15',
        sentiment: 'Negative',
        priceImpact: {
          oneDay: -3.2,
          sevenDay: -5.7,
          thirtyDay: -8.1,
        },
        claims: [
          {
            id: '1',
            title: 'Declining Profitability',
            validTill: '2023-10-15',
            importance: 'High',
            relevantPerson: 'John Doe (CFO)',
            sentiment: 'Negative',
            relevantMetrics: ['financials.net_profit', 'financials.revenue'],
            proposedRules: [
                {
                  id: '1',
                  type: 'NPA Trend Monitoring',
                  description: 'Monitor quarterly changes in Gross NPA Ratio. Flag if the ratio increases by more than 1% in a single quarter or shows consistent increase for 3 consecutive quarters.',
                  sources: ['financials.gross_npa', 'financials.total_assets', 'financials.quarterly_reports'],
                },
              ],
          },
        ],
      },
    ],
  };

interface FinancialScreenerContentProps {
  activeTab: string;
}

export function FinancialScreenerContent({ activeTab }: FinancialScreenerContentProps) {
  const [data, setData] = useState<HardcodedData>(hardcodedData);

  useEffect(() => {
    setData(hardcodedData);
  }, []);

  switch (activeTab) {
    case 'rules':
      return <RulesTab rules={data.rules} />;
    case 'urgent-alerts':
      return <UrgentAlertsTab alerts={data.urgentAlerts} />;
    case 'financials-raw':
      return <FinancialsRawTab financials={data.financials} />;
    case 'ai-discovery':
      return <AIDiscoveryTab discoveries={data.discoveries} />;
    case 'announcements':
      return <AnnouncementsTab announcements={data.announcements} />;
    default:
      return <RulesTab rules={data.rules} />;
  }
}



