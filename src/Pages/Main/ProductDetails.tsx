import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);

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

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // Hide after 2 seconds
  };

  return (
    <div className="product-detail-page">
      <h1 className="product-title">{product.title}</h1>
      <img
        className="product-image"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="product-description">
        {product.description.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <ul className="product-info-list">
        <li><strong>Category:</strong> {product.category}</li>
        <li><strong>Price:</strong> ${product.price}</li>
        <li><strong>Stock:</strong> {product.stock}</li>
      </ul>
      <button className="add-to-cart-btn" onClick={handleAddToCart} type="button">
        🛒 Add to Cart
      </button>
      {showMessage && (
        <div className="add-to-cart-message">
          Product added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;