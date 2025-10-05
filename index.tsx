import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { SearchProvider } from './contexts/SearchContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProductProvider } from './contexts/ProductContext';
import { APIKeyProvider } from './contexts/APIKeyContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <APIKeyProvider>
        <AuthProvider>
          <ToastProvider>
            <ProductProvider>
              <CartProvider>
                <WishlistProvider>
                  <SearchProvider>
                    <App />
                  </SearchProvider>
                </WishlistProvider>
              </CartProvider>
            </ProductProvider>
          </ToastProvider>
        </AuthProvider>
      </APIKeyProvider>
    </HashRouter>
  </React.StrictMode>
);
