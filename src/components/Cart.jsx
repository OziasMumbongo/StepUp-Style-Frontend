import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart, currentUser }) => {
  const navigate = useNavigate();

  // Load cart from localStorage for this user on mount
  useEffect(() => {
    if (currentUser) {
      const savedCart = JSON.parse(localStorage.getItem(`${currentUser}_cart`)) || [];
      setCart(savedCart);
    }
  }, [currentUser, setCart]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${currentUser}_cart`, JSON.stringify(cart));
    }
  }, [cart, currentUser]);

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.Price.toString().replace(/[^0-9.]/g, "")) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, total } });
  };

  return (
    <div className={styles.cart_page}>
      <div className={styles.cart_header}>
        <h1>Your Cart</h1>
        <Link to="/homepage">
          <button className={styles.continue_shopping}>Continue Shopping</button>
        </Link>
      </div>

      {cart.length === 0 ? (
        <p className={styles.empty_cart}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cart_items}>
            {cart.map((item, index) => (
              <div key={index} className={styles.cart_item}>
                <img src={item.Image} alt={item.Product} className={styles.cart_item_image} />
                <div className={styles.cart_item_details}>
                  <h3>{item.Product}</h3>
                  <p>{item.Description}</p>
                  <p className={styles.cart_item_price}> {item.Price}</p>

                  <div className={styles.quantity_controls}>
                    <button onClick={() => decreaseQuantity(index)} className={styles.qty_btn}>−</button>
                    <span className={styles.qty_number}>{item.quantity || 1}</span>
                    <button onClick={() => increaseQuantity(index)} className={styles.qty_btn}>+</button>
                  </div>

                  <button className={styles.remove_btn} onClick={() => removeItem(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cart_summary}>
            <h2>Total: R {total.toFixed(2)}</h2>
            <button className={styles.checkout_btn} onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
