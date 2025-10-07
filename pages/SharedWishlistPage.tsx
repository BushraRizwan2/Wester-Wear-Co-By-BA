import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const SharedWishlistPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { getProductById } = useProducts();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const idsParam = searchParams.get('ids');
        if (idsParam) {
            const ids = idsParam.split(',');
            const wishlistProducts = ids.map(id => getProductById(id)).filter((p): p is Product => p !== undefined);
            setProducts(wishlistProducts);
        }
        setLoading(false);
    }, [searchParams, getProductById]);

    if (loading) {
        return <Spinner />;
    }

    if (products.length === 0) {
        return (
             <div className="text-center py-20">
                <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Shared Wishlist Not Found</h1>
                <p className="text-lg text-text-secondary mb-8">This wishlist is empty or the link may be invalid.</p>
                 <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Discover Products
                </Link>
            </div>
        );
    }
    
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-8">A Shared Wishlist</h1>
            <p className="text-center text-text-secondary mb-8 -mt-4">Here are some items someone thought you might like. Add them to your own cart or wishlist!</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SharedWishlistPage;