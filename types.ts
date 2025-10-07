export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  imageUrls: string[];
  category: 'clothing' | 'fragrance' | 'jewelry' | 'accessories';
  stock: number;
  reviews?: Review[];
};

export type CartItem = Product & {
  quantity: number;
};

export type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
  products?: Product[];
  isApiKeyError?: boolean;
};

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export type EmployeeStatus = 'active' | 'on-leave' | 'terminated';

export type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  startDate: string; // ISO date string
  status: EmployeeStatus;
  hourlyRate: number;
};

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  clockIn: string; // ISO date string
  clockOut: string | null;
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string; // ISO date string
  items: OrderItem[];
  total: number;
};
