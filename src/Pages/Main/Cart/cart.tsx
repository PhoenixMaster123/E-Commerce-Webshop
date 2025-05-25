import { useCart } from '../../../contexts/CartContext';
import './cart.css';

const FREE_SHIPPING_THRESHOLD = 39.99;
const SHIPPING_COST = 3.99;

const CartPage = () => {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const hasItems = cart && cart.length > 0;

    const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const qualifiesForFreeShipping = subtotal > FREE_SHIPPING_THRESHOLD;
    const shipping = hasItems ? (qualifiesForFreeShipping ? 0 : SHIPPING_COST) : 0;
    const estimatedTotal = (subtotal + shipping).toFixed(2);

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 My Cart</h2>

            <div className="cart-content">
                <div className="cart-left">
                    {hasItems ? (
                        cart.map((product) => (
                            <div key={product.id} className="cart-item">
                                <img src={product.thumbnail} alt={product.title} className="cart-thumbnail" />
                                <div className="cart-details">
                                    <h4>{product.title}</h4>
                                    <p>Price: €{product.price.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                        <span>{product.quantity}</span>
                                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                                    </div>
                                    <p>Total: €{(product.price * product.quantity).toFixed(2)}</p>
                                    <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
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
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{qualifiesForFreeShipping ? 'Free' : `€${SHIPPING_COST.toFixed(2)}`}</span>
                        </div>
                        <div className="summary-row">
                            <span>Discount:</span>
                            <span>€0.00</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>€0.00</span>
                        </div>
                        <div className="summary-total">
                            <strong>Estimated Total:</strong>
                            <strong>€{estimatedTotal}</strong>
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.95rem', color: '#888' }}>
                        Cart has to be over 39.99 to qualify for free shipping
                    </div>
                    <button className="checkout-button" disabled={!hasItems}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
