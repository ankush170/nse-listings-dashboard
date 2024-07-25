// FinancialScreenerContent.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { RulesTab } from './tabs/RulesTab';
import { UrgentAlertsTab } from './tabs/UrgentAlertsTab';
import { FinancialsRawTab } from './tabs/FinancialsRawTab';
import { AIDiscoveryTab } from './tabs/AIDiscoveryTab';
import { AnnouncementsTab } from './tabs/AnnouncementsTab';
import { HardcodedData } from '../types';
import { Sidebar } from './Sidebar';
import { Graph } from './Graph';
import { Navigation } from './Navigation';

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
        {
          id: '2',
          name: 'High Related Party Transactions',
          type: 'Financial Health',
          author: 'System',
          activeTriggers: 2,
          activeSince: '2023-07-20',
          description: 'Related party transactions > 75% of revenue',
          sources: ['financials.related_party_transactions', 'financials.revenue'],
        },
        {
          id: '3',
          name: 'High Off-Balance Sheet Items',
          type: 'Financial Health',
          author: 'System',
          activeTriggers: 1,
          activeSince: '2023-07-20',
          description: 'Off-balance sheet items > 75% of net worth',
          sources: ['financials.off_balance_sheet_items', 'financials.net_worth'],
        },
        {
          id: '4',
          name: 'High Investment in Unlisted Companies',
          type: 'Investment Risk',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Investment in unlisted companies > 20% of net worth',
          sources: ['financials.unlisted_investments', 'financials.net_worth'],
        },
        {
          id: '5',
          name: 'High Extraordinary Items',
          type: 'Financial Performance',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Extraordinary items > 20% of sales',
          sources: ['financials.extraordinary_items', 'financials.sales'],
        },
        {
          id: '6',
          name: 'High Promoter Holding Encumbrance',
          type: 'Shareholding',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Encumbrance of promoter shareholding > 75%',
          sources: ['financials.promoter_shareholding', 'financials.encumbrance'],
        },
        {
          id: '7',
          name: 'Abrupt Management Changes',
          type: 'Governance',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'More than 3 auditor resignations in 4 years or more than 7 director resignations in 3 years',
          sources: ['corporate.governance', 'corporate.management_changes'],
        },
        {
          id: '8',
          name: 'High Debt Levels',
          type: 'Financial Risk',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Debt to equity ratio > 1',
          sources: ['financials.debt', 'financials.equity'],
        },
        {
          id: '9',
          name: 'Negative Cash Flow from Operations',
          type: 'Liquidity Risk',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Negative cash flow from operations',
          sources: ['financials.cash_flow_operations'],
        },
        {
          id: '10',
          name: 'Interest Service Coverage Ratio',
          type: 'Financial Health',
          author: 'System',
          activeTriggers: 0,
          activeSince: '2023-07-20',
          description: 'Interest service coverage ratio < 1',
          sources: ['financials.interest_service_coverage'],
        }
      ],
      urgentAlerts: [
        {
          id: '1',
          name: 'High NPA Ratio',
          triggeredAt: '2023-07-15 14:30:00',
          description: 'Gross NPA Ratio increased to 12.7% in FY22-23, exceeding the threshold of 11%.',
          priceImpact1D: -2.5,
          priceImpact7D: -4.8,
        },
        {
          id: '2',
          name: 'High Related Party Transactions',
          triggeredAt: '2023-07-16 09:00:00',
          description: 'Related party transactions exceeded 75% of total revenue, indicating potential governance risks.',
          priceImpact1D: -1.5,
          priceImpact7D: -3.2,
        },
        {
          id: '3',
          name: 'Off-Balance Sheet Exposure',
          triggeredAt: '2023-07-17 10:30:00',
          description: 'Off-balance sheet items represent more than 75% of the company\'s net worth, posing significant financial risks.',
          priceImpact1D: -2.0,
          priceImpact7D: -3.5,
        },
        {
          id: '4',
          name: 'Negative Cash Flow',
          triggeredAt: '2023-07-18 11:45:00',
          description: 'The company reported negative cash flow from operations, indicating liquidity concerns.',
          priceImpact1D: -1.8,
          priceImpact7D: -3.0,
        },
        {
          id: '5',
          name: 'High Extraordinary Items',
          triggeredAt: '2023-07-19 14:00:00',
          description: 'Extraordinary items accounted for more than 20% of sales, raising questions about the consistency of financial performance.',
          priceImpact1D: -2.3,
          priceImpact7D: -4.0,
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
      {
        id: '2',
        name: 'Sales',
        values: {
          'FY18-19': '1000 Cr',
          'FY19-20': '1100 Cr',
          'FY20-21': '1200 Cr',
          'FY21-22': '1300 Cr',
          'FY22-23': '1400 Cr',
        },
        aiInsights: "The company's sales have shown consistent growth over the past five years, indicating a strong market position and demand for its services.",
      },
      {
        id: '3',
        name: 'OPM',
        values: {
          'FY18-19': '15%',
          'FY19-20': '16%',
          'FY20-21': '17%',
          'FY21-22': '18%',
          'FY22-23': '19%',
        },
        aiInsights: "The Operating Profit Margin has improved over the years, suggesting better cost management and operational efficiency.",
      },
      {
        id: '4',
        name: 'Profit after tax',
        values: {
          'FY18-19': '80 Cr',
          'FY19-20': '85 Cr',
          'FY20-21': '90 Cr',
          'FY21-22': '95 Cr',
          'FY22-23': '100 Cr',
        },
        aiInsights: "Profit after tax has shown steady growth, reflecting the company's ability to maintain profitability amidst varying market conditions.",
      },
      {
        id: '5',
        name: 'EPS',
        values: {
          'FY18-19': '5',
          'FY19-20': '5.5',
          'FY20-21': '6',
          'FY21-22': '6.5',
          'FY22-23': '7',
        },
        aiInsights: "Earnings per share have grown consistently, making the company more attractive to investors.",
      },
      {
        id: '6',
        name: 'Return on capital employed',
        values: {
          'FY18-19': '12%',
          'FY19-20': '13%',
          'FY20-21': '14%',
          'FY21-22': '15%',
          'FY22-23': '16%',
        },
        aiInsights: "Return on capital employed has increased, indicating more efficient use of capital and better returns on investments.",
      },
      {
        id: '7',
        name: 'Change in promoter holding',
        values: {
          'FY18-19': '0%',
          'FY19-20': '0%',
          'FY20-21': '0%',
          'FY21-22': '0%',
          'FY22-23': '0%',
        },
        aiInsights: "Promoter holding has remained stable, indicating confidence in the company’s future performance.",
      },
      {
        id: '8',
        name: 'Sales last year',
        values: {
          'FY18-19': '900 Cr',
          'FY19-20': '1000 Cr',
          'FY20-21': '1100 Cr',
          'FY21-22': '1200 Cr',
          'FY22-23': '1300 Cr',
        },
        aiInsights: "The company's sales last year have shown consistent growth over the past five years.",
      },
      {
        id: '9',
        name: 'Operating profit last year',
        values: {
          'FY18-19': '150 Cr',
          'FY19-20': '160 Cr',
          'FY20-21': '170 Cr',
          'FY21-22': '180 Cr',
          'FY22-23': '190 Cr',
        },
        aiInsights: "Operating profit last year has improved, indicating better operational efficiency.",
      },
      {
        id: '10',
        name: 'Other income last year',
        values: {
          'FY18-19': '10 Cr',
          'FY19-20': '12 Cr',
          'FY20-21': '14 Cr',
          'FY21-22': '16 Cr',
          'FY22-23': '18 Cr',
        },
        aiInsights: "Other income has shown a steady increase, contributing positively to the overall financial health.",
      },
      {
        id: '11',
        name: 'EBIDT last year',
        values: {
          'FY18-19': '160 Cr',
          'FY19-20': '170 Cr',
          'FY20-21': '180 Cr',
          'FY21-22': '190 Cr',
          'FY22-23': '200 Cr',
        },
        aiInsights: "EBIDT last year has shown a positive trend, indicating good earnings before interest, taxes, depreciation, and amortization.",
      },
      {
        id: '12',
        name: 'Depreciation last year',
        values: {
          'FY18-19': '20 Cr',
          'FY19-20': '22 Cr',
          'FY20-21': '24 Cr',
          'FY21-22': '26 Cr',
          'FY22-23': '28 Cr',
        },
        aiInsights: "Depreciation has increased, reflecting the company's ongoing capital expenditures.",
      },
      {
        id: '13',
        name: 'EBIT last year',
        values: {
          'FY18-19': '140 Cr',
          'FY19-20': '148 Cr',
          'FY20-21': '156 Cr',
          'FY21-22': '164 Cr',
          'FY22-23': '172 Cr',
        },
        aiInsights: "EBIT has shown steady growth, indicating efficient operations and profitability.",
      },
      {
        id: '14',
        name: 'Interest last year',
        values: {
          'FY18-19': '10 Cr',
          'FY19-20': '9 Cr',
          'FY20-21': '8 Cr',
          'FY21-22': '7 Cr',
          'FY22-23': '6 Cr',
        },
        aiInsights: "Interest expenses have decreased, suggesting better debt management and lower financial costs.",
      },
      {
        id: '15',
        name: 'Profit before tax last year',
        values: {
          'FY18-19': '130 Cr',
          'FY19-20': '139 Cr',
          'FY20-21': '148 Cr',
          'FY21-22': '157 Cr',
          'FY22-23': '166 Cr',
        },
        aiInsights: "Profit before tax has increased, reflecting improved profitability before tax expenses.",
      },
      {
        id: '16',
        name: 'Tax last year',
        values: {
          'FY18-19': '50 Cr',
          'FY19-20': '52 Cr',
          'FY20-21': '54 Cr',
          'FY21-22': '56 Cr',
          'FY22-23': '58 Cr',
        },
        aiInsights: "Tax expenses have grown in line with profitability, indicating a higher tax liability.",
      },
      {
        id: '17',
        name: 'Profit after tax last year',
        values: {
          'FY18-19': '80 Cr',
          'FY19-20': '85 Cr',
          'FY20-21': '90 Cr',
          'FY21-22': '95 Cr',
          'FY22-23': '100 Cr',
        },
        aiInsights: "Profit after tax has shown steady growth, reflecting the company's ability to maintain profitability amidst varying market conditions.",
      },
      {
        id: '18',
        name: 'Extraordinary items last year',
        values: {
          'FY18-19': '2 Cr',
          'FY19-20': '3 Cr',
          'FY20-21': '4 Cr',
          'FY21-22': '5 Cr',
          'FY22-23': '6 Cr',
        },
        aiInsights: "Extraordinary items have increased, indicating non-recurring gains or losses.",
      },
      {
        id: '19',
        name: 'Net Profit last year',
        values: {
          'FY18-19': '78 Cr',
          'FY19-20': '82 Cr',
          'FY20-21': '86 Cr',
          'FY21-22': '90 Cr',
          'FY22-23': '94 Cr',
        },
        aiInsights: "Net profit last year has increased, showing consistent profitability.",
      },
      {
        id: '20',
        name: 'Dividend last year',
        values: {
          'FY18-19': '10%',
          'FY19-20': '11%',
          'FY20-21': '12%',
          'FY21-22': '13%',
          'FY22-23': '14%',
        },
        aiInsights: "Dividends have increased, reflecting a commitment to returning value to shareholders.",
      },
      {
        id: '21',
        name: 'Material cost last year',
        values: {
          'FY18-19': '300 Cr',
          'FY19-20': '320 Cr',
          'FY20-21': '340 Cr',
          'FY21-22': '360 Cr',
          'FY22-23': '380 Cr',
        },
        aiInsights: "Material costs have increased, reflecting higher production costs or expanded operations.",
      },
      {
        id: '22',
        name: 'Employee cost last year',
        values: {
          'FY18-19': '150 Cr',
          'FY19-20': '160 Cr',
          'FY20-21': '170 Cr',
          'FY21-22': '180 Cr',
          'FY22-23': '190 Cr',
        },
        aiInsights: "Employee costs have risen, potentially due to workforce expansion or wage increases.",
      },
      {
        id: '23',
        name: 'Other cost last year',
        values: {
          'FY18-19': '200 Cr',
          'FY19-20': '210 Cr',
          'FY20-21': '220 Cr',
          'FY21-22': '230 Cr',
          'FY22-23': '240 Cr',
        },
        aiInsights: "Other costs have increased, indicating higher operating expenses.",
      },
      {
        id: '24',
        name: 'Equity capital last year',
        values: {
          'FY18-19': '500 Cr',
          'FY19-20': '550 Cr',
          'FY20-21': '600 Cr',
          'FY21-22': '650 Cr',
          'FY22-23': '700 Cr',
        },
        aiInsights: "Equity capital has increased, indicating potential new share issues or retained earnings.",
      },
      {
        id: '25',
        name: 'Reserve last year',
        values: {
          'FY18-19': '600 Cr',
          'FY19-20': '650 Cr',
          'FY20-21': '700 Cr',
          'FY21-22': '750 Cr',
          'FY22-23': '800 Cr',
        },
        aiInsights: "Reserves have increased, reflecting retained earnings and a strong financial position.",
      },
      {
        id: '26',
        name: 'Borrowings last year',
        values: {
          'FY18-19': '400 Cr',
          'FY19-20': '380 Cr',
          'FY20-21': '360 Cr',
          'FY21-22': '340 Cr',
          'FY22-23': '320 Cr',
        },
        aiInsights: "Borrowings have decreased, indicating lower debt levels and improved financial stability.",
      },
      {
        id: '27',
        name: 'Loans & Advances last year',
        values: {
          'FY18-19': '100 Cr',
          'FY19-20': '110 Cr',
          'FY20-21': '120 Cr',
          'FY21-22': '130 Cr',
          'FY22-23': '140 Cr',
        },
        aiInsights: "Loans and advances have increased, indicating higher lending or investments.",
      },
      {
        id: '28',
        name: 'Net Worth last year',
        values: {
          'FY18-19': '1100 Cr',
          'FY19-20': '1200 Cr',
          'FY20-21': '1300 Cr',
          'FY21-22': '1400 Cr',
          'FY22-23': '1500 Cr',
        },
        aiInsights: "Net worth has increased, reflecting overall financial health and growth.",
      },
      {
        id: '29',
        name: 'Gross block last year',
        values: {
          'FY18-19': '800 Cr',
          'FY19-20': '850 Cr',
          'FY20-21': '900 Cr',
          'FY21-22': '950 Cr',
          'FY22-23': '1000 Cr',
        },
        aiInsights: "Gross block has increased, indicating higher capital investments in assets.",
      },
      {
        id: '30',
        name: 'Investments last year',
        values: {
          'FY18-19': '300 Cr',
          'FY19-20': '320 Cr',
          'FY20-21': '340 Cr',
          'FY21-22': '360 Cr',
          'FY22-23': '380 Cr',
        },
        aiInsights: "Investments have increased, suggesting strategic expansions or financial growth.",
      },
      {
        id: '31',
        name: 'Net working capital last year',
        values: {
          'FY18-19': '100 Cr',
          'FY19-20': '110 Cr',
          'FY20-21': '120 Cr',
          'FY21-22': '130 Cr',
          'FY22-23': '140 Cr',
        },
        aiInsights: "Net working capital has increased, indicating better liquidity and operational efficiency.",
      },
      {
        id: '32',
        name: 'Net current assets last year',
        values: {
          'FY18-19': '200 Cr',
          'FY19-20': '210 Cr',
          'FY20-21': '220 Cr',
          'FY21-22': '230 Cr',
          'FY22-23': '240 Cr',
        },
        aiInsights: "Net current assets have increased, showing a stronger short-term financial position.",
      },
      {
        id: '33',
        name: 'Current liabilities last year',
        values: {
          'FY18-19': '150 Cr',
          'FY19-20': '160 Cr',
          'FY20-21': '170 Cr',
          'FY21-22': '180 Cr',
          'FY22-23': '190 Cr',
        },
        aiInsights: "Current liabilities have increased, indicating higher short-term financial obligations.",
      },
      {
        id: '34',
        name: 'Contingent liabilities last year',
        values: {
          'FY18-19': '50 Cr',
          'FY19-20': '55 Cr',
          'FY20-21': '60 Cr',
          'FY21-22': '65 Cr',
          'FY22-23': '70 Cr',
        },
        aiInsights: "Contingent liabilities have increased, indicating potential future financial obligations.",
      },
      {
        id: '35',
        name: 'Quick ratio last year',
        values: {
          'FY18-19': '1.5',
          'FY19-20': '1.6',
          'FY20-21': '1.7',
          'FY21-22': '1.8',
          'FY22-23': '1.9',
        },
        aiInsights: "The quick ratio has improved, indicating better short-term liquidity.",
      },
      {
        id: '36',
        name: 'Current ratio last year',
        values: {
          'FY18-19': '2.5',
          'FY19-20': '2.6',
          'FY20-21': '2.7',
          'FY21-22': '2.8',
          'FY22-23': '2.9',
        },
        aiInsights: "The current ratio has improved, showing stronger short-term financial health.",
      },
      {
        id: '37',
        name: 'Total debt last year',
        values: {
          'FY18-19': '400 Cr',
          'FY19-20': '380 Cr',
          'FY20-21': '360 Cr',
          'FY21-22': '340 Cr',
          'FY22-23': '320 Cr',
        },
        aiInsights: "Total debt has decreased, indicating lower financial leverage and improved financial stability.",
      },
      {
        id: '38',
        name: 'Book value last year',
        values: {
          'FY18-19': '50',
          'FY19-20': '55',
          'FY20-21': '60',
          'FY21-22': '65',
          'FY22-23': '70',
        },
        aiInsights: "Book value has increased, reflecting higher net asset value per share.",
      },
      {
        id: '39',
        name: 'Face value last year',
        values: {
          'FY18-19': '10',
          'FY19-20': '10',
          'FY20-21': '10',
          'FY21-22': '10',
          'FY22-23': '10',
        },
        aiInsights: "Face value has remained stable, reflecting no changes in the nominal value of shares.",
      },
      {
        id: '40',
        name:'Pledged promoter holding last year',
        values: {
          'FY18-19': '0%',
          'FY19-20': '0%',
          'FY20-21': '0%',
          'FY21-22': '0%',
          'FY22-23': '0%',
        },
        aiInsights: "Pledged promoter holding has remained at 0%, indicating no shares are pledged by promoters.",
      },
      {
        id: '41',
        name: 'ROCE last year',
        values: {
          'FY18-19': '12%',
          'FY19-20': '13%',
          'FY20-21': '14%',
          'FY21-22': '15%',
          'FY22-23': '16%',
        },
        aiInsights: "ROCE has improved, indicating better returns on capital employed.",
      },
      {
        id: '42',
        name: 'ROE last year',
        values: {
          'FY18-19': '10%',
          'FY19-20': '11%',
          'FY20-21': '12%',
          'FY21-22': '13%',
          'FY22-23': '14%',
        },
        aiInsights: "ROE has improved, indicating better returns on equity.",
      },
      {
        id: '43',
        name: 'Asset turnover ratio last year',
        values: {
          'FY18-19': '1.2',
          'FY19-20': '1.3',
          'FY20-21': '1.4',
          'FY21-22': '1.5',
          'FY22-23': '1.6',
        },
        aiInsights: "Asset turnover ratio has improved, indicating better utilization of assets to generate sales.",
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
      {
        id: '2',
        title: 'Strategic Infrastructure Development',
        relatedTo: 'EPC and BOT Project Expansions',
        aiConfidence: 90,
        updates: [
          'Increased investment in EPC and BOT projects announced in the latest shareholder meeting',
          'Expansion into new geographical regions for infrastructure development',
          'Partnerships with international firms for advanced project execution techniques',
        ],
        proposedRules: [
          {
            id: '2',
            type: 'Project Expansion Monitoring',
            description: 'Track the progress of new EPC and BOT projects. Highlight if project timelines are delayed by more than 10% or if there are cost overruns exceeding 15%.',
            sources: ['projects.epc', 'projects.bot', 'financials.project_costs', 'reports.quarterly_updates'],
          },
        ],
      },
      {
        id: '3',
        title: 'Operational Efficiency Improvement',
        relatedTo: 'Cost Management and Resource Optimization',
        aiConfidence: 92,
        updates: [
          'Implementation of new cost-saving measures in project execution',
          'Increased use of automated systems for monitoring and management',
          'Introduction of lean construction techniques to reduce waste',
        ],
        proposedRules: [
          {
            id: '3',
            type: 'Efficiency Metrics Tracking',
            description: 'Monitor key operational metrics such as cost per project unit, resource utilization rates, and project completion times. Flag any anomalies or deviations from expected benchmarks.',
            sources: ['financials.cost_management', 'projects.resource_utilization', 'reports.performance_metrics'],
          },
        ],
      },
      {
        id: '4',
        title: 'Risk Management Strategies',
        relatedTo: 'Compliance with Regulatory Standards and Risk Mitigation',
        aiConfidence: 88,
        updates: [
          'Enhanced compliance measures implemented in line with new regulations',
          'Risk assessment reports indicate potential areas of concern in project execution',
          'New insurance policies taken to cover unforeseen project risks',
        ],
        proposedRules: [
          {
            id: '4',
            type: 'Risk and Compliance Monitoring',
            description: 'Ensure compliance with regulatory standards and monitor for any signs of risk exposure. Alert if compliance issues are detected or if risk levels exceed acceptable thresholds.',
            sources: ['compliance.regulatory', 'risk_management.assessments', 'insurance.coverage'],
          },
        ],
      },
      {
        id: '5',
        title: 'Market Expansion Initiatives',
        relatedTo: 'New Market Entries and Strategic Partnerships',
        aiConfidence: 91,
        updates: [
          'Entry into new markets in South-East Asia and the Middle East',
          'Strategic partnerships formed with local contractors and suppliers',
          'Market research indicates strong demand for infrastructure projects in new regions',
        ],
        proposedRules: [
          {
            id: '5',
            type: 'Market Expansion Monitoring',
            description: 'Track the progress of market expansion initiatives and partnerships. Report any delays in market entry or issues with partnership agreements.',
            sources: ['market_expansion.regions', 'partnerships.contracts', 'market_research.reports'],
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
      {
        id: '2',
        title: 'PNCINFRA Q3 Earnings Release',
        publishedOn: '2024-02-06',
        sentiment: 'Positive',
        priceImpact: {
          oneDay: null,
          sevenDay: null,
          thirtyDay: null,
        },
        claims: [
          {
            id: '1',
            title: 'Revenue increased by 20% YoY to Rs. 1,200 crores in Q3 FY24',
            validTill: '2024-12-31',
            importance: 'High',
            relevantPerson: 'CFO',
            sentiment: 'Positive',
            relevantMetrics: ['Revenue'],
            proposedRules: [
              {
                id: '1',
                type: 'Financial Performance',
                description: 'Monitor Revenue Growth',
                trigger_condition: 'Revenue_YoY_Growth > 20',
                sources: ['Revenue'],
              },
            ],
          },
          {
            id: '2',
            title: 'Net profit margin expanded by 2% YoY to reach 10% in Q3 FY24',
            validTill: '2024-12-31',
            importance: 'High',
            relevantPerson: 'CEO',
            sentiment: 'Positive',
            relevantMetrics: ['Net Profit Margin'],
            proposedRules: [
              {
                id: '2',
                type: 'Financial Performance',
                description: 'Track Net Profit Margin Expansion',
                trigger_condition: 'Net_Profit_Margin_YoY_Growth > 2',
                sources: ['Net Profit Margin'],
              },
            ],
          },
          {
            id: '3',
            title: 'EPS up by 15% YoY to Rs. 10 for Q3 FY24',
            validTill: '2024-12-31',
            importance: 'Medium',
            relevantPerson: 'Finance Director',
            sentiment: 'Positive',
            relevantMetrics: ['EPS'],
            proposedRules: [
              {
                id: '3',
                type: 'Financial Performance',
                description: 'Evaluate EPS Growth',
                trigger_condition: 'EPS_YoY_Growth > 15',
                sources: ['EPS'],
              },
            ],
          },
          {
            id: '4',
            title: 'Order book grew by 25% YoY reaching Rs. 5,000 crores as of Q3 FY24',
            validTill: '2024-12-31',
            importance: 'High',
            relevantPerson: 'Sales Head',
            sentiment: 'Positive',
            relevantMetrics: ['Order Book'],
            proposedRules: [
              {
                id: '4',
                type: 'Market Position',
                description: 'Order Book Increase Tracking',
                trigger_condition: 'Order_Book_YoY_Growth > 25',
                sources: ['Order Book'],
              },
            ],
          },
          {
            id: '5',
            title: 'Guidance: Revenue projected to grow by 15% annually for the next 3 years',
            validTill: '2027-02-06',
            importance: 'High',
            relevantPerson: 'CEO',
            sentiment: 'Positive',
            relevantMetrics: ['Revenue', 'Growth Projection'],
            proposedRules: [
              {
                id: '5',
                type: 'Financial Performance',
                description: 'Monitor Revenue Growth Projection for Next 3 Years',
                trigger_condition: 'Projected_Annual_Revenue_Growth = 15',
                sources: ['Revenue', 'Growth Projection'],
              },
            ],
          },
        ],
      },
      {
        id: '3',
        title: 'PNCINFRA Management Changes',
        publishedOn: '2023-09-29',
        sentiment: 'Neutral',
        priceImpact: {
          oneDay: null,
          sevenDay: null,
          thirtyDay: null,
        },
        claims: [
          {
            id: '1',
            title: 'Re-appointment of Mr. Talluri Raghupati Rao as Whole-Time Director for 5 Years',
            validTill: null,
            importance: 'Medium',
            relevantPerson: 'Mr. Talluri Raghupati Rao',
            sentiment: 'Neutral',
            relevantMetrics: ['Leadership Stability', 'Strategic Continuity'],
            proposedRules: [
              {
                id: '1',
                type: 'Leadership Performance',
                description: "Monitor Strategic Continuity under Mr. Talluri Raghupati Rao's Tenure",
                trigger_condition: 'Net_Profit_Margin > 10% AND Revenue_Growth_Rate > Industry_Average AND Employee_Turnover_Rate < 5%',
                sources: ['Internal Financial Reports', 'Industry Benchmarks', 'HR Records'],
              },
            ],
          },
          {
            id: '2',
            title: 'Re-appointment of Mr. Gauri Shankar as Independent Non-Executive Director',
            validTill: null,
            importance: 'Medium',
            relevantPerson: 'Mr. Gauri Shankar',
            sentiment: 'Neutral',
            relevantMetrics: ['Governance Stability', 'Oversight Effectiveness'],
            proposedRules: [
              {
                id: '2',
                type: 'Governance Quality',
                description: "Governance Stability for Mr. Gauri Shankar's Tenure",
                trigger_condition: 'Board_Independence_Ratio >= 0.5 AND Audit_Committee_Financial_Expert = TRUE AND Executive_Compensation / Revenue < Industry_75th_Percentile',
                sources: ['Governance Databases', 'Internal Audit Reports'],
              },
            ],
          },
          {
            id: '3',
            title: 'Re-appointment of Mr. Krishan Kumar Jalan as Independent Non-Executive Director',
            validTill: null,
            importance: 'Medium',
            relevantPerson: 'Mr. Krishan Kumar Jalan',
            sentiment: 'Neutral',
            relevantMetrics: ['Board Effectiveness', 'Governance Quality'],
            proposedRules: [
              {
                id: '3',
                type: 'Board Performance',
                description: 'Board Effectiveness under Mr. Krishan Kumar Jalan',
                trigger_condition: 'Board_Meetings_Attendance > 90% AND Board_Resolution_Effectiveness_Rate > 80% AND Compliance_Score = 100',
                sources: ['Board Meeting Minutes', 'Internal Compliance Reports'],
              },
            ],
          },
        ],
      },
    ],
};

const hardcodedData1 = {
    rules: [
      {
        id: '1',
        name: 'Monitor Revenue YoY Growth for Q2',
        type: 'Financial Performance',
        author: '',
        activeTriggers: 0,
        activeSince: '2023-10-26',
        description: 'Revenue YoY Growth > 8.5',
        sources: ['Revenue YoY Growth'],
      },
      {
        id: '2',
        name: 'Track Consumer Business YoY Growth for Q2',
        type: 'Market Position',
        author: '',
        activeTriggers: 0,
        activeSince: '2023-10-26',
        description: 'Consumer Business Growth > 0.5',
        sources: ['Consumer Business Growth'],
      },
      {
        id: '3',
        name: 'Monitor Technology & Services Decline for Q2',
        type: 'Operational Efficiency',
        author: '',
        activeTriggers: 0,
        activeSince: '2023-10-26',
        description: 'Technology & Services Growth < -2.0',
        sources: ['Technology & Services Growth'],
      },
      {
        id: '4',
        name: 'Track Communication & Media Sector Performance',
        type: 'Market Position',
        author: '',
        activeTriggers: 0,
        activeSince: '2023-10-26',
        description: 'Communication & Media Growth < -1.5',
        sources: ['Communication & Media Growth'],
      },
      {
        id: '5',
        name: 'Monitor Energy, Resources, and Utilities Growth for Q2',
        type: 'Financial Performance',
        author: '',
        activeTriggers: 0,
        activeSince: '2023-10-26',
        description: 'Energy, Resources, and Utilities Growth > 5.0',
        sources: ['Energy, Resources, and Utilities Growth'],
      },
      {
        id: '6',
        name: '%NPA (Numeric)',
        type: 'Numeric',
        author: 'Radhalaxmi Pillai',
        activeTriggers: 3,
        activeSince: '3 weeks',
        description: 'Gross NPA / Order Book > 11%',
        sources: ['financials.gross_npa', 'financials.order_book'],
      },
      {
        id: '7',
        name: 'NPA Trend Monitoring',
        type: 'Financial Performance',
        author: 'AI System',
        activeTriggers: 0,
        activeSince: '2023-07-25',
        description: 'Gross NPA Ratio increase > 1% QoQ OR Gross NPA Ratio increase for 3 consecutive quarters',
        sources: ['financials.gross_npa', 'financials.total_assets', 'financials.quarterly_reports'],
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
        name: 'Market Cap',
        values: {
          '2023': '₹ 15,13,790 Cr.',
        },
        aiInsights: "TCS's market capitalization indicates its strong position in the market.",
      },
      {
        id: '2',
        name: 'Current Price',
        values: {
          '2023': '₹ 4,184',
        },
        aiInsights: "The current stock price reflects market perception and investor sentiment.",
      },
      {
        id: '3',
        name: 'P/E Ratio',
        values: {
          '2023': 31.8,
        },
        aiInsights: "A P/E ratio of 31.8 suggests that investors are willing to pay more for each unit of earnings, indicating high growth expectations.",
      },
      {
        id: '4',
        name: 'Book Value',
        values: {
          '2023': '₹ 250',
        },
        aiInsights: "The book value per share provides an indication of the company's asset base relative to its stock price.",
      },
      {
        id: '5',
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
      {
        id: '6',
        name: 'Revenue YoY Growth',
        values: {
          'Q2 FY24': '9%',
        },
        aiInsights: "The company's overall revenue for Q2 of FY24 showed an increase of 9% compared to the same quarter last year, indicating positive financial performance and growth.",
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
            id: '7',
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
        title: 'TCS Earnings Call Q2 FY24',
        publishedOn: '2023-10-26',
        sentiment: 'Positive',
        priceImpact: {
          oneDay: null,
          sevenDay: null,
          thirtyDay: null,
        },
        claims: [
          {
            id: '1',
            title: 'Revenue up 9% YoY in Q2 FY24',
            validTill: '2024-10-25',
            importance: 'High',
            relevantPerson: 'CEO',
            sentiment: 'Positive',
            relevantMetrics: ['Revenue YoY Growth'],
            proposedRules: [
              {
                id: '1',
                type: 'Financial Performance',
                description: 'Monitor Revenue YoY Growth for Q2',
                sources: ['Revenue YoY Growth'],
              },
            ],
          },
          {
            id: '2',
            title: 'Consumer Business Growth up 1.0% YoY in Q2 FY24',
            validTill: '2024-10-25',
            importance: 'Medium',
            relevantPerson: 'CFO',
            sentiment: 'Neutral',
            relevantMetrics: ['Consumer Business Growth'],
            proposedRules: [
              {
                id: '2',
                type: 'Market Position',
                description: 'Track Consumer Business YoY Growth for Q2',
                sources: ['Consumer Business Growth'],
              },
            ],
          },
          {
            id: '3',
            title: 'Technology & Services Decline by -2.2% YoY in Q2 FY24',
            validTill: '2024-10-25',
            importance: 'High',
            relevantPerson: 'COO',
            sentiment: 'Negative',
            relevantMetrics: ['Technology & Services Growth'],
            proposedRules: [
              {
                id: '3',
                type: 'Operational Efficiency',
                description: 'Monitor Technology & Services Decline for Q2',
                sources: ['Technology & Services Growth'],
              },
            ],
          },
          {
            id: '4',
            title: 'Communication & Media Decline by -2.1% YoY in Q2 FY24',
            validTill: '2024-10-25',
            importance: 'Medium',
            relevantPerson: 'CSO',
            sentiment: 'Negative',
            relevantMetrics: ['Communication & Media Growth'],
            proposedRules: [
              {
                id: '4',
                type: 'Market Position',
                description: 'Track Communication & Media Sector Performance',
                sources: ['Communication & Media Growth'],
              },
            ],
          },
          {
            id: '5',
            title: 'Energy, Resources, and Utilities up 5.6% YoY in Q2 FY24',
            validTill: '2024-10-25',
            importance: 'High',
            relevantPerson: 'EVP',
            sentiment: 'Positive',
            relevantMetrics: ['Energy, Resources, and Utilities Growth'],
            proposedRules: [
              {
                id: '5',
                type: 'Financial Performance',
                description: 'Monitor Energy, Resources, and Utilities Growth for Q2',
                sources: ['Energy, Resources, and Utilities Growth'],
              },
            ],
          },
        ],
      },
      {
        id: '2',
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
                id: '7',
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
    setActiveTab: (key: string) => void;
  }
  
  export function FinancialScreenerContent({ activeTab, setActiveTab }: FinancialScreenerContentProps) {
    const [data, setData] = useState<HardcodedData | null>(null);
    const [selectedCompany, setSelectedCompany] = useState('PNCINFRA');
  
    useEffect(() => {
      const selectedData = selectedCompany === 'PNCINFRA' ? hardcodedData : hardcodedData1;
      setData(selectedData as HardcodedData);
    }, [selectedCompany]);
  
    const handleCompanySelect = useCallback((companyName: string) => {
      setSelectedCompany(companyName);
    }, []);
  
    if (!data) {
      return null;
    }
  
    const renderActiveTab = () => {
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
    };
  
    return (
      <div className="flex">
        <Sidebar onCompanySelect={handleCompanySelect} />
        <div className="flex-1">
          <Graph selectedCompany={selectedCompany} />
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="p-8">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    );
  }


