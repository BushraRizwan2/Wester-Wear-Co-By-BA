import type { Order } from '../types';

// Helper function to generate dates
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const orders: Order[] = [
  {
    id: 'ORD001',
    date: generateDate(1),
    items: [
      { productId: 'S001', productName: 'Denim Rancher Shirt', quantity: 1, price: 79.99 },
      { productId: 'W003', productName: 'Suede Cowboy Boots', quantity: 1, price: 249.99 },
    ],
    total: 329.98,
  },
  {
    id: 'ORD002',
    date: generateDate(2),
    items: [
      { productId: 'S002', productName: 'Embroidered Sundress', quantity: 2, price: 129.99 },
    ],
    total: 259.98,
  },
  {
    id: 'ORD003',
    date: generateDate(5),
    items: [
      { productId: 'W001', productName: 'Sherpa-Lined Denim Jacket', quantity: 1, price: 189.99 },
    ],
    total: 189.99,
  },
  {
    id: 'ORD004',
    date: generateDate(10),
    items: [
      { productId: 'S004', productName: 'Turquoise Buckle Belt', quantity: 1, price: 149.99 },
    ],
    total: 149.99,
  },
   {
    id: 'ORD005',
    date: generateDate(35), // Last month
    items: [
      { productId: 'W002', productName: 'Wool Pendleton Blanket Scarf', quantity: 1, price: 119.99 },
      { productId: 'W004', productName: 'Felt Cattleman Hat', quantity: 1, price: 159.99 },
    ],
    total: 279.98,
  },
   {
    id: 'ORD006',
    date: generateDate(40), // Last month
    items: [
      { productId: 'S001', productName: 'Denim Rancher Shirt', quantity: 2, price: 79.99 },
    ],
    total: 159.98,
  },
   {
    id: 'ORD007',
    date: generateDate(400), // Last year
    items: [
      { productId: 'W003', productName: 'Suede Cowboy Boots', quantity: 1, price: 249.99 },
    ],
    total: 249.99,
  },
    {
    id: 'ORD008',
    date: generateDate(1), // Same day as first order
    items: [
      { productId: 'S003', productName: 'Leather Tooled Sandals', quantity: 1, price: 99.99 },
    ],
    total: 99.99,
  },
];
