
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import type { Product } from '../types';
import Spinner from '../components/Spinner';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Breadcrumbs from '../components/Breadcrumbs';
import QuantityStepper from '../components/QuantityStepper';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductReviews from '../components/ProductReviews';
import RecommendedProducts from '../components/RecommendedProducts';
import { useToast } from '../contexts/ToastContext';

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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const foundProduct = allProducts.find((p) => p.id === productId) || null;
      setProduct(foundProduct);
      setLoading(false);
      window.scrollTo(0, 0); // Scroll to top on product change
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showToast(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    // Show a centered spinner with a minimum height to avoid layout shift
    return (
        <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
            <Spinner />
        </div>
    );
  }

  if (!product) {
    return <div className="text-center text-2xl">Product not found.</div>;
  }
  
  const onWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (onWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const categoryTitle = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: categoryTitle, path: `/category/${product.category}` },
    { label: product.name }
  ];

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <div className="bg-surface p-8 rounded-lg shadow-lg">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <ProductImageGallery imageUrls={product.imageUrls} altText={product.name} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">{product.name}</h1>
            <p className="text-3xl font-semibold text-primary my-4">${product.price.toFixed(2)}</p>
            <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>
            
            <h3 className="text-lg font-bold mb-2 text-text-primary">Details:</h3>
            <ul className="list-disc list-inside space-y-1 text-text-secondary mb-6">
              {product.details.map((detail, index) => <li key={index}>{detail}</li>)}
            </ul>
            
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-bold">Quantity:</label>
              <QuantityStepper
                inputId="quantity"
                quantity={quantity}
                onQuantityChange={setQuantity}
                ariaLabelPrefix="quantity"
              />
            </div>

            <div className="flex space-x-4">
               <button
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center justify-center p-3 border-2 rounded-md transition-colors duration-300 ${onWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-text-secondary hover:border-red-500 hover:text-red-500'}`}
                aria-label={onWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {onWishlist ? <HeartIconSolid /> : <HeartIconOutline />}
              </button>
            </div>
          </div>
        </div>
        
        <ProductReviews initialReviews={product.reviews || []} />
      </div>
      
      <RecommendedProducts currentProduct={product} />
    </div>
  );
};

export default ProductDetailPage;
