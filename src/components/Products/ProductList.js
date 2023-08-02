import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../store/CartContext";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import BrandName from "../Layout/BrandName";
import "./ProductList.css";

const ProductList = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/login");
    }
  }, [authCtx.isLoggedIn, navigate]);

  const productsArr = [
    {
      id: "p1",
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },
    {
      id: "p2",
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },
    {
      id: "p3",
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },
    {
      id: "p4",
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  const handleAddToCart = (product) => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
      total: product.price,
    };
    addToCart(productWithQuantity);
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
            <div key={product.id} className="custom-col">
                <div className="product-card">
              <Link to={`/products/${product.id}`}>
                  <img
                    className="card-img-top"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                  </Link>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
