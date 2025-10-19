import React, { useEffect, useState } from "react";
import styles from "./Nike.module.css";
import NavBar from "../components/NavBar";

const Nike = ({ cart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const category = "Nike";

  useEffect(() => {
    fetch(`http://localhost:3000/Products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching category products:", err));
  }, [category]);

  // 🔹 Filter products based on search
  const filteredProducts = products.filter((item) =>
    item.Product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.nike_container}>
      {/* Pass search state to NavBar */}
      <NavBar cart={cart} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h1 className={styles.nike_title}>{category} Products</h1>

      <div className={styles.product_scroll_container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Nike;
