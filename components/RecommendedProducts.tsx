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
    const MAX_RECOMMENDATIONS = 4;

    // 1. Find products in the same category, sort by rating similarity
    const sameCategoryProducts = allProducts
      .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
      .map(p => ({
        product: p,
        ratingDiff: Math.abs(getAverageRating(p) - currentProductRating),
      }))
      .sort((a, b) => a.ratingDiff - b.ratingDiff)
      .map(p => p.product);

    let recommendations = sameCategoryProducts.slice(0, MAX_RECOMMENDATIONS);

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

    return recommendations;

  }, [currentProduct, allProducts]);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-24">
      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;