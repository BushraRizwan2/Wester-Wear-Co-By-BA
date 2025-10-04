import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '../types';
import { products as allProducts } from '../data/products';

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  performSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const performSearch = (query: string) => {
    const sanitizedQuery = query.trim().toLowerCase();
    setSearchQuery(query); // Store original query for display

    if (!sanitizedQuery) {
      setSearchResults([]);
      return;
    }
    
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(sanitizedQuery)
    );
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, performSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
