import React, { useState } from "react";
import CartItem from "./CartItem";
import Button from 'react-bootstrap/Button';
import './Cart.css'; 

const Cart = () => {
  const cartElements = [
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ];

  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  const handleRemoveItemClick = (index) => {
    const updatedCartElements = [...cartElements];
    updatedCartElements.splice(index, 1);
    setCartOpen(updatedCartElements);
  };

  return (
    <div className="cart">
      <Button
        className="cart-button"
        variant="outline-info"
        onClick={handleCartClick}
      >
        Cart
      </Button>
      {isCartOpen && (
        <div className="cart-items">
          {cartElements.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              handleRemoveItemClick={() => handleRemoveItemClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
