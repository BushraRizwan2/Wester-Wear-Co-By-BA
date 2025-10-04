import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { searchResults, searchQuery, performSearch } = useSearch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Run search if the URL query is present and doesn't match the one in context
        // This handles direct navigation, refreshes, and back/forward actions
        if (query && query !== searchQuery) {
            setLoading(true);
            // Simulate a brief loading period for better UX, even with client-side search
            const timer = setTimeout(() => {
                performSearch(query);
                setLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [query, searchQuery, performSearch]);

    if (loading) {
        return <Spinner />;
    }
    
    // Use the context's searchQuery for display, as it's the "source of truth" for the current results
    const displayQuery = searchQuery || query;

    return (
        <div>
            {displayQuery ? (
                <>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-8 text-center">
                        Search Results for: <span className="text-primary">"{displayQuery}"</span>
                    </h1>
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {searchResults.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg text-text-secondary py-16">
                            No products found matching your search. Try a different term.
                        </p>
                    )}
                </>
            ) : (
                 <p className="text-center text-lg text-text-secondary py-16">
                    Please enter a term in the search bar to find products.
                </p>
            )}
        </div>
    );
};

export default SearchResultsPage;