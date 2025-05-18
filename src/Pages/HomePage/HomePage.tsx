// src/pages/HomePage/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api.ts';
import { Product } from '../../types';
import { ProductCard } from '../../Components/Main_Components/productCard/ProductCard.tsx';
import './HomePage.css';

const FEATURED_COUNT = 8;
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

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { products } = await api.getProducts(FEATURED_COUNT, 0);
                setFeaturedProducts(products);
            } catch (err) {
                console.error('Error fetching featured products', err);
            }
        };
        fetchFeatured();
    }, []);

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="homepage">
        <header className="homepage-header">
        <div className="logo">
        <Link to="/">MyShop</Link>
            </div>
            <nav className="main-nav">
    <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        </nav>
        </header>

        <section className="hero">
    <div className="hero-content">
        <h1>Welcome to MyShop</h1>
    <p>Your one-stop shop for the best deals and latest trends.</p>
    <Link to="/products" className="btn-cta">Shop Now</Link>
    </div>
    </section>

    <section className="categories">
        <h2>Explore Categories</h2>
    <div className="category-list">
        {CATEGORIES.map(cat => (
                <Link key={cat} to={`/products?category=${cat}`} className="category-card">
        <span>{capitalize(cat)}</span>
        </Link>
))}
    </div>
    </section>

    <section className="featured-products">
        <h2>Featured Products</h2>
    <div className="product-grid">
        {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
))}
    </div>
    </section>

    <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
    </footer>
    </div>
);
};

export default HomePage;
