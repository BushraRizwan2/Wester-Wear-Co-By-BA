import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Redirect them to the /admin page, but save the current location they were
    // trying to go to. This is a good practice for UX, though not fully implemented here.
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;