import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductList.css";
import { CartContext } from "../store/CartContext";
import Header from "../Layout/Header";
import Cart from '../Cart/Cart';
import BrandName from "../Layout/BrandName";

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
      <Container>
        <h1 className="text-center">Products</h1>
        <Row>
          {productsArr.map((product, index) => (
            <Col key={index} md={6}>
              <Card className="product-card" style={{ width: "22rem" }}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl}
                  alt={product.title}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
