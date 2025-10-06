import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import Breadcrumbs from '../Breadcrumbs';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const generateCrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    const page = pathnames[1] || 'dashboard';
    const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

    if (page === 'dashboard') {
        return [{ label: pageTitle }];
    }

    return [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: pageTitle }
    ];
  };

  const crumbs = generateCrumbs();

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <Breadcrumbs crumbs={crumbs} className="mb-6" />
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;