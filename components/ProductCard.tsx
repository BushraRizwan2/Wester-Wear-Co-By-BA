import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';

// Heart Icon SVGs
const HeartIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const HeartIconOutline = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const onWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 bg-surface">
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors duration-300 ${onWishlist ? 'text-red-500 bg-white/70' : 'text-gray-400 hover:text-red-500 bg-white/50 hover:bg-white/90'}`}
        aria-label={onWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {onWishlist ? <HeartIconSolid /> : <HeartIconOutline />}
      </button>
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {product.name}
          </h3>
          <p className="mt-2 text-xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;