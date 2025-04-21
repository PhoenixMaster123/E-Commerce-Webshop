
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import * as api from '../../services/api';
import { ProductCard } from '../../Components/productCard/ProductCard';
//import { LoadingSpinner } from '../components/LoadingSpinner';
//import { ErrorMessage } from '../components/ErrorMessage';
import './ProductListPage.css';

const PRODUCTS_PER_PAGE = 12;

export const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const currentCategory = searchParams.get('category') || '';
    const currentSearchParam = searchParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(currentSearchParam);

    // Dummy-Kategorien
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

    // Sync URL -> Input
    useEffect(() => {
        setSearchTerm(currentSearchParam);
    }, [currentSearchParam]);

    const fetchProductsData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
            let response;

            if (currentSearchParam) {
                // Suche über API
                response = await api.searchProducts(currentSearchParam, PRODUCTS_PER_PAGE, skip);
            } else {
                // Standard-Katalog
                response = await api.getProducts(PRODUCTS_PER_PAGE, skip, currentCategory || undefined);
            }

            // Produkte aus der Antwort
            let fetched = response.products;
            let total = response.total;

            // Wenn Suchbegriff UND Kategorie gewählt, filtere zusätzlich client-side
            if (currentSearchParam && currentCategory) {
                fetched = fetched.filter(p => p.category === currentCategory);
                total = fetched.length;
            }

            setProducts(fetched);
            setTotalProducts(total);
        } catch (err) {
            console.error(err);
            setError('Produkte konnten nicht geladen werden.');
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, currentCategory, currentSearchParam]);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cat = e.target.value;
        if (cat) searchParams.set('category', cat);
        else searchParams.delete('category');
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const applySearch = () => {
        if (searchTerm.trim()) {
            searchParams.set('search', searchTerm.trim());
        } else {
            searchParams.delete('search');
        }
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div className="product-list-page">
            <h1>Produkte</h1>

            <div className="filters">
                <label htmlFor="search-input">Suche:</label>
                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Produkt suchen…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button
                    className="search-button"
                    onClick={applySearch}
                    disabled={isLoading}
                >
                    Los
                </button>

                <label htmlFor="category-select">Kategorie:</label>
                <select
                    id="category-select"
                    value={currentCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="">Alle anzeigen</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>



            {!isLoading && !error && (
                <>
                    <div className="product-grid">
                        {products.length > 0 ? (
                            products.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (
                            <p>Keine Produkte gefunden.</p>
                        )}
                    </div>

                    {totalProducts > PRODUCTS_PER_PAGE && (
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
