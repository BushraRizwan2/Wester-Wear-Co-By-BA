import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useSearch } from '../contexts/SearchContext';
import { useAuth } from '../contexts/AuthContext';

const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { performSearch } = useSearch();
  const { isAuthenticated, logout } = useAuth();
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const activeLinkClass = 'text-primary border-b-2 border-primary font-semibold';
  const inactiveLinkClass = 'text-text-secondary hover:text-primary transition-colors duration-300';
  
  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-primary text-white block px-3 py-2 rounded-md text-base font-medium'
      : 'text-text-secondary hover:bg-gray-100 hover:text-primary block px-3 py-2 rounded-md text-base font-medium';
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
        performSearch(trimmedQuery);
        navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        setQuery('');
        setIsMobileMenuOpen(false); // Close menu after mobile search
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-surface shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-2xl sm:text-3xl font-serif text-primary font-bold">
                Western Wear Co.
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
                  Home
                </NavLink>
                <NavLink to="/category/summer" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
                  Summer
                </NavLink>
                <NavLink to="/category/winter" className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}>
                  Winter
                </NavLink>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              {/* Search Bar - Changed to md:block */}
              <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                  <input
                      id="search"
                      name="search"
                      className="block w-32 md:w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-text-secondary focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-width duration-300 ease-in-out focus:w-48 md:focus:w-64"
                      placeholder="Search..."
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search products"
                  />
                  <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary" aria-label="Submit search">
                      <SearchIcon />
                  </button>
              </form>

              {/* Auth Links - Changed to md breakpoint */}
              {isAuthenticated ? (
                  <>
                      <button onClick={handleLogout} className={`${inactiveLinkClass} hidden md:block`}>
                          Logout
                      </button>
                      <button onClick={handleLogout} className={`${inactiveLinkClass} md:hidden`} aria-label="Logout">
                          <LogoutIcon />
                      </button>
                  </>
              ) : (
                  <>
                      <NavLink to="/login" className={`${inactiveLinkClass} hidden md:block`}>
                          Login
                      </NavLink>
                      <NavLink to="/login" className={`${inactiveLinkClass} md:hidden`} aria-label="Login">
                          <UserIcon />
                      </NavLink>
                  </>
              )}

               <NavLink to="/wishlist" className="relative text-text-secondary hover:text-primary transition-colors duration-300" aria-label={`View your wishlist, ${wishlistCount} items`}>
                  <HeartIcon />
                  {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistCount}
                      </span>
                  )}
              </NavLink>
              <NavLink to="/cart" className="relative text-text-secondary hover:text-primary transition-colors duration-300" aria-label={`View your shopping cart, ${itemCount} items`}>
                <ShoppingBagIcon />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </NavLink>
            </div>
            
            {/* Hamburger Button */}
            <div className="md:hidden ml-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to="/" className={mobileLinkClass} onClick={handleMobileLinkClick}>Home</NavLink>
                    <NavLink to="/category/summer" className={mobileLinkClass} onClick={handleMobileLinkClick}>Summer</NavLink>
                    <NavLink to="/category/winter" className={mobileLinkClass} onClick={handleMobileLinkClick}>Winter</NavLink>
                </div>
                {/* Mobile Search */}
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <form onSubmit={handleSearchSubmit} className="relative px-2">
                        <input
                            id="search-mobile"
                            name="search"
                            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-text-secondary focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Search..."
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search products"
                        />
                        <button type="submit" className="absolute inset-y-0 right-0 pr-5 flex items-center text-text-secondary hover:text-primary" aria-label="Submit search">
                            <SearchIcon />
                        </button>
                    </form>
                </div>
            </div>
        )}
      </nav>
    </header>
  );
};

export default Header;