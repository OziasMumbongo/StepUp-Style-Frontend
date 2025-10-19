import React, { useEffect, useState } from 'react';
import styles from './Orders.module.css';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('currentUser');
    if (!username) return;

    const savedOrders = JSON.parse(localStorage.getItem(`${username}_orders`)) || [];
    setUserOrders(savedOrders);
  }, []);

  if (userOrders.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>You have not placed any orders yet.</p>;
  }

  return (
    <div className={styles.orders_page}>
      <h1>Your Orders</h1>
      {userOrders.map((order) => (
        <div key={order.id} className={styles.order}>
          <h2>Order ID: {order.id}</h2>
          <p>Date: {order.date}</p>

          <h3>Items:</h3>
          <ul>
            {order.cart.map((item, i) => (
              <li key={i}>
                {item.Product} x {item.quantity} = R
                {(
                  (parseFloat(item.Price.replace(/[^0-9.-]+/g, "")) || 0) *
                  (item.quantity || 1)
                ).toFixed(2)}
              </li>
            ))}
          </ul>

          <p>
            <strong>Total: R{order.total.toFixed(2)}</strong>
          </p>

          <h3>Delivery Info:</h3>
          <p>{order.formData.fullName}</p>
          <p>
            {order.formData.address}, {order.formData.city},{' '}
            {order.formData.postalCode}, {order.formData.country}
          </p>
          <p>Email: {order.formData.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
