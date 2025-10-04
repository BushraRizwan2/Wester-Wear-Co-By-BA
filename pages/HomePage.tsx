import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const featuredProducts = products.filter(p => ['S001', 'W003', 'S004', 'W002'].includes(p.id));

const HomePage: React.FC = () => {
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

      {/* Categories Section */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold">Shop by Season</h2>
        <p className="mt-2 text-lg text-text-secondary">Find the perfect outfit for any weather.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summer Category */}
          <Link to="/category/summer" className="group relative block rounded-lg overflow-hidden">
             <img src="https://picsum.photos/id/103/800/600" alt="Summer collection" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-4xl font-serif font-bold">Summer Collection</h3>
             </div>
          </Link>
          {/* Winter Category */}
          <Link to="/category/winter" className="group relative block rounded-lg overflow-hidden">
             <img src="https://picsum.photos/id/1048/800/600" alt="Winter collection" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-4xl font-serif font-bold">Winter Collection</h3>
             </div>
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

    </div>
  );
};

export default HomePage;