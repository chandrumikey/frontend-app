import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    if (result.success) {
      navigate('/login', { 
        state: { message: 'Registration successful! Please login.' } 
      });
    } else {
      // Extract error message from the error object
      if (typeof result.error === 'object' && result.error.detail) {
        // Handle array of error objects from FastAPI
        if (Array.isArray(result.error.detail)) {
          setError(result.error.detail.map(err => err.msg).join(', '));
        } else {
          // Handle single error object
          setError(result.error.detail.msg || result.error.detail);
        }
      } else if (typeof result.error === 'string') {
        setError(result.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login" className="custom-login-link">
  Login here
</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;