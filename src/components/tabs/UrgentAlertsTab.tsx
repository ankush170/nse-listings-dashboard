// UrgentAlertsTab.tsx
import React from 'react';
import { UrgentAlert } from '../../types';

interface UrgentAlertsTabProps {
  alerts: UrgentAlert[];
}
export function UrgentAlertsTab({ alerts }: UrgentAlertsTabProps) {
    return (
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="mb-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
            <div className="flex justify-between items-center">
              <span className="text-purple-800">{alert.name} ({alert.triggeredAt})</span>
              <span className="text-red-600">1 day Price Impact: {alert.priceImpact1D}%</span>
              <span className="text-red-600">7 day Price Impact: {alert.priceImpact7D}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  }