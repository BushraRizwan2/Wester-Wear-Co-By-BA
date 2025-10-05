import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Toast, ToastType } from '../types';

interface ToastContextType {
  toasts: (Toast & { exiting?: boolean })[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(Toast & { exiting?: boolean })[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(currentToasts => 
      currentToasts.map(toast => 
        toast.id === id ? { ...toast, exiting: true } : toast
      )
    );
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, 300); // Corresponds to animation duration
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(currentToasts => [...currentToasts, { id, message, type, exiting: false }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000); // Auto-dismiss after 4 seconds
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): Pick<ToastContextType, 'showToast'> => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return { showToast: context.showToast };
};

export const useInternalToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
      throw new Error('useInternalToast must be used within a ToastProvider');
    }
    return context;
};
