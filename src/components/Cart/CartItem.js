import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const CartItems = ({ cartItems, handleRemoveItemClick }) => {
  return (
    <div className="cart-items">
      {cartItems.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="card-img"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">Price: ${item.price}</p>
                <p className="card-text">Quantity: {item.quantity}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItemClick(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
