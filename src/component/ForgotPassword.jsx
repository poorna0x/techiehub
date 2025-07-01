// Import core React functionality and hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import CSS module styles for scoped styling
import styles from './Auth.module.css';

// ForgotPassword component definition
const ForgotPassword = () => {
  // State hooks for form fields and error message
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle password reset logic
  const handleReset = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Try to get the user object from localStorage using email as key
    const user = JSON.parse(localStorage.getItem(email));

    // If user does not exist, show error
    if (!user) {
      setError('User not found');
      return;
    }

    // If passwords don't match, show error
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Update password and save back to localStorage
    user.password = newPassword;
    localStorage.setItem(email, JSON.stringify(user));

    // Redirect user back to login page
    navigate('/login');
  };

  // Component JSX rendering the forgot password form
  return (
    <div className={styles['auth-container']}>
      <form className={styles['auth-form']} onSubmit={handleReset}>
        <h2 className={styles['auth-title']}>Forgot Password</h2>

        {/* Email input */}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* New password input */}
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        {/* Confirm new password input */}
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        {/* Display error message if any */}
        {error && <div className={styles['auth-error']}>{error}</div>}

        {/* Reset and Cancel buttons */}
        <button className={styles['auth-btn']} type="submit">Reset Password</button>
        <button
          className={`${styles['auth-btn']} ${styles['secondary']}`}
          type="button"
          onClick={() => navigate('/login')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

// Export the component to be used in routes
export default ForgotPassword;
