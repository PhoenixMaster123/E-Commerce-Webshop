import { useContext, useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Product } from '../../../types';
import { useNavigate } from 'react-router-dom';

const FREE_SHIPPING_THRESHOLD = 39.99;
const SHIPPING_COST = 3.99;

const CartPage = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    const itemBg = isDarkMode ? 'bg-[#1e1e1e] border border-[#333]' : 'bg-[#ffffff] border border-[#ccc]'; // Added border to itemBg
    const summaryBg = isDarkMode ? 'bg-[#1e1e1e] border border-[#333]' : 'bg-[#ffffff] border border-[#e0e0e0]'; // Added border to summaryBg
    const h4Text = isDarkMode ? 'text-[#f1f1f1]' : 'text-[#000000]';
    const pText = isDarkMode ? 'text-[#f1f1f1]' : 'text-[#000000]';

    // Updated Button Styles
    const quantityBtn = `px-3 py-1 rounded-[4px] border text-base transition-colors duration-200
        ${isDarkMode
        ? 'bg-[#2a2a2a] text-[#ffffff] border-[#444] hover:bg-[#3a3a3a] focus:ring-2 focus:ring-[#555]'
        : 'bg-[#eeeeee] text-[#000000] border-[#ccc] hover:bg-[#dddddd] focus:ring-2 focus:ring-[#aaa]'
    }`;
    const removeBtn = `mt-1 px-3 py-1 rounded-[4px] text-sm transition-colors duration-200
        ${isDarkMode
        ? 'bg-[#b22234] text-white hover:bg-[#9a1d2d] focus:ring-2 focus:ring-[#d04050]'
        : 'bg-[crimson] text-white hover:bg-[#cc0033] focus:ring-2 focus:ring-[#ff4d6a]'
    }`;
    const emptyCartText = isDarkMode ? 'text-[#bbbbbb]' : 'text-[#000000]';
    const checkoutBtn = `w-full mt-4 py-3 rounded-[6px] font-bold transition-colors duration-300
        ${hasItems && !isCheckingOut
        ? 'bg-[#2788f8] text-white hover:bg-[#1a6edb] focus:ring-2 focus:ring-[#5fa9f7]'
        : 'bg-[#2788f8] text-white opacity-60 cursor-not-allowed'
    }`;

    const handleCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            setCheckoutStatus('success');
            clearCart();

            // Redirect to home page after a short delay
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        }, 2000);
    };

    return (
        <div className={`min-h-screen max-w-[1200px] mx-auto my-8 p-4 font-['Segoe_UI',sans-serif] transition-colors duration-300 ${bgMain}`}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🛒 My Cart</h2>

            {checkoutStatus === 'success' && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-lg shadow-xl text-center scale-up-center">
                        <svg className="mx-auto h-20 w-20 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-2xl font-semibold mt-4 text-green-600 dark:text-green-400">Order Placed Successfully!</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">Redirecting to home page...</p>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap gap-8 flex-col md:flex-row">
                <div className="flex-[3] mb-8 md:mb-0">
                    {hasItems ? (
                        cart.map((product) => (
                            <div
                                key={product.id}
                                className={`flex gap-4 p-4 mb-4 rounded-[8px] items-center transition-colors ${itemBg}`}
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
                                            className={quantityBtn}
                                            onClick={() => decreaseQuantity(product.id)}
                                            disabled={isCheckingOut}
                                        >-</button>
                                        <span className={`px-2 ${pText}`}>{product.quantity}</span>
                                        <button
                                            className={quantityBtn}
                                            onClick={() => increaseQuantity(product.id)}
                                            disabled={isCheckingOut}
                                        >+</button>
                                    </div>
                                    <p className={`text-sm mb-1 ${pText}`}>
                                        Total: <span className="font-medium">${(getDiscountedPrice(product) * product.quantity).toFixed(2)}</span>
                                    </p>
                                    <button
                                        className={removeBtn}
                                        onClick={() => removeFromCart(product.id)}
                                        disabled={isCheckingOut}
                                    >Remove</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={`italic p-4 ${emptyCartText}`}>Your cart is empty.</p>
                    )}
                </div>
                <div className="flex-1 w-full md:w-80">
                    <div className={`p-6 rounded-[8px] transition-colors ${summaryBg}`}>
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
                        Cart has to be over ${FREE_SHIPPING_THRESHOLD.toFixed(2)} to qualify for free shipping
                    </div>
                    <button
                        className={checkoutBtn}
                        onClick={handleCheckout}
                        disabled={!hasItems || isCheckingOut || checkoutStatus === 'success'}
                    >
                        {isCheckingOut ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Proceed to Checkout'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;