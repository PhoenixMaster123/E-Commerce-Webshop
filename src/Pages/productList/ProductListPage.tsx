import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import * as api from '../../services/api';
import { ProductCard } from '../../Components/productCard/ProductCard';
//import { LoadingSpinner } from '../components/LoadingSpinner';
//import { ErrorMessage } from '../components/ErrorMessage';
import './ProductListPage.css';

const PRODUCTS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 500; // time search

export const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const currentCategory = searchParams.get('category') || '';
    const currentSearchParam = searchParams.get('search') || '';

    // get the input field
    const [searchTerm, setSearchTerm] = useState(currentSearchParam);


    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        setCategories([
            'smartphones',
            'laptops',
            'fragrances',
            'skincare',
            'groceries',
            'home-decoration',
            'beauty',
            'electronics',
        ]);
    }, []);


    useEffect(() => {
        setSearchTerm(currentSearchParam);
    }, [currentSearchParam]);

    const fetchProductsData = useCallback(async () => {

        setIsLoading(true);
        setError(null);

        try {
            const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
            let response;
            const searchFromUrl = searchParams.get('search') || ''; // Lese den tatsächlichen Suchbegriff aus der URL

            if (searchFromUrl) {

                response = await api.searchProducts(searchFromUrl, PRODUCTS_PER_PAGE, skip);
            } else {

                response = await api.getProducts(PRODUCTS_PER_PAGE, skip, currentCategory || undefined);
            }

            let fetched = response.products;
            let total = response.total;


            if (searchFromUrl && currentCategory) {
                fetched = fetched.filter(p => p.category === currentCategory);
                total = fetched.length;
            }

            setProducts(fetched);
            setTotalProducts(total);
        } catch (err) {
            console.error(err);
            setError('Product not found or API error');
        } finally {
            setIsLoading(false); // Ladevorgang beendet
        }
    }, [currentPage, currentCategory, searchParams, setSearchParams]);


    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);


    useEffect(() => {

        const debounceTimer = setTimeout(() => {

            // Compare the search with current url
            if (searchTerm !== currentSearchParam) {
                // Aktualisiere die URL-Parameter
                const newSearchParams = new URLSearchParams(searchParams);
                if (searchTerm.trim()) {
                    newSearchParams.set('search', searchTerm.trim());
                } else {
                    newSearchParams.delete('search');
                }
                newSearchParams.set('page', '1')
                setSearchParams(newSearchParams, { replace: true });
            }
        }, SEARCH_DEBOUNCE_DELAY);


        return () => {
            clearTimeout(debounceTimer);
        };

    }, [searchTerm, currentSearchParam, searchParams, setSearchParams]);



    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cat = e.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        if (cat) {
            newSearchParams.set('category', cat);
        } else {
            newSearchParams.delete('category');
        }
        newSearchParams.set('page', '1');
        setSearchParams(newSearchParams);
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };



    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div className="product-list-page">

            <div className="filters">

                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Product search…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />


                <label htmlFor="category-select">Category:</label>
                <select
                    id="category-select"
                    value={currentCategory}
                    onChange={handleCategoryChange}
                    disabled={isLoading}
                >
                    <option value="">Show all</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>


            {isLoading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {!isLoading && !error && (
                <>
                    <div className="product-grid">
                        {products.length > 0 ? (
                            products.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (

                            <p>
                                {currentSearchParam || currentCategory
                                    ? 'No products found matching your criteria.'
                                    : 'No products available.'}
                            </p>
                        )}
                    </div>

                    {totalProducts > PRODUCTS_PER_PAGE && totalPages > 1 && ( // show only wwhen more the one page
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                Zurück
                            </button>
                            <span>
                                Seite {currentPage} von {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                Weiter
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};