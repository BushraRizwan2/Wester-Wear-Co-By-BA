import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuickView } from '../contexts/QuickViewContext';
import ProductImageGallery from './ProductImageGallery';
import QuantityStepper from './QuantityStepper';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const QuickViewModal: React.FC = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Reset quantity when modal opens for a new product
    if (isQuickViewOpen) {
      setQuantity(1);
    }
  }, [isQuickViewOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeQuickView]);

  const handleAddToCart = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, quantity);
      showToast(`${quickViewProduct.name} added to cart!`);
      closeQuickView();
    }
  };

  const product = quickViewProduct;
  if (!product) {
    return null; // Don't render if there's no product, even during closing animation
  }

  return (
    <div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${isQuickViewOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="quick-view-title"
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60" 
        onClick={closeQuickView}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div className={`relative bg-surface rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col transition-transform duration-300 ease-in-out ${isQuickViewOpen ? 'scale-100' : 'scale-95'}`}>
         <button 
            onClick={closeQuickView} 
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary z-20"
            aria-label="Close quick view"
        >
            <CloseIcon />
        </button>

        <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div>
                <ProductImageGallery imageUrls={product.imageUrls} altText={product.name} />
            </div>
            <div className="flex flex-col">
                <h1 id="quick-view-title" className="text-3xl sm:text-4xl font-serif font-bold text-text-primary">{product.name}</h1>
                <p className="text-3xl font-semibold text-primary my-4">${product.price.toFixed(2)}</p>
                <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>
                
                <div className="mt-auto pt-6 space-y-6">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="quick-view-quantity" className="font-bold">Quantity:</label>
                        <QuantityStepper
                            inputId="quick-view-quantity"
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            ariaLabelPrefix={`quantity for ${product.name}`}
                        />
                    </div>
                    
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                    
                    <Link 
                        to={`/product/${product.id}`} 
                        onClick={closeQuickView}
                        className="block text-center text-accent hover:underline font-semibold"
                    >
                        View Full Details &rarr;
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;