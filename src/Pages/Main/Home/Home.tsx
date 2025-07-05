import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../services/api';
import { ProductCard } from '../../../Components/Main_Components/productCard/ProductCard';
import { Product } from '../../../types';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './home.css';

const FEATURED_COUNT = 8;
const PREVIEW_COUNT = 8;
const CATEGORIES = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'beauty',
    'electronics',
];

const Home: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [categoryPreviews, setCategoryPreviews] = useState<Record<string, Product[]>>({});
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        api.getProducts(FEATURED_COUNT, 0)
            .then(({ products }) => setFeaturedProducts(products))
            .catch(console.error);

        CATEGORIES.slice(0, 3).forEach(cat => {
            api.getProducts(PREVIEW_COUNT, 0, cat)
                .then(({ products }) =>
                    setCategoryPreviews(prev => ({ ...prev, [cat]: products }))
                )
                .catch(console.error);
        });
    }, []);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const scroll = (cat: string, dir: 'left' | 'right') => {
        const slider = sliderRefs.current[cat];
        if (!slider) return;
        slider.scrollBy({
            left: dir === 'right' ? slider.clientWidth : -slider.clientWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`min-h-screen p-0 m-0 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            {/* Hero Section */}
            <section className="relative h-64 md:h-96 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Welcome to MyShop</h1>
                    <p className="text-lg md:text-2xl text-white mb-6">
                        Your one-stop shop for the best deals and latest trends.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-white text-blue-600 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            <div className="container mx-auto p-4 space-y-12">
                {/* Category Sliders */}
                {CATEGORIES.slice(0, 3).map(cat => (
                    <section key={cat}>
                        <h2 className="text-2xl font-semibold mb-4 capitalize">{capitalize(cat)}</h2>
                        <div className="relative">
                            <button
                                onClick={() => scroll(cat, 'left')}
                                className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                                ‹
                            </button>
                            <div
                                className="flex overflow-x-auto hide-scrollbar space-x-4 scroll-pl-4 pb-2"
                                ref={el => { sliderRefs.current[cat] = el; }}
                            >
                                {categoryPreviews[cat]?.map(product => (
                                    <div key={product.id} className="flex-shrink-0 w-40">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                                <Link to={`/products?category=${cat}`} className="flex-shrink-0 w-40">
                                    <div className={`h-full flex items-center justify-center rounded-2xl shadow ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                        <span className="font-semibold">View All</span>
                                    </div>
                                </Link>
                            </div>
                            <button
                                onClick={() => scroll(cat, 'right')}
                                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                                ›
                            </button>
                        </div>
                    </section>
                ))}

                {/* Featured Products */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>

            <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-6`}>
                <p className="text-center text-sm">© {new Date().getFullYear()} MyShop</p>
            </footer>
        </div>
    );
};

export default Home;
