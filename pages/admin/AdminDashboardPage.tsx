import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../contexts/OrderContext';
import { useProducts } from '../../contexts/ProductContext';
import { useEmployees } from '../../contexts/EmployeeContext';

const StatCard: React.FC<{ title: string; value: string | number; linkTo: string; linkText: string; icon: React.ReactNode }> = ({ title, value, linkTo, linkText, icon }) => (
    <div className="bg-surface rounded-lg shadow-md p-6 flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-text-secondary uppercase">{title}</p>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
            <Link to={linkTo} className="text-sm text-accent hover:underline mt-2 inline-block">
                {linkText} &rarr;
            </Link>
        </div>
        <div className="text-primary opacity-50">
            {icon}
        </div>
    </div>
);

const RevenueIcon = () => (
    <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InventoryIcon = () => (
    <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const UsersIcon = () => (
     <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 12a5.995 5.995 0 01-3 5.197" />
    </svg>
);


const AdminDashboardPage: React.FC = () => {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { employees } = useEmployees();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-text-primary mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            linkTo="/admin/analytics"
            linkText="View Analytics"
            icon={<RevenueIcon />}
        />
        <StatCard 
            title="Low Stock Items"
            value={lowStockItems}
            linkTo="/admin/inventory"
            linkText="Manage Inventory"
            icon={<InventoryIcon />}
        />
         <StatCard 
            title="Active Employees"
            value={activeEmployees}
            linkTo="/admin/employees"
            linkText="Manage Employees"
            icon={<UsersIcon />}
        />
      </div>

       <div className="mt-12 bg-surface p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
             <Link to="/admin/products" className="inline-block bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300">
                Manage Products
            </Link>
             <Link to="/admin/employees" className="inline-block bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                View Employees
            </Link>
             <Link to="/admin/payroll" className="inline-block bg-text-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300">
                Run Payroll
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;