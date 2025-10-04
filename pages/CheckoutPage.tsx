import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Breadcrumbs from '../components/Breadcrumbs';

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'guest' | 'login'>('guest');

  // State for Guest Checkout
  const [formState, setFormState] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formState>>({});

  // State for Login
  const [loginState, setLoginState] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<Partial<typeof loginState>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState(prevState => ({ ...prevState, [name]: value }));
  };

  const validateGuestForm = () => {
    const newErrors: Partial<typeof formState> = {};
    if (!formState.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (formState.fullName.trim() === '') newErrors.fullName = 'Full name is required.';
    if (formState.address.trim() === '') newErrors.address = 'Address is required.';
    if (formState.city.trim() === '') newErrors.city = 'City is required.';
    if (formState.state.trim() === '') newErrors.state = 'State is required.';
    if (!/^\d{5}(-\d{4})?$/.test(formState.zip)) newErrors.zip = 'Valid ZIP code is required.';
    if (formState.cardName.trim() === '') newErrors.cardName = 'Name on card is required.';
    if (!/^\d{16}$/.test(formState.cardNumber)) newErrors.cardNumber = 'Valid 16-digit card number is required.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formState.expiry)) newErrors.expiry = 'Valid expiry date (MM/YY) is required.';
    if (!/^\d{3,4}$/.test(formState.cvc)) newErrors.cvc = 'Valid CVC is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateLoginForm = () => {
    const newErrors: Partial<typeof loginState> = {};
    if (!loginState.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (loginState.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGuestForm()) {
      console.log('Order submitted as guest:', { ...formState, cart, totalPrice });
      clearCart();
      navigate('/confirmation', { state: { name: formState.fullName, address: `${formState.address}, ${formState.city}, ${formState.state} ${formState.zip}` } });
    }
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginForm()) {
      // In a real app, you would authenticate the user here.
      // For this demo, we'll simulate a successful login and proceed.
      console.log('User logged in:', loginState.email);
      // We are redirecting to checkout again, but in a real app
      // this would now show the user's saved details.
      // For now, we just switch back to the guest tab with pre-filled email.
      setFormState(prev => ({...prev, email: loginState.email, fullName: 'Jane Doe (Logged In)'}));
      setActiveTab('guest');
    }
  };
  
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout' }
  ];

  const shippingCost = totalPrice > 0 ? 10.00 : 0;
  const totalWithShipping = totalPrice + shippingCost;

  const activeTabClass = 'border-primary text-primary';
  const inactiveTabClass = 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300';

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Order Summary */}
        <div className="order-last lg:order-first bg-surface p-8 rounded-lg shadow-lg mb-8 lg:mb-0">
            <h2 className="text-2xl font-serif font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="border-t mt-6 pt-6 space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total</span>
                    <span>${totalWithShipping.toFixed(2)}</span>
                </div>
            </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-surface p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-serif font-bold mb-6">Checkout</h1>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button onClick={() => setActiveTab('guest')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'guest' ? activeTabClass : inactiveTabClass}`}>
                Continue as Guest
              </button>
              <button onClick={() => setActiveTab('login')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'login' ? activeTabClass : inactiveTabClass}`}>
                Login
              </button>
            </nav>
          </div>
          
          {/* Guest Form */}
          {activeTab === 'guest' && (
            <form onSubmit={handleGuestSubmit} noValidate className="mt-6">
              <div className="space-y-6">
                  <div>
                      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-text-primary">Email address</label>
                          <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                  </div>
                  <div>
                      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                      <div className="grid grid-cols-1 gap-y-4">
                          <input type="text" id="fullName" name="fullName" placeholder="Full Name" value={formState.fullName} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                          <input type="text" id="address" name="address" placeholder="Address" value={formState.address} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <input type="text" id="city" name="city" placeholder="City" value={formState.city} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                              <input type="text" id="state" name="state" placeholder="State / Province" value={formState.state} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                              <input type="text" id="zip" name="zip" placeholder="ZIP / Postal" value={formState.zip} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                          </div>
                          {(errors.city || errors.state || errors.zip) && <p className="text-red-500 text-sm mt-1">{errors.city || errors.state || errors.zip}</p>}
                      </div>
                  </div>
                  <div>
                      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                      <div className="grid grid-cols-1 gap-y-4">
                           <input type="text" id="cardName" name="cardName" placeholder="Name on Card" value={formState.cardName} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                           {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                           <input type="text" id="cardNumber" name="cardNumber" value={formState.cardNumber} onChange={handleInputChange} placeholder="Card Number (16 digits)" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                           {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                           <div className="grid grid-cols-2 gap-4">
                               <input type="text" id="expiry" name="expiry" value={formState.expiry} onChange={handleInputChange} placeholder="Expiration (MM/YY)" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                               <input type="text" id="cvc" name="cvc" value={formState.cvc} onChange={handleInputChange} placeholder="CVC" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                           </div>
                           {(errors.expiry || errors.cvc) && <p className="text-red-500 text-sm mt-1">{errors.expiry || errors.cvc}</p>}
                      </div>
                  </div>
              </div>
              <button type="submit" className="w-full mt-8 bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300">
                  Place Order
              </button>
            </form>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} noValidate className="mt-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-text-primary">Email address</label>
                        <input type="email" id="login-email" name="email" value={loginState.email} onChange={handleLoginInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                        {loginErrors.email && <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>}
                    </div>
                     <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-text-primary">Password</label>
                        <input type="password" id="login-password" name="password" value={loginState.password} onChange={handleLoginInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" required />
                        {loginErrors.password && <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>}
                    </div>
                </div>
                 <button type="submit" className="w-full mt-8 bg-accent text-white font-bold py-3 px-6 rounded-md hover:bg-blue-800 transition-colors duration-300">
                    Login & Continue
                </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;