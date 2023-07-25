import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/External Pages/Home";
import ProductList from "./components/Products/ProductList";
import About from "./components/External Pages/About";
import Contact from "./components/External Pages/Contact";
import ProductDetail from "./components/External Pages/ProductDetails";
import { CartProvider } from "./components/store/CartContext";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products/:productId"
            element={<ProductDetail />}
          />
        </Routes>
      </CartProvider>
      <Footer />
    </Router>
  );
}

export default App;
