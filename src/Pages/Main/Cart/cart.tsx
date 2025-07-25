import { useContext } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Product } from '../../../types';

const FREE_SHIPPING_THRESHOLD = 39.99;
const SHIPPING_COST = 3.99;

const CartPage = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { isDarkMode } = useContext(ThemeContext);

    const hasItems = cart && cart.length > 0;

    const getDiscountedPrice = (product: Product) =>
        product.price * (1 - (product.discountPercentage || 0) / 100);
    const getDiscount = (product: Product): number =>
        product.discountPercentage ? (product.price * product.discountPercentage / 100) : 0;
    const subtotal = cart.reduce((sum, product) => sum + getDiscountedPrice(product) * product.quantity, 0);
    const discountTotal = cart.reduce((sum, product) => sum + getDiscount(product) * product.quantity, 0);
    const qualifiesForFreeShipping = subtotal > FREE_SHIPPING_THRESHOLD;
    const shipping = hasItems ? (qualifiesForFreeShipping ? 0 : SHIPPING_COST) : 0;
    const estimatedTotal = (subtotal + shipping).toFixed(2);

    // Theme-based classes
    const bgMain = isDarkMode ? 'bg-[#121212] text-[#f1f1f1]' : 'bg-[#ffffff] text-[#000000]';
    const itemBg = isDarkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-[#ffffff] border-[#ccc]';
    const summaryBg = isDarkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-[#ffffff] border-[#e0e0e0]';
    const h4Text = isDarkMode ? 'text-[#f1f1f1]' : 'text-[#000000]';
    const pText = isDarkMode ? 'text-[#f1f1f1]' : 'text-[#000000]';
    const quantityBtn = isDarkMode
        ? 'bg-[#2a2a2a] text-[#ffffff] border-[#444]'
        : 'bg-[#eeeeee] text-[#000000] border-[#ccc]';
    const removeBtn = isDarkMode
        ? 'bg-[#b22234] text-white'
        : 'bg-[crimson] text-white';
    const emptyCartText = isDarkMode ? 'text-[#bbbbbb]' : 'text-[#000000]';
    const checkoutBtn = 'bg-[#2788f8] text-white';

    return (
        <div className={`min-h-screen max-w-[1200px] mx-auto my-8 p-4 font-['Segoe_UI',sans-serif] transition-colors duration-300 ${bgMain}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🛒 My Cart</h2>
            <div className="flex flex-wrap gap-8 flex-col md:flex-row">
                <div className="flex-[3] mb-8 md:mb-0">
                    {hasItems ? (
                        cart.map((product) => (
                            <div
                                key={product.id}
                                className={`flex gap-4 p-4 mb-4 rounded-[8px] items-center border-b transition-colors ${itemBg}`}
                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="cart-thumbnail object-cover rounded-[6px]"
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <div className="flex-1">
                                    <h4 className={`font-semibold text-base md:text-lg mb-2 ${h4Text}`}>{product.title}</h4>
                                    <p className={`text-sm mb-1 ${pText}`}>
                                        Price: <span className="font-medium">${getDiscountedPrice(product).toFixed(2)}</span>
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <button
                                            className={`px-3 py-1 rounded-[4px] border text-base ${quantityBtn}`}
                                            onClick={() => decreaseQuantity(product.id)}
                                        >-</button>
                                        <span className="px-2">{product.quantity}</span>
                                        <button
                                            className={`px-3 py-1 rounded-[4px] border text-base ${quantityBtn}`}
                                            onClick={() => increaseQuantity(product.id)}
                                        >+</button>
                                    </div>
                                    <p className={`text-sm mb-1 ${pText}`}>
                                        Total: <span className="font-medium">${(getDiscountedPrice(product) * product.quantity).toFixed(2)}</span>
                                    </p>
                                    <button
                                        className={`mt-1 px-3 py-1 rounded-[4px] text-sm ${removeBtn}`}
                                        onClick={() => removeFromCart(product.id)}
                                    >Remove</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`italic p-4 ${emptyCartText}`}>Your cart is empty.</p>
                    )}
                </div>
                <div className="flex-1 w-full md:w-80">
                    <div className={`p-6 rounded-[8px] border transition-colors ${summaryBg}`}>
                        <h3 className={`text-xl font-semibold mb-4 ${h4Text}`}>Order Summary</h3>
                        <div className={`flex justify-between mb-2 ${pText}`}>
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className={`flex justify-between mb-2 ${pText}`}>
                            <span>Shipping:</span>
                            <span>{qualifiesForFreeShipping ? 'Free' : `$${SHIPPING_COST.toFixed(2)}`}</span>
                        </div>
                        <div className={`flex justify-between mb-2 ${pText}`}>
                            <span>Discount:</span>
                            <span>${discountTotal.toFixed(2)}</span>
                        </div>
                        <div className={`flex justify-between font-bold border-t pt-3 mt-3 ${pText} ${isDarkMode ? 'border-[#333]' : 'border-[#e0e0e0]'}`}>
                            <span>Estimated Total:</span>
                            <span>${estimatedTotal}</span>
                        </div>
                    </div>
                    <div className={`mt-4 text-center text-sm ${emptyCartText}`}>
                        Cart has to be over $39.99 to qualify for free shipping
                    </div>
                    <button
                        className={`w-full mt-4 py-3 rounded-[6px] font-bold transition-colors disabled:opacity-60 ${checkoutBtn}`}
                        disabled={!hasItems}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;