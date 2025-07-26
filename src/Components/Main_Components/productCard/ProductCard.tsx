import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';
import { ThemeContext } from '../../../contexts/ThemeContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const originalPrice = product.price.toFixed(2);

    return (
        <Link
            to={`/products/${product.id}`}
            className={`block rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden 
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
            <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                    src={product.thumbnail || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.title || 'Product Image'}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-40">
                <div>
                    <h3 className={`text-lg font-semibold truncate ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {product.title}
                    </h3>
                    <p className={`mt-1 text-sm capitalize ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {product.category}
                    </p>
                </div>
                <div className="mt-4">
                    {product.discountPercentage > 0 ? (
                        <div className="flex items-baseline space-x-2">
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                ${discountedPrice}
                            </span>
                            <span className={`text-sm line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                ${originalPrice}
                            </span>
                        </div>
                    ) : (
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            ${originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
