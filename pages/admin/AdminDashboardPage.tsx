import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-text-primary mb-6">Admin Dashboard</h1>
      <div className="bg-surface p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Welcome to the Admin Panel</h2>
        <p className="text-text-secondary">
          From here, you can manage all aspects of your store. Use the sidebar to navigate between different sections.
        </p>
        <div className="mt-6">
          <Link to="/admin/products" className="inline-block bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300">
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;