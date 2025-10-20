import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp.module.css'
const url = import.meta.env.render

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${url}/Users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      alert('User registered successfully!');
      console.log(result);

      // Redirect to homepage
      navigate('/login');
    } else {
      const errorMsg = await response.text();
      alert('Error: ' + errorMsg);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <h1>Welcome To StepUp Style</h1>
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

          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className={styles.signUp_Input}
            value={formData.age}
            onChange={handleChange}
          />

          <button type="submit" className={styles.signUp}>SIGN UP</button>
          <p>Already have an account <Link to='/login'><span style={{color: "orange"}}>LogIn</span></Link> </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
