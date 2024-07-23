// src/app/page.tsx
import FinancialScreener from '../components/FinancialScreener';

export default function Home() {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-200">Welcome to the Risk Dashboard</h1>
      <FinancialScreener />
    </div>
  );
}