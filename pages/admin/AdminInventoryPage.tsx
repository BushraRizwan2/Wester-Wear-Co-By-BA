import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../types';
import StockUpdateModal from '../../components/admin/StockUpdateModal';

const getStatus = (stock: number) => {
  if (stock === 0) {
    return { text: 'Out of Stock', className: 'bg-red-100 text-red-800' };
  }
  if (stock < 10) {
    return { text: 'Low Stock', className: 'bg-yellow-100 text-yellow-800' };
  }
  return { text: 'In Stock', className: 'bg-green-100 text-green-800' };
};

const AdminInventoryPage: React.FC = () => {
  const { products } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-text-primary">Inventory Management</h1>
      </div>

      <div className="bg-surface rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-text-secondary">
          <thead className="text-xs text-text-primary uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Stock Quantity</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const status = getStatus(product.stock);
              return (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                    {product.name}
                  </th>
                  <td className="px-6 py-4 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.className}`}>
                      {status.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="font-medium text-accent hover:underline"
                    >
                      Update Stock
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center p-8">No products found.</p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <StockUpdateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminInventoryPage;