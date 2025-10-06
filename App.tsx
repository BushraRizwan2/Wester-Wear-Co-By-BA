import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import QuickViewModal from './components/QuickViewModal';
import AdminEmployeesPage from './pages/admin/AdminEmployeesPage';
import AdminAttendancePage from './pages/admin/AdminAttendancePage';
import AdminInventoryPage from './pages/admin/AdminInventoryPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminPayrollPage from './pages/admin/AdminPayrollPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import SizeGuidePage from './pages/SizeGuidePage';

const SiteLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 pt-20 pb-8">
      {children}
    </main>
    <Footer />
    <Chatbot />
    <ToastContainer />
    <QuickViewModal />
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminLoginPage = location.pathname === '/admin';

  if (isAdminRoute && !isAdminLoginPage) {
    return (
       <>
        <Routes>
          <Route element={<ProtectedRoute />}>
             <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
             <Route path="/admin/products" element={<AdminLayout><AdminProductsPage /></AdminLayout>} />
             <Route path="/admin/employees" element={<AdminLayout><AdminEmployeesPage /></AdminLayout>} />
             <Route path="/admin/attendance" element={<AdminLayout><AdminAttendancePage /></AdminLayout>} />
             <Route path="/admin/inventory" element={<AdminLayout><AdminInventoryPage /></AdminLayout>} />
             <Route path="/admin/analytics" element={<AdminLayout><AdminAnalyticsPage /></AdminLayout>} />
             <Route path="/admin/payroll" element={<AdminLayout><AdminPayrollPage /></AdminLayout>} />
             <Route path="/admin/settings" element={<AdminLayout><AdminSettingsPage /></AdminLayout>} />
          </Route>
        </Routes>
        <ToastContainer />
       </>
    );
  }

  return (
    <SiteLayout>
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
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/size-guide" element={<SizeGuidePage />} />
      </Routes>
    </SiteLayout>
  );
};

export default App;