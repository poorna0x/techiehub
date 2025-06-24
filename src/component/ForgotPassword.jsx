import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
      setError('User not found');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    user.password = newPassword;
    localStorage.setItem(email, JSON.stringify(user));
    navigate('/login');
  };

  return (
    <div className={styles['auth-container']}>
      <form className={styles['auth-form']} onSubmit={handleReset}>
        <h2 className={styles['auth-title']}>Forgot Password</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>New Password</label>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <label>Confirm New Password</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        {error && <div className={styles['auth-error']}>{error}</div>}
        <button className={styles['auth-btn']} type="submit">Reset Password</button>
        <button className={styles['auth-btn'] + ' ' + styles['secondary']} type="button" onClick={() => navigate('/login')}>Cancel</button>
      </form>
    </div>
  );
};

export default ForgotPassword; 