import './home.css';

import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../../services/api';
import './home.css';
import { ProductCard } from '../../../Components/Main_Components/productCard/ProductCard';
import { Product } from '../../../types';

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
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [categoryPreviews, setCategoryPreviews] = useState<Record<string, Product[]>>({});
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Fetch featured and preview products
    useEffect(() => {
        api.getProducts(FEATURED_COUNT, 0)
            .then(({ products }) => setFeaturedProducts(products))
            .catch(console.error);

        CATEGORIES.slice(0, 3).forEach(cat => {
            api.getProducts(PREVIEW_COUNT, 0, cat)
                .then(({ products }) => setCategoryPreviews(prev => ({ ...prev, [cat]: products })))
                .catch(console.error);
        });
    }, []);

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const scroll = (cat: string, dir: 'left' | 'right') => {
        const slider = sliderRefs.current[cat];
        if (!slider) return;
        slider.scrollBy({ left: dir === 'right' ? slider.clientWidth : -slider.clientWidth, behavior: 'smooth' });
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to MyShop</h1>
                    <p>Your one-stop shop for the best deals and latest trends.</p>
                    <Link to="/products" className="btn-cta">Shop Now</Link>
                </div>
            </section>

            {/* Category Sliders (first 3) */}
            {CATEGORIES.slice(0, 3).map(cat => (
                <section key={cat} className="category-preview">
                    <h2 className="section-title">{capitalize(cat)}</h2>
                    <div className="slider-container">
                        <button className="slider-btn left" onClick={() => scroll(cat, 'left')}>‹</button>
                        <div className="slider" ref={el => { sliderRefs.current[cat] = el; }}>
                            {categoryPreviews[cat]?.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {/* View All Card at end */}
                            <Link to={`/products?category=${cat}`} className="view-all-card">
                                <div className="view-all-inner">View All</div>
                            </Link>
                        </div>
                        <button className="slider-btn right" onClick={() => scroll(cat, 'right')}>›</button>
                    </div>
                </section>
            ))}

            {/* Featured Products */}
            <section className="featured-products">
                <h2 className="section-title">Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <footer className="home-footer">
                <p>© {new Date().getFullYear()} MyShop</p>
            </footer>
        </div>
    );
};

export default Home;
;