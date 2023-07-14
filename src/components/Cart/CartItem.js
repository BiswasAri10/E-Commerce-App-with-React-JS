import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const CartItem = ({ item, handleRemoveItemClick }) => {
  return (
    <div className="cart-item card mb-3" style={{ maxWidth: '800px', marginTop: '10px' }}>
      <div className="row no-gutters">
        <div className="col-md-3">
          <img src={item.imageUrl} alt={item.title} className="card-img" />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <p className="card-text">Price: ${item.price}</p>
            <p className="card-text">Quantity: {item.quantity}</p>
            <button className="btn btn-sm btn-danger" onClick={handleRemoveItemClick}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
