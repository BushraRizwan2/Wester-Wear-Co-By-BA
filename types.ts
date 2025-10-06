
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string; // ISO date string
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  imageUrls: string[];
  category: 'summer' | 'winter';
  reviews?: Review[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isApiKeyError?: boolean;
  products?: Product[];
}

export type EmployeeStatus = 'active' | 'on-leave' | 'terminated';

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  startDate: string; // ISO date string
  status: EmployeeStatus;
  hourlyRate: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  clockIn: string;  // ISO date string
  clockOut: string | null; // ISO date string
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number; // Price at the time of purchase
}

export interface Order {
  id: string;
  date: string; // ISO date string
  items: OrderItem[];
  total: number;
}