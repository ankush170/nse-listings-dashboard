'use client';

import { useState } from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';
import { useSidebar } from '../context/SidebarContext';

export function Sidebar() {
    const { isOpen, setIsOpen } = useSidebar();

    const [companies] = useState([
        { name: 'Infosys', alerts: 5, discoveries: 3, flagged: 2, lastRefresh: new Date() },
        { name: 'TCS', alerts: 2, discoveries: 1, flagged: 0, lastRefresh: new Date() },
    ]);

    return (
        <div 
            className={`fixed inset-y-0 left-0 bg-[#8117DE] shadow-lg transition-all duration-300 ease-in-out z-50 ${isOpen ? 'w-64' : 'w-16'}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="h-full flex flex-col">
                <div className="p-4">
                    <img src="/onfilogo.svg" alt="Logo" width={40} height={40} className='rounded-full'/>
                </div>
                {isOpen && (
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Full SQL Search"
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-500 text-white placeholder-purple-200"
                            />
                            <MagnifyingGlassCircleIcon className="absolute left-3 top-3 h-5 w-5 text-purple-200" />
                        </div>
                        <div className="space-y-4">
                            {companies.map((company) => (
                                <div key={company.name} className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                                    <div className="mt-2 flex flex-col justify-between text-sm text-purple-100">
                                        <span>{company.alerts} Alerts</span>
                                        <span>{company.discoveries} AI Discoveries</span>
                                        <span>{company.flagged} Claims Flagged</span>
                                    </div>
                                    <div className="mt-4 text-xs text-purple-200">
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