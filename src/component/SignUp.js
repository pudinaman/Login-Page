import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import Login from './LogIn';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    agreeTerms: false
  });
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (e.target.type === 'checkbox') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formErrors.agreeTerms) {
      setFormErrors({
        name: !formData.name,
        email: !formData.email,
        password: !formData.password,
        agreeTerms: !formErrors.agreeTerms
      });
    } else {
      console.log(formData);
      try {
        const res = await fetch('http://localhost:7000/api/v1/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success) {
          // Show notification
          setNotification("Verification email has been sent to your email address.");
          // Clear form fields
          setFormData({
            name: '',
            email: '',
            password: ''
          });
        } else {
          // Handle registration failure
          // For example, if email already exists, show relevant error message
          console.error('Registration failed:', data.error);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        // Handle error (e.g., display error message)
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={formErrors.name ? "error" : ""} />
          {formErrors.name && <p className="error-message">Username is required</p>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={formErrors.email ? "error" : ""} />
          {formErrors.email && <p className="error-message">Email is required</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className={formErrors.password ? "error" : ""} />
          {formErrors.password && <p className="error-message">Password is required</p>}
        </div>
        <div>
          <input type="checkbox" name="agreeTerms" checked={formErrors.agreeTerms} onChange={handleChange} />
          <label>Agree to our terms and conditions</label>
          {formErrors.agreeTerms === false && <p className="error-message">You must agree to the terms and conditions</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default SignUp;
