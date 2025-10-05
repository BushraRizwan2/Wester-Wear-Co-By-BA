import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import StarRatingDisplay from '../components/StarRatingDisplay';
import type { Review } from '../types';

const QualityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944L12 22l9-1.056v-9.447z" />
    </svg>
);
const StyleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);
const ArtisanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);


const HomePage: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => ['S001', 'W003', 'S004', 'W002'].includes(p.id));
  const newArrivals = products.slice(0, 4);
  const testimonialReviews = [
      { product: products.find(p => p.id === 'W003'), review: products.find(p => p.id === 'W003')?.reviews?.[0] },
      { product: products.find(p => p.id === 'S001'), review: products.find(p => p.id === 'S001')?.reviews?.[0] },
  ].filter(item => item.product && item.review);


  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden h-[60vh] flex items-center justify-center text-center p-6 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/id/1015/1920/1080')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight">Timeless Western Style</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">Discover curated collections that blend classic heritage with modern sensibilities.</p>
          <Link to="/category/summer" className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
            Shop The Collections
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">Featured Finds</h2>
        <p className="mt-2 text-lg text-text-secondary">A curated selection of our most popular and iconic pieces.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">Shop by Season</h2>
        <p className="mt-2 text-lg text-text-secondary">Find the perfect outfit for any weather.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/category/summer" className="group relative block rounded-lg overflow-hidden">
             <img src="https://picsum.photos/id/103/800/600" alt="Summer collection" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-4xl font-serif font-bold">Summer Collection</h3>
             </div>
          </Link>
          <Link to="/category/winter" className="group relative block rounded-lg overflow-hidden">
             <img src="https://picsum.photos/id/1048/800/600" alt="Winter collection" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-4xl font-serif font-bold">Winter Collection</h3>
             </div>
          </Link>
        </div>
      </div>
      
      {/* New Arrivals Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">New Arrivals</h2>
        <p className="mt-2 text-lg text-text-secondary">Check out the latest additions to our collection.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
       {/* Why Shop With Us Section */}
      <div className="text-center bg-surface py-16 rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">The Western Wear Difference</h2>
        <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">Crafted with care, designed for life's adventures.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 px-8">
            <div className="flex flex-col items-center">
                <QualityIcon />
                <h3 className="mt-4 text-xl font-semibold text-text-primary">Quality Craftsmanship</h3>
                <p className="mt-2 text-text-secondary">Durable materials and attention to detail ensure our pieces stand the test of time.</p>
            </div>
            <div className="flex flex-col items-center">
                <StyleIcon />
                <h3 className="mt-4 text-xl font-semibold text-text-primary">Timeless Style</h3>
                <p className="mt-2 text-text-secondary">We blend classic Western heritage with modern sensibilities for a look that's always in fashion.</p>
            </div>
             <div className="flex flex-col items-center">
                <ArtisanIcon />
                <h3 className="mt-4 text-xl font-semibold text-text-primary">Artisan Crafted</h3>
                <p className="mt-2 text-text-secondary">Many of our unique pieces are handcrafted by skilled artisans across the country.</p>
            </div>
        </div>
      </div>

       {/* Testimonials Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">What Our Customers Say</h2>
        <p className="mt-2 text-lg text-text-secondary">We're proud to have happy customers. Here's what they think.</p>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonialReviews.map(({ product, review }) => (
                <div key={review!.id} className="bg-surface p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                    <img src={product!.imageUrls[0]} alt={product!.name} className="w-24 h-24 rounded-full object-cover -mt-20 border-4 border-surface" />
                    <p className="mt-6 text-text-secondary italic">"{review!.comment}"</p>
                    <div className="mt-4">
                        <StarRatingDisplay rating={review!.rating} />
                        <p className="font-bold text-text-primary mt-2">- {review!.author}</p>
                        <p className="text-sm text-text-secondary">on the <Link to={`/product/${product!.id}`} className="text-primary hover:underline">{product!.name}</Link></p>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;