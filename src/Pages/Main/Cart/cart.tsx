import { useEffect, useState } from 'react';
import './cart.css';
// Remove getMyCart import if you fetch cart by user instead
// import { getMyCart } from '../../../services/api.ts';
import { Cart } from '../../../types';

const CartPage = () => {
    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // 1. Get current user (you might have a user context, or fetch from /auth/me)
                const userRes = await fetch('/auth/me', { credentials: 'include' });
                const user = await userRes.json();
                const userId = user.id;

                // 2. Fetch user's cart(s)
                const cartsRes = await fetch(`/carts/user/${userId}`);
                const carts = await cartsRes.json();

                // 3. Use the first cart if it exists
                if (carts.carts && carts.carts.length > 0) {
                    setCart(carts.carts[0]);
                } else {
                    setCart(null);
                }
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="cart-page">
            <h1 className="cart-title">🛒 My Cart</h1>

            {cart && cart.products.length > 0 ? (
                <div className="cart-content">
                    {/* LEFT: Products */}
                    <div className="cart-items">
                        {cart.products.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2>{item.title}</h2>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="cart-summary">
                        <div className="summary-box">
                            <h2>Order Summary</h2>
                            <p>Total Items: {cart.totalProducts}</p>
                            <p>Total Quantity: {cart.totalQuantity}</p>
                            <p>Total: ${cart.total.toFixed(2)}</p>

                            <div className="promo-code">
                                <input type="text" placeholder="Promo Code" />
                                <button>Apply</button>
                            </div>

                            <button className="checkout-button">Checkout</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="empty-message">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
