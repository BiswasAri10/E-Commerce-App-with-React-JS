import React from 'react';
import ProductList from './components/Products/ProductList';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <div>
      <header>
        <Cart />
      </header>
      <ProductList />
    </div>
  );
}

export default App;
