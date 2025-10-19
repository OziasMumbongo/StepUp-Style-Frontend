import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Homepage from './pages/Homepage';
import NavBar from './components/NavBar';
import Product from './pages/Product';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import Nike from './pages/Nike';
import Puma from './pages/Puma';
import Adidas from './pages/Adidas';
import NewBalance from './pages/NewBalance';
import Login from './components/Login';
import EditProfile from './components/EditProfile';
import Orders from './components/Orders';

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(user);
      const savedCart = JSON.parse(localStorage.getItem(`${user}_cart`)) || [];
      setCart(savedCart);
    }
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(p => p._id === product._id);
      let updatedCart;
      if (existing) {
        updatedCart = prevCart.map(p =>
          p._id === product._id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      if (currentUser) {
        localStorage.setItem(`${currentUser}_cart`, JSON.stringify(updatedCart));
      }

      return updatedCart;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/homepage"
          element={<Homepage cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route
          path="/product"
          element={<Product cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} currentUser={currentUser} />}
        />
        <Route
          path="/nike"
          element={<Nike cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route
          path="/puma"
          element={<Puma cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route
          path="/adidas"
          element={<Adidas cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route
          path="/newbalance"
          element={<NewBalance cart={cart} addToCart={addToCart} setCart={setCart} />}
        />
        <Route
          path="/login"
          element={<Login setCart={setCart} setCurrentUser={setCurrentUser} />}
        />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
