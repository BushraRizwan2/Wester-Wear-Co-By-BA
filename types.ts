
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
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}