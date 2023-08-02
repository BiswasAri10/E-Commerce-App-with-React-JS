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
        const updatedQuantity = itemToRemove.quantity - 1;

        if (updatedQuantity > 0) {
          const updatedState = state.map((cartItem) =>
            cartItem.id === action.payload.id
              ? { ...cartItem, quantity: updatedQuantity }
              : cartItem
          );
          return updatedState;
        } else {
          return state.filter((cartItem) => cartItem.id !== action.payload.id);
        }
      }
      return state;
    case "SET_CART_ITEMS":
      return action.payload.map((cartItem) => ({
        ...cartItem,
        serverGeneratedId: cartItem._id,
      }));

    case "UPDATE_QUANTITY":
      const { id, quantity, serverGeneratedId } = action.payload;
      const updatedState = state.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity, serverGeneratedId }
          : cartItem
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
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + item.quantity;
      const updatedItem = { ...existingItem, quantity: updatedQuantity };

      axios
        .put(
          `https://crudcrud.com/api/53c9f464acc1454fba7cb908603e90fc/cart${modifiedEmail}/${existingItem.serverGeneratedId}`,
          updatedItem
        )
        .then((response) => {
          dispatch({ type: "UPDATE_QUANTITY", payload: updatedItem });
        })
        .catch((error) => {
          console.error("Error updating item quantity:", error);
        });
    } else {
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
          `https://crudcrud.com/api/53c9f464acc1454fba7cb908603e90fc/cart${modifiedEmail}`,
          itemToAdd
        )
        .then((response) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: { ...itemToAdd, serverGeneratedId: response.data._id },
          });
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    }
  };

  const removeItemFromCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity - 1;
      const updatedItem = { ...existingItem, quantity: updatedQuantity };

      axios
        .put(
          `https://crudcrud.com/api/53c9f464acc1454fba7cb908603e90fc/cart${modifiedEmail}/${existingItem.serverGeneratedId}`,
          updatedItem
        )
        .then((response) => {
          if (updatedQuantity > 0) {
            dispatch({ type: "UPDATE_QUANTITY", payload: updatedItem });
          } else {
            axios
              .delete(
                `https://crudcrud.com/api/53c9f464acc1454fba7cb908603e90fc/cart${modifiedEmail}/${existingItem.serverGeneratedId}`
              )
              .then(() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: item });
              })
              .catch((error) => {
                console.error("Error removing item from cart:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error updating item quantity:", error);
        });
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/53c9f464acc1454fba7cb908603e90fc/cart${modifiedEmail}`
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
