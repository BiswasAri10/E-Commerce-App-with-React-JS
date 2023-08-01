import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((cartItem) => cartItem.title === action.payload.title);
      if (existingItem) {
        return state.map((cartItem) =>
          cartItem.title === action.payload.title
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      const itemToRemove = state.find((cartItem) => cartItem.title === action.payload.title);
      if (itemToRemove && itemToRemove.quantity > 1) {
        return state.map((cartItem) =>
          cartItem.title === action.payload.title
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return state.filter((cartItem) => cartItem.title !== action.payload.title);
      }
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItemFromCart, getCartCount }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
