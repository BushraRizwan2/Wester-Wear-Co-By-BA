import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Chatbot from './components/Chatbot';
import LoginPage from './pages/LoginPage';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<ProductListPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<OrderConfirmationPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <ToastContainer />
    </div>
  );
};

export default App;