import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7a1 1 0 00-1-1h-2" />
    </svg>
);


const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { name, address } = location.state || { name: 'Valued Customer', address: 'Your specified address' };

  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); // Add 5 business days
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const estimatedDelivery = getEstimatedDeliveryDate();
  const trackingNumber = `1Z${Math.random().toString().substr(2, 9)}YT${Math.random().toString().substr(2, 6)}`;

  return (
    <div className="bg-surface p-8 sm:p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="text-center">
            <CheckCircleIcon />
            <h1 className="text-4xl font-serif font-bold mt-6 mb-4">Thank You For Your Order, {name.split(' ')[0]}!</h1>
            <p className="text-lg text-text-secondary max-w-md mx-auto mb-8">
                Your order has been placed successfully. A confirmation email with your order details has been sent.
            </p>
        </div>
        
        <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">Delivery & Tracking</h2>
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                        <LocationIcon />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">Shipping To</h3>
                        <p className="text-text-secondary mt-1">
                            <span className="font-semibold block">{name}</span>
                            {address}
                        </p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                        <CalendarIcon />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">Estimated Delivery</h3>
                        <p className="font-semibold text-primary mt-1">{estimatedDelivery}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4 mt-1">
                        <TruckIcon />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-primary">Tracking Information</h3>
                        <div className="text-text-secondary mt-1">
                            <p>
                                <span className="font-semibold">Number:</span> {trackingNumber}
                            </p>
                            <a href="#" className="text-accent hover:underline font-semibold" onClick={(e) => e.preventDefault()}>
                                Track Your Order &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="text-center mt-12">
            <Link 
                to="/" 
                className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    </div>
  );
};

export default OrderConfirmationPage;