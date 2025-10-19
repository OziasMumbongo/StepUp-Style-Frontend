import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Homepage.module.css'
import NavBar from '../components/NavBar'
import Product from '../pages/Product'



const Homepage = ({cart, addToCart }) => {
  return (
    <div className={styles.homepageContainer}>
      <NavBar cart={cart}/>
        
      <div className={styles.banner}>
        <div className={styles.banner_text}>
          <h1>Style Yourself Differently</h1>
          <p>
            Nike, Adidas, New Balance, and Puma have impacted culture by influencing
            fashion, sports, and identity. Their iconic designs and collaborations
            have redefined athletic wear, and they’ve become symbols of community
            and affiliation. Through innovation and globalization, they’ve driven
            economic growth and shaped societal values. These brands have
            transcended athletics to become integral to modern culture.
          </p>
          <button className={styles.exploreNow}>Explore Now</button>
        </div>

        <div className={styles.banner_image}>
          <img src="/public/nike-air-max-97-neon-shoe-3d-model-b1f03efa21.jpg" alt="shoe" className={styles.nikeAir}/>
        </div>
      </div>
      <div className={styles.brandSection}>
  <h2>Explore the Brands</h2>
  <div className={styles.brandsGrid}>
    <Link to="/nike">
    <div className={styles.brandCard}>
      <img src="/public/02e19efc-36c8-4598-8aaf-b9d7b2382eac1702986853269NikeAirForce107MensShoes1.jpg" alt="Nike" />
      <h3 className={styles.pairs1}>Nike</h3>
      <Link to="/nike"><button className={styles.shopNow}>Shop Now</button></Link>
    </div>
    </Link>

    <Link to="/adidas">
    <div className={styles.brandCard}>
      <img src="/public/adidas4.jpg" alt="Adidas" />
      <h3 className={styles.pairs1}>Adidas</h3>
      <Link to="/adidas"><button className={styles.shopNow}>Shop Now</button></Link>
    </div>
    </Link>

    <Link to="newbalance">
    <div className={styles.brandCard}>
      <img src="/public/image1.png" alt="New Balance" />
      <h3 className={styles.pairs}>New Balance</h3>
      <Link to="/newbalance"><button className={styles.shopNow2}>Shop Now</button> </Link>
    </div>
    </Link>

    <Link to="/puma">
    <div className={styles.brandCard}>
      <img src="/public/image.png" alt="Puma" />
      <h3 className={styles.pairs}>Puma</h3>
      <Link to="/puma"><button className={styles.shopNow2}>Shop Now</button> </Link>
    </div>
    </Link>
  </div>
</div>

<h2 className={styles.exploreStyle}>Explore Our Style</h2>

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <video
    width="85%"
    height="auto"
    controls
    autoPlay
    loop
    muted
  >
    <source src="/public/Nike Japan’s Air Max Day (2022) - Nike Careers Our Stories (1080p, h264).mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

<Product cart={cart} addToCart={addToCart}/>

<footer className={styles.footer}>
    <p>&copy; 2025 MySite. All rights reserved.</p>
    <a href="#contact">Contact Us</a>
</footer>
    </div>
  )
}

export default Homepage
