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
    <nav className="bg-white shadow-md w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-3">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span className={`
                inline-flex items-center px-4 py-2 rounded-full text-sm font-medium 
                transition-all duration-200 ease-in-out shadow-md
                ${pathname === item.path
                  ? 'bg-[#8117DE] text-white'
                  : 'bg-purple-100 text-[#8117DE] hover:bg-purple-200 hover:shadow-lg'
                }
              `}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}