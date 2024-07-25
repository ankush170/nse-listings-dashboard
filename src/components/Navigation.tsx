'use client';


const navItems = [
  { name: "Rules", key: "rules" },
  { name: "Urgent Alerts", key: "urgent-alerts" },
  { name: "Financials Raw", key: "financials-raw" },
  { name: "AI Discovery", key: "ai-discovery" },
  { name: "Announcements", key: "announcements" }
];

interface NavigationProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 shadow-lg w-full mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`
                flex-1 text-center py-4 text-lg font-semibold tracking-wide
                transition-all duration-300 ease-in-out
                ${activeTab === item.key
                  ? 'bg-white text-purple-800 border-b-4 border-purple-500'
                  : 'text-white hover:bg-purple-600 hover:text-white'
                }
              `}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}