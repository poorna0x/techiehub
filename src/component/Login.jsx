// Importing React and necessary hooks from react
import React, { useState } from 'react';

// useNavigate for programmatic navigation, Link for navigation via link
import { useNavigate, Link } from 'react-router-dom';

// Importing scoped CSS styles
import styles from './Auth.module.css';

// Define Login component
const Login = () => {
  // State for storing form input values and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hook to navigate between routes programmatically
  const navigate = useNavigate();

  // Function to handle login logic when form is submitted
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form's default reload behavior

    // Get user data from localStorage based on email
    const user = JSON.parse(localStorage.getItem(email));

    // If user exists and password matches, log them in
    if (user && user.password === password) {
      // Store login status and email in localStorage
      localStorage.setItem('loggedInUser', email);
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to home page after successful login
      navigate('/');
    } else {
      // Show error message if login fails
      setError('Invalid email or password');
    }
  };

  // JSX for rendering the login form
  return (
    <div className={styles['auth-container']}>
      <form className={styles['auth-form']} onSubmit={handleLogin}>
        <h2 className={styles['auth-title']}>Login</h2>

        {/* Email input */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Show error if credentials are incorrect */}
        {error && <div className={styles['auth-error']}>{error}</div>}

        {/* Login button */}
        <button className={styles['auth-btn']} type="submit">Login</button>

        {/* Navigation links to Sign Up and Forgot Password pages */}
        <div className={styles['auth-links']}>
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

// Export the component for use in App routing
export default Login;
