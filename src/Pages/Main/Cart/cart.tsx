import { useEffect, useState } from 'react';
import { getMyCart } from '../../../services/api';
import { Cart } from '../../../types';
import './cart.css';

const CartPage = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getMyCart();
                setCart(cartData);
            } catch (error) {
                console.error('Failed to load cart:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, []);

    const hasItems = cart && cart.products && cart.products.length > 0;
    const total = hasItems ? cart.discountedTotal : 0;
    const estimatedTotal = total.toFixed(2);

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 My Cart</h2>

            <div className="cart-content">
                <div className="cart-left">
                    {isLoading ? (
                        <p>Loading cart...</p>
                    ) : hasItems ? (
                        cart.products.map((product) => (
                            <div key={product.id} className="cart-item">
                                <img src={product.thumbnail} alt={product.title} className="cart-thumbnail" />
                                <div className="cart-details">
                                    <h4>{product.title}</h4>
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Price: €{product.price.toFixed(2)}</p>
                                    <p>Total: €{product.total.toFixed(2)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="empty-cart">Your cart is empty.</p>
                    )}
                </div>

                <div className="cart-summary">
                    <div className="summary-box">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>€{hasItems ? cart.total.toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>TBD</span>
                        </div>
                        <div className="summary-row">
                            <span>Discount:</span>
                            <span>€{hasItems ? (cart.total - cart.discountedTotal).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>€0.00</span>
                        </div>
                        <div className="summary-total">
                            <strong>Estimated Total:</strong>
                            <strong>€{estimatedTotal}</strong>
                        </div>
                        <button className="checkout-button" disabled={!hasItems}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
