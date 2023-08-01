import React from "react";
import "./CartItems.css";

const CartItems = ({ cartItems, handleRemoveItemClick, calculateTotal }) => {
  return (
    <div className="cart-items">
      <div className="cart-table">
        <div className="cart-table-row cart-header">
          <div className="cart-table-item">ITEM</div>
          <div className="cart-table-price">PRICE</div>
          <div className="cart-table-quantity">QUANTITY</div>
          <div className="cart-table-total">TOTAL</div>
        </div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-table-image">
              <img src={item.imageUrl} alt={item.title} />
            </div>
            <div className="cart-table-item">{item.title}</div>
            <div className="cart-table-price">${item.price}</div>
            <div className="cart-table-quantity">{item.quantity}</div>
            <div className="cart-table-total">
              ${item.price * item.quantity}
            </div>
            <button
              className="cart-item-remove-btn"
              onClick={() => handleRemoveItemClick(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="cart-table-row cart-total">
          <div className="cart-table-item"></div>
          <div className="cart-table-price"></div>
          <div className="cart-table-quantity"></div>
          <div className="cart-table-total">Total: ${calculateTotal()}</div>
        </div>
      </div>
      <button className="cart-purchase-button">PURCHASE</button>
    </div>
  );
};

export default CartItems;
