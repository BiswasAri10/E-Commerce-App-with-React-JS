import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.title === item.title);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.title === item.title);
    if (existingItem && existingItem.quantity > 1) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.title === item.title
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.filter((cartItem) => cartItem.title !== item.title)
      );
    }
  };
  

  const getCartCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItemFromCart, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
