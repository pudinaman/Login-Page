import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can implement your login logic, such as sending the form data to a backend server
    const res = await fetch('http://localhost:7000/api/v1/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    console.log(formData);

    // Assuming a simple boolean state for login status
    const isLoggedIn = true; // Replace with actual login logic
    if (isLoggedIn) {
      // Redirect to the infinite scroll page after successful login
      navigate('/infinite-scroll');
    }
    
    // Reset form fields
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/">Sign Up</Link></p>
    </div>
  );
}

export default Login;
