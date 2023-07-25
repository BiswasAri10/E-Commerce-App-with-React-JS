import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/CartContext";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import BrandName from "../Layout/BrandName";
import "./ProductList.css";

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const productsArr = [
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },
    {
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <Header />
      <Cart />
      <BrandName />
      <div className="custom-container">
        <h1 className="text-center">Products</h1>
        <div className="custom-row">
          {productsArr.map((product, index) => (
            <div key={index} className="custom-col">
              <Link to={`/products/${index + 1}`}>
                <div className="product-card">
                  <img
                    className="card-img-top"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      className="custom-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
