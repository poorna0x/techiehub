import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (localStorage.getItem(email)) {
      setError('User already exists');
      return;
    }
    localStorage.setItem(email, JSON.stringify({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className={styles['auth-container']}>
      <form className={styles['auth-form']} onSubmit={handleSignup}>
        <h2 className={styles['auth-title']}>Sign Up</h2>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className={styles['auth-error']}>{error}</div>}
        <button className={styles['auth-btn']} type="submit">Sign Up</button>
        <div className={styles['auth-links']}>
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup; 