import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useProducts } from '../../contexts/ProductContext';
import { useToast } from '../../contexts/ToastContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const initialFormState = {
  name: '',
  price: '',
  description: '',
  details: [''],
  imageUrls: [''],
  category: 'summer' as 'summer' | 'winter',
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, product }) => {
  const { addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (product) {
      setFormState({
        name: product.name,
        price: String(product.price),
        description: product.description,
        details: product.details,
        imageUrls: product.imageUrls,
        category: product.category,
      });
    } else {
      setFormState(initialFormState);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, value: string, field: 'details' | 'imageUrls') => {
    const newArray = [...formState[field]];
    newArray[index] = value;
    setFormState(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'details' | 'imageUrls') => {
    setFormState(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index: number, field: 'details' | 'imageUrls') => {
    if (formState[field].length > 1) {
        const newArray = formState[field].filter((_, i) => i !== index);
        setFormState(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formState,
      price: parseFloat(formState.price),
      details: formState.details.filter(d => d.trim() !== ''),
      imageUrls: formState.imageUrls.filter(u => u.trim() !== ''),
    };

    if (product) {
      updateProduct({ ...product, ...productData });
      showToast('Product updated successfully!', 'success');
    } else {
      addProduct(productData);
      showToast('Product added successfully!', 'success');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-10" role="dialog" aria-modal="true">
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <input type="number" name="price" id="price" value={formState.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
              </div>
            </div>

            <div className="mt-4">
                <label htmlFor="category" className="block text-sm font-medium">Category</label>
                <select name="category" id="category" value={formState.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                </select>
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea name="description" id="description" value={formState.description} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Details</label>
              {formState.details.map((detail, index) => (
                <div key={index} className="flex items-center mt-1">
                  <input type="text" value={detail} onChange={(e) => handleArrayChange(index, e.target.value, 'details')} className="block w-full rounded-md border-gray-300 shadow-sm p-2" />
                  <button type="button" onClick={() => removeArrayItem(index, 'details')} className="ml-2 text-red-500 p-1">&times;</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('details')} className="mt-2 text-sm text-accent font-semibold">+ Add Detail</button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Image URLs</label>
              {formState.imageUrls.map((url, index) => (
                <div key={index} className="flex items-center mt-1">
                  <input type="text" value={url} onChange={(e) => handleArrayChange(index, e.target.value, 'imageUrls')} className="block w-full rounded-md border-gray-300 shadow-sm p-2" />
                   <button type="button" onClick={() => removeArrayItem(index, 'imageUrls')} className="ml-2 text-red-500 p-1">&times;</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('imageUrls')} className="mt-2 text-sm text-accent font-semibold">+ Add Image URL</button>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;