import React, { useState, useContext } from "react";
import CartItems from "./CartItem";
import { CartContext } from "../store/CartContext";
import Button from "react-bootstrap/Button";
import "./Cart.css";

const Cart = () => {
  const { getCartCount, cartItems, removeItemFromCart } = useContext(CartContext);

  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  const handleRemoveItemClick = (item) => {
    removeItemFromCart(item);
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
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItems
              key={index}
              cartItems={cartItems}
              handleRemoveItemClick={() => handleRemoveItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
