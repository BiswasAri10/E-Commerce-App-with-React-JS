import React, { createContext, useReducer, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (existingItem) {
        const updatedState = state.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return updatedState;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case "REMOVE_FROM_CART":
      const itemToRemove = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (itemToRemove) {
        const updatedState = state.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        return updatedState.filter((cartItem) => cartItem.quantity > 0);
      }
      return state;
    case "SET_CART_ITEMS":
      return action.payload.reduce((mergedItems, cartItem) => {
        const existingItem = mergedItems.find(
          (item) => item.id === cartItem.id
        );
        if (existingItem) {
          existingItem.quantity += cartItem.quantity;
        } else {
          mergedItems.push(cartItem);
        }
        return mergedItems;
      }, []);
    case "UPDATE_QUANTITY":
      const { id, quantity } = action.payload;
      const updatedState = state.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );
      return updatedState;
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const currentUserEmail = authCtx?.email || "";
  const cartFromLocalStorage =
    JSON.parse(localStorage.getItem(`cartItems_${currentUserEmail}`)) || [];
  const [cartItems, dispatch] = useReducer(cartReducer, cartFromLocalStorage);

  const modifiedEmail = currentUserEmail.replace(/[@.]/g, "");

  const addToCart = (item) => {
    const itemToAdd = {
      id: item.id,
      imageUrl: item.imageUrl,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    };
    axios
      .post(
        `https://crudcrud.com/api/6a747487b3e34325bdd31ad632eca73c/cart${modifiedEmail}`,
        itemToAdd
      )
      .then((response) => {
        dispatch({ type: "ADD_TO_CART", payload: itemToAdd });
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  const removeItemFromCart = (item) => {
    const serverGeneratedId = item._id;
    axios
      .delete(
        `https://crudcrud.com/api/6a747487b3e34325bdd31ad632eca73c/cart${modifiedEmail}/${serverGeneratedId}`
      )
      .then((response) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  const getCartCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/6a747487b3e34325bdd31ad632eca73c/cart${modifiedEmail}`
      )
      .then((response) => {
        dispatch({ type: "SET_CART_ITEMS", payload: response.data });
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [modifiedEmail]);

  useEffect(() => {
    localStorage.setItem(
      `cartItems_${currentUserEmail}`,
      JSON.stringify(cartItems)
    );
  }, [cartItems, currentUserEmail]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeItemFromCart, getCartCount }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
