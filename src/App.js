import React from 'react';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/store/CartContext';

function App() {
  return (
    <CartProvider>
      <Cart />
      <ProductList />
    </CartProvider>
  );
}

export default App;
