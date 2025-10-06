import React, { useState } from 'react';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';
import { useToast } from '../../contexts/ToastContext';

interface StockUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const StockUpdateModal: React.FC<StockUpdateModalProps> = ({ isOpen, onClose, product }) => {
  const { updateProduct } = useProducts();
  const { showToast } = useToast();
  const [stock, setStock] = useState(product.stock);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct({ ...product, stock });
    showToast(`${product.name} stock updated to ${stock}.`, 'success');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-serif font-bold mb-2">Update Stock</h2>
            <p className="mb-4 text-text-secondary">
              Product: <span className="font-semibold text-text-primary">{product.name}</span>
            </p>
            
            <div>
              <label htmlFor="stock" className="block text-sm font-medium">New Stock Quantity</label>
              <input 
                type="number" 
                name="stock" 
                id="stock" 
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                required 
              />
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockUpdateModal;