import React, { useState, useContext } from "react";
import { CartContext } from "../store/CartContext";
import Button from "react-bootstrap/Button";
import CartItems from './CartItem';
import "./Cart.css";

const Cart = () => {
  const { getCartCount, cartItems, removeItemFromCart } = useContext(CartContext);

  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItemClick = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove) {
      removeItemFromCart(itemToRemove);
    }
  };

  return (
    <div className="cart">
      <Button
        className="cart-button"
        variant="outline-info"
        onClick={handleCartClick}
      >
        Cart ({getCartCount()})
      </Button>
      {isCartOpen && (
        <CartItems
          cartItems={cartItems}
          handleRemoveItemClick={handleRemoveItemClick}
          calculateTotal={calculateTotal}
        />
      )}
    </div>
  );
};

export default Cart;
