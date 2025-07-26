// contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void; // <--- Add this line
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart with quantity support
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        // Update the quantity by the specified amount
        return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Add new product with the selected quantity
      return [...prev, { ...product, quantity }];
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prev) =>
        prev.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prev) =>
        prev
            .map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // <--- Add the clearCart function here
  const clearCart = () => {
    setCart([]); // Set the cart to an empty array
  };

  return (
      <CartContext.Provider
          value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }} // <--- Expose clearCart here
      >
        {children}
      </CartContext.Provider>
  );
};