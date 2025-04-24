
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';
import './ProductCard.css'; // Erstelle diese CSS-Datei

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.thumbnail || 'https://via.placeholder.com/150?text=No+Image'}
                    alt={product.title}
                    className="product-card-image"
                />
                <h3 className="product-card-title">{product.title}</h3>
                <p className="product-card-category">{product.category}</p>
                <p className="product-card-price">
                    {product.discountPercentage > 0 ? (
                        <>
              <span className="discounted-price">
                ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
                            <span className="original-price">${product.price.toFixed(2)}</span>
                        </>
                    ) : (
                        `$${product.price.toFixed(2)}`
                    )}
                </p>
                {/* <p>Rating: {product.rating} ⭐</p> */}
            </Link>
            {/* Add to Cart Button direkt hier oder auf Detailseite */}
        </div>
    );
};
