import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../types';
import * as api from '../../../services/api';
import { ProductCard } from '../../../Components/Main_Components/productCard/ProductCard';
import { ThemeContext } from '../../../contexts/ThemeContext';

const PRODUCTS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 500;

export const ProductListPage: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const currentCategory = searchParams.get('category') || '';
    const currentSearchParam = searchParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(currentSearchParam);
    const categories = [
        'smartphones',
        'laptops',
        'fragrances',
        'skincare',
        'groceries',
        'home-decoration',
        'beauty',
        'electronics',
    ];

    useEffect(() => {
        setSearchTerm(currentSearchParam);
    }, [currentSearchParam]);

    const fetchProductsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
            const response = currentSearchParam
                ? await api.searchProducts(currentSearchParam, PRODUCTS_PER_PAGE, skip)
                : await api.getProducts(PRODUCTS_PER_PAGE, skip, currentCategory || undefined);
            let { products: fetched, total } = response;
            if (currentSearchParam && currentCategory) {
                fetched = fetched.filter(p => p.category === currentCategory);
                total = fetched.length;
            }
            setProducts(fetched);
            setTotalProducts(total);
        } catch (err) {
            console.error(err);
            setError('Product not found or API error');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, currentCategory, currentSearchParam]);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== currentSearchParam) {
                const params = new URLSearchParams(searchParams);
                if (searchTerm.trim()) params.set('search', searchTerm.trim());
                else params.delete('search');
                params.set('page', '1');
                setSearchParams(params, { replace: true });
            }
        }, SEARCH_DEBOUNCE_DELAY);
        return () => clearTimeout(timer);
    }, [searchTerm, currentSearchParam, searchParams, setSearchParams]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cat = e.target.value;
        const params = new URLSearchParams(searchParams);
        if (cat) params.set('category', cat);
        else params.delete('category');
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className={`container mx-auto p-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                <div className="flex items-center justify-between mb-6">
                    {/* Mobile: Search Toggle */}
                    <button
                        onClick={() => setShowMobileSearch(prev => !prev)}
                        className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} p-2 rounded-lg md:hidden`}
                    >
                        {showMobileSearch ? (
                            <span className="sr-only">Close search</span>
                        ) : (
                            <span className="sr-only">Open search</span>
                        )}
                        {showMobileSearch ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        )}
                    </button>

                    {/* Desktop: Search + Category */}
                    <div className="hidden md:flex flex-1 items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                        />
                        <select
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            disabled={isLoading}
                            className={`border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Mobile: Search & Category */}
                {showMobileSearch && (
                    <div className="mb-6 md:hidden space-y-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                        />
                        <select
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            disabled={isLoading}
                            className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {isLoading && <p className="text-center">Loading products...</p>}
                {error && <p className="text-center text-red-600">Error: {error}</p>}

                {!isLoading && !error && (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map(p => <ProductCard key={p.id} product={p} />)
                            ) : (
                                <p className="col-span-full text-center">
                                    {currentSearchParam || currentCategory
                                        ? 'No products found matching your criteria.'
                                        : 'No products available.'}
                                </p>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center mt-6 space-x-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage <= 1}
                                    className={`px-4 py-2 rounded-lg disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 text-gray-100 dark:disabled:opacity-30' : 'bg-gray-200 text-gray-900 disabled:opacity-50'}`}
                                >
                                    Previous
                                </button>
                                <span className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage >= totalPages}
                                    className={`px-4 py-2 rounded-lg disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 text-gray-100 dark:disabled:opacity-30' : 'bg-gray-200 text-gray-900 disabled:opacity-50'}`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
