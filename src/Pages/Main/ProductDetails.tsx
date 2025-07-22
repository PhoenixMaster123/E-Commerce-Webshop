import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id!);
        setProduct(data);
      } catch (err) {
        setError('Product not found or API error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-10">No product found.</div>;

  // Now we know product is not null!
  const discountedPrice = (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);
  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 mb-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-gray-700">{product.category}</span>
            {product.brand && (
              <span className="text-gray-400 text-md">by {product.brand}</span>
            )}
          </div>
          {/* Placeholder for shop logo */}
      
        </div>
        {/* IMAGE CAROUSEL SECTION */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-4 space-x-4">
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
              onClick={() => setCurrentIdx((idx) => Math.max(0, idx - 1))}
              disabled={currentIdx === 0}
              aria-label="Previous"
            >
              &#8592;
            </button>
            <img
              src={images[currentIdx]}
              alt={product.title}
              className="w-72 h-72 object-cover rounded-xl shadow-md"
            />
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
        <div className="flex items-center mb-2">
          {/* Example: show rating and reviews */}
          <span className="flex items-center text-yellow-500">
            {'★'.repeat(Math.round(product.rating || 0))}
            <span className="ml-2 text-gray-600 text-sm">({product.reviews?.length ?? 0} reviews)</span>
          </span>
        </div>
        <p className="mb-4 text-gray-700">{product.description}</p>
        {/* Price Section */}
        <div className="flex items-baseline mb-4 space-x-3">
          <span className="text-2xl font-bold text-blue-700">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-lg line-through text-gray-400">${product.price.toFixed(2)}</span>
              <span className="text-green-600 font-semibold">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>
        {/* Quantity Selector */}
        <div className="flex items-center mb-4">
          <label className="font-medium mr-4">Quantity:</label>
          <button
            className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            type="button"
          >-</button>
          <input
            className="w-12 text-center border-t border-b border-gray-200"
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
          />
          <button
            className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 transition"
            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
            type="button"
          >+</button>
          <span className="ml-3 text-sm text-gray-500">({product.stock} in stock)</span>
        </div>
        {/* Add to Cart Button */}
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
          <span>🚚 Free shipping for orders over $39.99</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;