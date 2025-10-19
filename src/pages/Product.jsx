import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import NavBar from "../components/NavBar";

const Product = ({ cart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input

  useEffect(() => {
    fetch("http://localhost:3000/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Filter products based on search query
  const filteredProducts = products.filter((item) =>
    item.Product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.productContainer}>
      {/* Pass search state to NavBar */}
      <NavBar cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h1 className={styles.title}>Available Products</h1>

      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0,8).map((item) => (
            <div key={item._id} className={styles.productCard}>
              <img src={item.Image} alt={item.Product} className={styles.image} />
              <h2>{item.Product}</h2>
              <p>{item.Description}</p>
              <p><strong>Category:</strong> {item.Category}</p>
              <p><strong>Price:</strong> {item.Price}</p>
              <button
                className={styles.cartButton}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
