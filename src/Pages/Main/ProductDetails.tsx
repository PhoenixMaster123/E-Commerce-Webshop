import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
      } catch (err: unknown) {
        let errorMessage = "An unexpected error occurred while fetching product data.";
        if (err instanceof Error) errorMessage = err.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-10">No product found.</div>;

  const discountedPrice = (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);
  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
      <div className={`max-w-xl mx-auto mt-10 mb-12 px-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-lg">{product.category}</span>
              {product.brand && (
                  <span className="text-gray-400 text-md">by {product.brand}</span>
              )}
            </div>
          </div>

          {/* IMAGE CAROUSEL SECTION */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4 space-x-4">
              <button
                  className={`p-2 rounded-full transition disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setCurrentIdx((idx) => Math.max(0, idx - 1))}
                  disabled={currentIdx === 0}
                  aria-label="Previous"
              >
                &#8592;
              </button>
              <div className={`w-72 h-72 flex items-center justify-center rounded-xl shadow-md overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <img
                    src={images[currentIdx]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                />
              </div>
              <button
                  className={`p-2 rounded-full transition disabled:opacity-50 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setCurrentIdx((idx) => Math.min(images.length - 1, idx + 1))}
                  disabled={currentIdx === images.length - 1}
                  aria-label="Next"
              >
                &#8594;
              </button>
            </div>
            <div className="text-sm text-gray-500 text-center mb-2">
              {currentIdx + 1} / {images.length}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-2">
          <span className="flex items-center text-yellow-500">
            {'★'.repeat(Math.round(product.rating || 0))}
            <span className="ml-2 text-sm text-gray-400">
              ({product.reviews?.length ?? 0} reviews)
            </span>
          </span>
          </div>

          <p className="mb-4 text-gray-400">{product.description}</p>

          {/* Price Section */}
          <div className="flex items-baseline mb-4 space-x-3">
            <span className="text-2xl font-bold text-blue-500">${discountedPrice}</span>
            {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg line-through text-gray-400">${product.price.toFixed(2)}</span>
                  <span className="text-green-500 font-semibold">{product.discountPercentage}% OFF</span>
                </>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <label className="font-medium mr-4">Quantity:</label>
            <button
                className={`px-3 py-1 rounded-l transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                type="button"
            >-</button>
            <input
                className={`w-12 text-center border-t border-b ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200'}`}
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
            />
            <button
                className={`px-3 py-1 rounded-r transition ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                type="button"
            >+</button>
            <span className="ml-3 text-sm text-gray-500">({product.stock} in stock)</span>
          </div>

          <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition mb-3"
              onClick={handleAddToCart}
              type="button"
          >
            🛒 Add to Cart
          </button>

          {showMessage && (
              <div className="w-full text-center py-2 rounded bg-green-100 text-green-700 mb-2">
                Product added to cart!
              </div>
          )}

          {/* Shipping Info */}
          <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
            🚚 Free shipping for orders over $39.99
          </div>
        </div>
      </div>
  );
};

export default ProductDetailPage;
