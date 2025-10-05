import React from 'react';
import { NavLink } from 'react-router-dom';

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

const AdminSidebar: React.FC = () => {
  
  const activeLinkClass = 'bg-primary text-white';
  const inactiveLinkClass = 'text-gray-300 hover:bg-text-secondary hover:text-white';

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
        <NavLink to="/admin/products" className={linkClasses}>
          <ProductsIcon />
          <span className="mx-4 font-medium">Products</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;