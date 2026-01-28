import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // State: Array of items
    const [cart, setCart] = useState([]);

    // Action 1: Add Item
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Action 2: Remove Item (by index for simplicity)
    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    };

    // Derived State: Total Price
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
