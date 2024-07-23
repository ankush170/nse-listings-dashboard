// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { MagnifyingGlassCircleIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { useSidebar } from '../context/SidebarContext';

export function Sidebar() {
    const { isOpen, toggle } = useSidebar();

    const [companies] = useState([
        { name: 'Infosys', alerts: 5, discoveries: 3, flagged: 2, lastRefresh: new Date() },
        { name: 'TCS', alerts: 2, discoveries: 1, flagged: 0, lastRefresh: new Date() },
    ]);

    return (
        <div className={`fixed inset-y-0 left-0 bg-blue-600 shadow-lg transition-all duration-300 ease-in-out z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
            <div className="h-full flex flex-col">
                <div className="p-4">
                    <button onClick={toggle} className="text-white hover:text-blue-200">
                        <Bars3Icon className="h-8 w-8" />
                    </button>
                </div>
                {isOpen && (
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Full SQL Search"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-500 text-white placeholder-blue-200"
                            />
                            <MagnifyingGlassCircleIcon className="absolute left-3 top-3 h-5 w-5 text-blue-200" />
                        </div>
                        <div className="space-y-4">
                            {companies.map((company) => (
                                <div key={company.name} className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                                    <div className="mt-2 flex flex-col justify-between text-sm text-blue-100">
                                        <span>{company.alerts} Alerts</span>
                                        <span>{company.discoveries} AI Discoveries</span>
                                        <span>{company.flagged} Claims Flagged</span>
                                    </div>
                                    <div className="mt-4 text-xs text-blue-200">
                                        Last refresh: {company.lastRefresh.toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}