import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import QuantityStepper from '../components/QuantityStepper';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-text-secondary mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface p-4 sm:p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary mb-8 border-b pb-4">Your Shopping Cart</h1>
      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b last:border-b-0">
            <div className="flex items-center mb-4 sm:mb-0 flex-grow pr-4">
              <img src={item.imageUrls[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
              <div>
                <Link to={`/product/${item.id}`} className="text-lg font-semibold text-text-primary hover:underline">{item.name}</Link>
                <p className="text-text-secondary">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
              <QuantityStepper 
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                ariaLabelPrefix={`quantity for ${item.name}`}
              />

              <p className="font-bold text-lg w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2" aria-label={`Remove ${item.name} from cart`}>
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-xl font-bold">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <p className="text-gray-500 text-right my-2">Shipping and taxes calculated at checkout.</p>
          <Link to="/checkout" className="w-full text-center bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 mt-4 inline-block">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;