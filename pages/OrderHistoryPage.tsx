import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumbs from '../components/Breadcrumbs';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const OrderHistoryPage: React.FC = () => {
    const { orders } = useOrders();
    const { isAuthenticated } = useAuth();
    const [openOrderId, setOpenOrderId] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash && orders.some(o => o.id === hash)) {
            setOpenOrderId(hash);
        }
    }, [location.hash, orders]);


    const toggleOrderDetails = (orderId: string) => {
        const newOpenOrderId = openOrderId === orderId ? null : orderId;
        setOpenOrderId(newOpenOrderId);

        if (newOpenOrderId) {
            navigate(`#${newOpenOrderId}`, { replace: true });
        } else {
            navigate(location.pathname, { replace: true });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Access Denied</h1>
                <p className="text-lg text-text-secondary mb-8">Please log in to view your order history.</p>
                <Link to="/login" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Login
                </Link>
            </div>
        );
    }
    
    const crumbs = [{ label: 'Home', path: '/' }, { label: 'My Order History' }];

    if (orders.length === 0) {
        return (
             <div className="text-center py-20">
                <Breadcrumbs crumbs={crumbs} />
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">No Orders Found</h1>
                <p className="text-lg text-text-secondary mb-8">You haven't placed any orders with us yet.</p>
                <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div>
            <Breadcrumbs crumbs={crumbs} />
            <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-center">My Order History</h1>

            <div className="space-y-4 max-w-4xl mx-auto">
                {orders.map(order => (
                    <div key={order.id} className="bg-surface rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition-colors"
                            aria-expanded={openOrderId === order.id}
                            aria-controls={`order-details-${order.id}`}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-semibold">Order ID</p>
                                    <p className="font-mono text-sm text-text-primary">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-semibold">Date Placed</p>
                                    <p className="text-sm">{formatDate(order.date)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary uppercase font-semibold">Total</p>
                                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <span className="text-sm text-green-700 font-semibold hidden md:inline">Shipped</span>
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </button>
                        
                        {openOrderId === order.id && (
                             <div id={`order-details-${order.id}`} className="p-4 border-t bg-gray-50">
                                <h4 className="font-semibold mb-3">Items in this order:</h4>
                                <div className="space-y-3">
                                    {order.items.map(item => (
                                        <div key={item.productId} className="flex justify-between items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-text-primary">{item.productName}</p>
                                                <p className="text-text-secondary">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;