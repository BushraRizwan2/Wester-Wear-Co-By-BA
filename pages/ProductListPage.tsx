import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

const getAverageRating = (product: Product): number => {
  if (!product.reviews || product.reviews.length === 0) {
    return 0;
  }
  const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / product.reviews.length;
};

const ProductListPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: 'summer' | 'winter' }>();
  const { products: allProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (categoryName) {
        const filteredProducts = allProducts.filter(
          p => p.category === categoryName
        );
        setProducts(filteredProducts);
        setSortBy('default'); // Reset sort when category changes
      }
      setLoading(false);
    }, 300); // Shorter delay as data is now local

    return () => clearTimeout(timer);
  }, [categoryName, allProducts]);

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...products]; // Create a copy to avoid mutating state
    switch (sortBy) {
      case 'price-asc':
        sortableProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortableProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sortableProducts.sort((a, b) => getAverageRating(b) - getAverageRating(a));
        break;
      default:
        // 'default' case doesn't require sorting
        break;
    }
    return sortableProducts;
  }, [products, sortBy]);

  const title = categoryName ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection` : 'Products';
  const categoryTitle = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Products';
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: categoryTitle }
  ];

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center sm:text-left">{title}</h1>
        <div className="flex items-center space-x-2">
            <label htmlFor="sort-by" className="text-sm font-medium text-text-secondary whitespace-nowrap">Sort by:</label>
            <select
              id="sort-by"
              name="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-surface"
              aria-label="Sort products"
            >
              <option value="default">Default</option>
              <option value="rating-desc">Average Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-text-secondary">No products found in this collection.</p>
      )}
    </div>
  );
};

export default ProductListPage;