import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, total } = location.state || { cart: [], total: 0 };

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  // ✅ Add this missing function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      cart,
      total,
      formData,
      date: new Date().toLocaleString(),
    };

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    savedOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(savedOrders));

    alert('Order placed successfully!');
    navigate('/orders');
  };

  if (!cart || cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p>Your cart is empty!</p>
        <button onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>
    );
  }

  return (
    <div className={styles.checkout_page}>
      <h1>Checkout</h1>
      {/* Cart Summary */}
      <div className={styles.checkout_cart_summary}>
        <h2>Order Summary</h2>
        {cart.map((item, index) => {
  const price = parseFloat(item.Price.toString().replace(/[^0-9.]/g, "")) || 0;
  const quantity = item.quantity || 1;
  return (
    <div key={index} className={styles.checkout_cart_item}>
      <span>{item.Product} x {quantity}</span>
      <span>R{(price * quantity).toFixed(2)}</span>
    </div>
  )
})}

<h3>Total: R{total.toFixed(2)}</h3>

      </div>

      <form className={styles.checkout_form} onSubmit={handleSubmit}>
        {/* Form inputs */}
        <h2>Contact Information</h2>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <h2>Delivery Address</h2>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <h2>Payment Details</h2>
        <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
        <input type="text" name="cardName" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} required />
        <input type="text" name="expiry" placeholder="Expiry MM/YY" value={formData.expiry} onChange={handleChange} required />
        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />

        <button type="submit" className={styles.place_order_btn}>Place Order (R{total.toFixed(2)})</button>
      </form>
    </div>
  );
};

export default Checkout;