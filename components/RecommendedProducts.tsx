import React, { useMemo } from 'react';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../types';
import ProductCard from './ProductCard';

const getAverageRating = (product: Product): number => {
  if (!product.reviews || product.reviews.length === 0) {
    return 0;
  }
  const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / product.reviews.length;
};

interface RecommendedProductsProps {
  currentProduct: Product;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ currentProduct }) => {
  const { products: allProducts } = useProducts();

  const recommendedProducts = useMemo(() => {
    const currentProductRating = getAverageRating(currentProduct);
    const MAX_RECOMMENDATIONS = 8; // Increase for a scrollable list

    // 1. Find products in the same category, sort by rating similarity
    const sameCategoryProducts = allProducts
      .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
      .map(p => ({
        product: p,
        ratingDiff: Math.abs(getAverageRating(p) - currentProductRating),
      }))
      .sort((a, b) => a.ratingDiff - b.ratingDiff)
      .map(p => p.product);

    let recommendations = sameCategoryProducts;

    // 2. Fallback if not enough recommendations from the same category
    if (recommendations.length < MAX_RECOMMENDATIONS) {
      const existingIds = new Set([currentProduct.id, ...recommendations.map(p => p.id)]);
      
      const otherProducts = allProducts
        .filter(p => !existingIds.has(p.id))
        // Basic shuffle to add variety to fallback products
        .sort(() => 0.5 - Math.random());
      
      const needed = MAX_RECOMMENDATIONS - recommendations.length;
      recommendations.push(...otherProducts.slice(0, needed));
    }

    return recommendations.slice(0, MAX_RECOMMENDATIONS);

  }, [currentProduct, allProducts]);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-24">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8">Complete The Look</h2>
      <div className="custom-scrollbar -mx-2 sm:-mx-4 lg:-mx-6 px-2 sm:px-4 lg:px-6">
        <div className="flex space-x-6 overflow-x-auto py-4">
            {recommendedProducts.map(product => (
              <div key={product.id} className="w-64 sm:w-72 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;