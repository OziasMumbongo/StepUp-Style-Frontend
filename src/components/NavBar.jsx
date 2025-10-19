import React, { useEffect, useState, useRef } from 'react';
import { FaShoppingBag, FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ cart = [], searchQuery, setSearchQuery }) => {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // ✅ Load user-specific info on mount
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const storedName = localStorage.getItem(`user_${currentUser}_name`);
      const storedPic = localStorage.getItem(`profile_${currentUser}`);
      if (storedName) setUsername(storedName);
      if (storedPic) setProfilePic(storedPic);
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Handle logout — only end session, not delete saved data
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    setUsername('');
    setProfilePic(null);
    navigate('/login');
  };

  // ✅ Handle per-user profile picture upload
  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    const currentUser = localStorage.getItem('currentUser');
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(`profile_${currentUser}`, reader.result);
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/homepage">
        <div className={styles.nav_left}>
          <img
            src="/public/shoe-sneaker-footwear-vector-illustration_776624-288.avif"
            alt="logo"
            className={styles.logo}
          />
          <h2 className={styles.brand}>StepUp Style</h2>
        </div>
      </Link>

      <div className={styles.nav_center}>
        <Link to="/nike">Nike</Link>
        <Link to="/adidas">Adidas</Link>
        <Link to="/newbalance">New Balance</Link>
        <Link to="/puma">Puma</Link>
      </div>

      <div className={styles.nav_right}>
        {/* ✅ SEARCH INPUT */}
        <div className={styles.search_box}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className={styles.search_icon} />
        </div>

        {/* ✅ USER DROPDOWN */}
        <div className={styles.userSection} ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={styles.profileTrigger}
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" className={styles.profilePic} />
            ) : (
              <FaUserCircle className={styles.userIcon} />
            )}
            {username && (
              <span className={styles.username}>Hi, {username.split(' ')[0]}</span>
            )}
          </div>

          {dropdownOpen && (
            <div className={styles.dropdown}>
              <label htmlFor="profileUpload" className={styles.dropdownItem}>
                Upload Profile Picture
              </label>
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
                style={{ display: 'none' }}
              />

              <div className={styles.dropdownItem}>
                <Link to="/edit-profile">Edit Profile</Link>
              </div>

              <div className={styles.dropdownItem} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>

        {/* ✅ CART BADGE */}
        <Link to="/cart" className={styles.cartIcon}>
          <FaShoppingBag className={styles.icon} />
          {cart.length > 0 && (
            <span className={styles.cartBadge}>{cart.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
