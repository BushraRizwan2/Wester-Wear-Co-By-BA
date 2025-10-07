import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';
import ShareModal from '../components/ShareModal';

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);

const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleShare = () => {
    if (wishlist.length === 0) return;
    const ids = wishlist.map(p => p.id).join(',');
    const url = `${window.location.origin}${window.location.pathname}#/wishlist/shared?ids=${ids}`;
    setShareUrl(url);
    setIsShareModalOpen(true);
  };


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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center sm:text-left">My Wishlist</h1>
        <button
          onClick={handleShare}
          className="flex items-center bg-accent text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300"
        >
          <ShareIcon />
          Share Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
       <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={shareUrl}
        title="Share Your Wishlist"
      />
    </div>
  );
};

export default WishlistPage;