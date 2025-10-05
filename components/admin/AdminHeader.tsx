import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);


const AdminHeader: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-surface shadow-md z-10">
      <div className="text-text-primary font-semibold">
        Welcome, Admin!
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300"
      >
        <LogoutIcon />
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;