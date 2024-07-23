// src/components/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Urgent Alerts", path: "/urgent-alerts" },
  { name: "Financials Raw", path: "/financials-raw" },
  { name: "Rules", path: "/rules" },
  { name: "AI Discovery", path: "/ai-discovery" },
  { name: "Announcements", path: "/announcements" },
  { name: "Active Litigation", path: "/active-litigation" }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 mt-8 rounded-lg shadow-md">
      <ul className="flex justify-between px-4 py-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path}>
              <span className={`text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${pathname === item.path ? 'bg-blue-700' : ''}`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}