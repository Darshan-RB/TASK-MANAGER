

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // npm install jwt-decode
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

useEffect(() => {
  const interval = setInterval(() => {
    if (window.google && document.getElementById('googleSignInDiv')) {
      window.google.accounts.id.initialize({
        client_id: '668736523921-gcatl58v5cu3vvu3rmjrh6aupvg8r933.apps.googleusercontent.com', 
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'outline', size: 'large' }
      );
      clearInterval(interval); // Stop checking once it's rendered
    }
  }, 100); // Retry every 100ms

  return () => clearInterval(interval);
}, []);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.userId || response.data.user._id);
      localStorage.setItem('userName', response.data.user.name);

      setLoading(false);
      navigate('/create');
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

 const handleGoogleSuccess = async (response) => {
  const credential = response.credential;
  const decoded = jwtDecode(credential);

  try {
    // Send user data to backend
    const res = await axios.post('http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/google-login', {
      name: decoded.name,
      email: decoded.email,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.user._id || res.data.user.userId);
    localStorage.setItem('userName', res.data.user.name);
    localStorage.setItem('userEmail', res.data.user.email);

    navigate('/create');
  } catch (err) {
    console.error(err);
    alert('Google login failed');
  }
};

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label>Password</label>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          className="reg"
          type="button"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </form>

      <div id="googleSignInDiv" style={{ marginTop: '20px' }}></div>
      

    </div>
  );
};

export default Login;
