
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  imageUrl: string;
  category: 'summer' | 'winter';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}