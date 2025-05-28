import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await axios.post(
  'http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/users',
  {
    name,
    email,
    password,
  }
);


    // Store token and user info from response
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.user.id);
    localStorage.setItem('userName', response.data.user.name);

    setLoading(false);
    navigate('/login');  // Navigate to protected page after registration
  } 
  catch (err) {
  setLoading(false);
  console.error('Registration error:', err.response || err);
  setError(err.response?.data?.message || 'Registrationsss failed');
}

};


  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" "
            required
          />
          <label>Name</label>
        </div>
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
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button
          className="login"
          type="button"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
