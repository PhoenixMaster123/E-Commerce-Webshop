import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const originalPrice = product.price.toFixed(2);

    return (
        <Link
            to={`/products/${product.id}`}
            className="block bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
            <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                    src={product.thumbnail || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.title}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-40">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {product.category}
                    </p>
                </div>
                <div className="mt-4">
                    {product.discountPercentage > 0 ? (
                        <div className="flex items-baseline space-x-2">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                ${discountedPrice}
              </span>
                            <span className="text-sm line-through text-gray-500 dark:text-gray-500">
                ${originalPrice}
              </span>
                        </div>
                    ) : (
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${originalPrice}
            </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;