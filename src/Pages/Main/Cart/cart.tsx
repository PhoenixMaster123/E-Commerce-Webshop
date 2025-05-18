import { useCart } from '../../../contexts/CartContext';
import './cart.css';

const CartPage = () => {
    const { cart } = useCart();

    const hasItems = cart.length > 0;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const estimatedTotal = subtotal.toFixed(2);
    const discount = 0; // implement logic if you want later
    const shipping = 'TBD';
    const tax = 0;

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
                                    <p>Quantity: {product.quantity}</p>
                                    <p>Price: €{product.price.toFixed(2)}</p>
                                    <p>Total: €{(product.price * product.quantity).toFixed(2)}</p>
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
                            <span>{shipping}</span>
                        </div>
                        <div className="summary-row">
                            <span>Discount:</span>
                            <span>€{discount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>€{tax.toFixed(2)}</span>
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
