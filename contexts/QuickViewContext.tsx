import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '../types';

interface QuickViewContextType {
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    // Delay clearing the product to allow for closing animation
    setTimeout(() => {
        setQuickViewProduct(null);
    }, 300);
  };
  
  return (
    <QuickViewContext.Provider value={{ isQuickViewOpen, quickViewProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = (): QuickViewContextType => {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};