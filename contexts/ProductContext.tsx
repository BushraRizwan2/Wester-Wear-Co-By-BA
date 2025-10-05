import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Product, Review } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'reviews'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: `P${Date.now()}`, // Simple unique ID generation
      reviews: [],
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
        ...reviewData,
        id: `R${Date.now()}`,
        date: new Date().toISOString(),
    };
    
    setProducts(prevProducts => 
        prevProducts.map(p => {
            if (p.id === productId) {
                return {
                    ...p,
                    reviews: [newReview, ...(p.reviews || [])]
                };
            }
            return p;
        })
    );
  };

  return (
    <ProductContext.Provider value={{ products, getProductById, addProduct, updateProduct, deleteProduct, addReview }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};