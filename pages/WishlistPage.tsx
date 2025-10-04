import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-lg text-text-secondary mb-8">Looks like you haven't added any items to your wishlist yet.</p>
        <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;