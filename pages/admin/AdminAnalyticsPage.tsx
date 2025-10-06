import React, { useState, useMemo } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { Order } from '../../types';
import SalesChart from '../../components/admin/SalesChart';

type ViewMode = 'daily' | 'monthly' | 'yearly';

interface ChartData {
  label: string;
  value: number;
}

const processData = (orders: Order[], mode: ViewMode): ChartData[] => {
  const dataMap = new Map<string, number>();

  orders.forEach(order => {
    const date = new Date(order.date);
    let key: string;

    switch (mode) {
      case 'daily':
        key = date.toLocaleDateString('en-CA'); // YYYY-MM-DD
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        break;
      case 'yearly':
        key = String(date.getFullYear());
        break;
    }
    
    dataMap.set(key, (dataMap.get(key) || 0) + order.total);
  });

  const sortedData = Array.from(dataMap.entries()).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  
  return sortedData.map(([label, value]) => ({ label, value }));
};


const StatCard: React.FC<{ title: string; value: string; }> = ({ title, value }) => (
    <div className="bg-surface rounded-lg shadow-md p-6">
        <p className="text-sm font-medium text-text-secondary uppercase">{title}</p>
        <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
    </div>
);


const AdminAnalyticsPage: React.FC = () => {
  const { orders } = useOrders();
  const [viewMode, setViewMode] = useState<ViewMode>('daily');

  const chartData = useMemo(() => processData(orders, viewMode), [orders, viewMode]);
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-text-primary mb-6">Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
        <StatCard title="Total Orders" value={String(orders.length)} />
        <StatCard title="Avg. Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
      </div>

      <div className="bg-surface rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Revenue Over Time</h2>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
                {(['daily', 'monthly', 'yearly'] as ViewMode[]).map(mode => (
                    <button 
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${viewMode === mode ? 'bg-primary text-white shadow' : 'text-text-secondary hover:bg-gray-200'}`}
                    >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                ))}
            </div>
        </div>
        <SalesChart data={chartData} />
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;