'use client';

import { useState } from 'react';
import { Navigation } from './Navigation';
import { FinancialScreenerContent } from './FinancialScreenerContent';

export function FinancialScreener() {
  const [activeTab, setActiveTab] = useState('rules');

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6">
        <FinancialScreenerContent activeTab={activeTab} />
      </div>
    </div>
  );
}