import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Order } from '../types';
import { orders as initialOrders } from '../data/orders';

interface OrderContextType {
  orders: Order[];
  // Future functions for adding/managing orders can be added here
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  // In a real app, you'd have functions like addOrder, updateOrderStatus, etc.
  
  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};