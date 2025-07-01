// Import React and required hooks
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Import scoped CSS module styles
import styles from './Auth.module.css';

// Define Signup component
const Signup = () => {
  // State hooks to manage form data and error message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate hook for redirecting after signup
  const navigate = useNavigate();

  // Handle form submission
  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form reload

    // Check if a user already exists with this email
    if (localStorage.getItem(email)) {
      setError('User already exists');
      return;
    }

    // Save new user details to localStorage
    localStorage.setItem(email, JSON.stringify({ name, email, password }));

    // Redirect to login page after successful signup
    navigate('/login');
  };

  // JSX to render the signup form
  return (
    <div className={styles['auth-container']}>
      <form className={styles['auth-form']} onSubmit={handleSignup}>
        <h2 className={styles['auth-title']}>Sign Up</h2>

        {/* Name input field */}
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        {/* Email input field */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password input field */}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Display error if user already exists */}
        {error && <div className={styles['auth-error']}>{error}</div>}

        {/* Submit button */}
        <button className={styles['auth-btn']} type="submit">Sign Up</button>

        {/* Navigation link to login page if user already has an account */}
        <div className={styles['auth-links']}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

// Export the component for use in routes
export default Signup;
