import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const DashboardIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ProductsIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 12a5.995 5.995 0 01-3 5.197" />
    </svg>
);

const ClockIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InventoryIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const AnalyticsIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const PayrollIcon = () => (
     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const AdminSidebar: React.FC = () => {
  
  const activeLinkClass = 'bg-primary text-white';
  const inactiveLinkClass = 'text-white/70 hover:bg-primary-dark hover:text-white';

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 my-1 transition-colors duration-200 rounded-md ${isActive ? activeLinkClass : inactiveLinkClass}`;
    
  return (
    <aside className="hidden md:flex flex-col w-64 bg-text-primary text-white">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-2xl font-serif font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          <DashboardIcon />
          <span className="mx-4 font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/admin/analytics" className={linkClasses}>
          <AnalyticsIcon />
          <span className="mx-4 font-medium">Analytics</span>
        </NavLink>
        <NavLink to="/admin/products" className={linkClasses}>
          <ProductsIcon />
          <span className="mx-4 font-medium">Products</span>
        </NavLink>
         <NavLink to="/admin/inventory" className={linkClasses}>
          <InventoryIcon />
          <span className="mx-4 font-medium">Inventory</span>
        </NavLink>
        <NavLink to="/admin/employees" className={linkClasses}>
          <UsersIcon />
          <span className="mx-4 font-medium">Employees</span>
        </NavLink>
        <NavLink to="/admin/attendance" className={linkClasses}>
          <ClockIcon />
          <span className="mx-4 font-medium">Attendance</span>
        </NavLink>
        <NavLink to="/admin/payroll" className={linkClasses}>
          <PayrollIcon />
          <span className="mx-4 font-medium">Payroll</span>
        </NavLink>
        <NavLink to="/admin/settings" className={linkClasses}>
            <SettingsIcon />
            <span className="mx-4 font-medium">Settings</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-white/20">
          <Link to="/" className="flex items-center justify-center bg-primary-dark text-white font-bold py-2 px-4 rounded-md hover:bg-primary transition-colors duration-300 w-full">
              <ExternalLinkIcon />
              View Site
          </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;