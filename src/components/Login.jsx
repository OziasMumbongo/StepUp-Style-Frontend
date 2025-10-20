import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css';
const backendUrl = import.meta.env.VITE_BACKENDURL


const Login = ({ setCart, setCurrentUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Login failed.');
        return;
      }

      const userEmail = data.user.email;
      const username = data.user.name;

      // ✅ Set active user
      localStorage.setItem('currentUser', userEmail);
      localStorage.setItem(`user_${userEmail}_name`, username);
      setCurrentUser(userEmail);

      // ✅ Load user's saved cart
      const savedCart = JSON.parse(localStorage.getItem(`${userEmail}_cart`)) || [];
      setCart(savedCart);

      // ✅ Load profile picture if exists
      const savedProfilePic = localStorage.getItem(`profile_${userEmail}`);
      if (savedProfilePic) {
        localStorage.setItem('activeProfilePic', savedProfilePic);
      }

      alert('Login successful!');
      navigate('/homepage');
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <h1>Welcome Back To StepUp Style</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className={styles.signUp_Input}
            value={formData.name}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={styles.signUp_Input}
            value={formData.email}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={styles.signUp_Input}
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className={styles.signUp}>LOGIN</button>
          <p>Don't have an account? <Link to="/"><span style={{color: "orange"}}>Sign Up</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
