import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  signup: () => void;
  loginAdmin: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    // In a real app, this would involve token handling, etc.
    setIsAuthenticated(true);
    setIsAdmin(false);
  };

  const signup = () => {
    // For this demo, signup will automatically log the user in.
    // In a real app, this would create a user record.
    setIsAuthenticated(true);
    setIsAdmin(false);
  };

  const loginAdmin = (user: string, pass: string) => {
    // In a real app, you would validate against a backend.
    if (user === 'admin' && pass === 'password') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, signup, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};