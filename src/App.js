import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Layout/Header";
import Home from "./components/External Pages/Home";
import ProductList from "./components/Products/ProductList";
import About from "./components/External Pages/About";
import { CartProvider } from "./components/store/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<ProductList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
