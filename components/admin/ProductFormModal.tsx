import React, { useState, useEffect, useRef } from 'react';
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
  imageUrls: [],
  category: 'clothing' as 'clothing' | 'fragrance' | 'jewelry' | 'accessories',
  stock: '0',
};

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, product }) => {
  const { addProduct, updateProduct } = useProducts();
  const { showToast } = useToast();
  const [formState, setFormState] = useState(initialFormState);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormState({
        name: product.name,
        price: String(product.price),
        description: product.description,
        details: product.details.length > 0 ? product.details : [''],
        imageUrls: product.imageUrls,
        category: product.category,
        stock: String(product.stock),
      });
    } else {
      setFormState(initialFormState);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...formState.details];
    newDetails[index] = value;
    setFormState(prev => ({ ...prev, details: newDetails }));
  };

  const addDetailItem = () => {
    setFormState(prev => ({ ...prev, details: [...prev.details, ''] }));
  };

  const removeDetailItem = (index: number) => {
    const newDetails = formState.details.filter((_, i) => i !== index);
    setFormState(prev => ({ ...prev, details: newDetails }));
  };

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    const filePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => reader.result ? resolve(reader.result as string) : reject();
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    Promise.all(filePromises).then(base64Urls => {
        setFormState(prev => ({
            ...prev,
            imageUrls: [...prev.imageUrls, ...base64Urls]
        }));
    }).catch(error => {
        console.error("Error reading files:", error);
        showToast("There was an error uploading an image.", "error");
    });
  };

  const handleDragEvents = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
  };
  
  const handleDragEnter = (e: React.DragEvent) => {
      handleDragEvents(e);
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setIsDragging(true);
      }
  };

  const handleDragLeave = (e: React.DragEvent) => {
      handleDragEvents(e);
      setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
      handleDragEvents(e);
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFiles(e.dataTransfer.files);
          e.dataTransfer.clearData();
      }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        handleFiles(e.target.files);
        e.target.value = ''; // Reset file input
    }
  };
  
  const removeImage = (index: number) => {
    setFormState(prev => ({
        ...prev,
        imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formState,
      price: parseFloat(formState.price),
      stock: parseInt(formState.stock, 10),
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
                <input type="number" name="price" id="price" step="0.01" value={formState.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                    <select name="category" id="category" value={formState.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                        <option value="clothing">Clothing</option>
                        <option value="fragrance">Fragrance</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="stock" className="block text-sm font-medium">Stock Quantity</label>
                    <input type="number" name="stock" id="stock" value={formState.stock} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
                </div>
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea name="description" id="description" value={formState.description} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" required />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Details</label>
              {formState.details.map((detail, index) => (
                <div key={index} className="flex items-center mt-1">
                  <input type="text" value={detail} onChange={(e) => handleDetailChange(index, e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm p-2" />
                  <button type="button" onClick={() => removeDetailItem(index)} className="ml-2 text-red-500 p-1 font-bold text-lg">&times;</button>
                </div>
              ))}
              <button type="button" onClick={addDetailItem} className="mt-2 text-sm text-accent font-semibold">+ Add Detail</button>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium">Images</label>
              <div 
                  className={`mt-1 border-2 border-dashed rounded-md p-4 text-center transition-colors duration-200 ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'}`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEvents}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
              >
                  <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/png, image/jpeg, image/gif"
                      className="hidden"
                      onChange={onFileSelect}
                  />
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {formState.imageUrls.map((url, index) => (
                          <div key={index} className="relative group aspect-square">
                              <img src={url} alt={`Product image ${index + 1}`} className="w-full h-full object-cover rounded-md border" />
                              <button 
                                  type="button" 
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-label={`Remove image ${index + 1}`}
                              >
                                  &times;
                              </button>
                          </div>
                      ))}
                      <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center w-full h-full aspect-square rounded-md border-2 border-dashed border-gray-300 hover:border-primary text-gray-400 hover:text-primary transition-colors"
                          aria-label="Add new images"
                      >
                        <UploadIcon />
                        <span className="text-xs mt-1">Add Images</span>
                      </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">or drag and drop files here</p>
              </div>
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
