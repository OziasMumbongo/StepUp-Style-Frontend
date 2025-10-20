import React, { useEffect, useState } from "react";
import styles from "./Nike.module.css"; // Import the CSS file
import NavBar from "../components/NavBar";
const backendUrl = import.meta.env.VITE_BACKENDURL

const NewBalance = ({cart, addToCart}) => {
  const [products, setProducts] = useState([]);
  const category = "New Balance"; // Make dynamic if needed

  useEffect(() => {
    fetch(`${backendUrl}/Products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [category]);

  return (
    <div className={styles.nike_container}>
      <NavBar cart={cart}/>
      <h1 className={styles.nike_title}>{category} Products</h1>
      <div className={styles.product_scroll_container}>
        {products.map((item) => (
          <div className={styles.product_card} key={item._id}>
            <img src={item.Image} alt={item.Product} className={styles.product_image} />
            <h3 className={styles.product_name}>{item.Product}</h3>
            <p className={styles.product_price}>R {item.Price}</p>
            <button
            className={styles.add_to_cart_button}
            onClick={() => addToCart(item)}
            >
            Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewBalance;
