import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginUser({ email, password });
      // Save token and user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user?.role === 'admin' || role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          I am
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error && <div className="form-error">{error}</div>}

        <div className="auth-actions">
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <button type="button" className="link-button" onClick={() => navigate('/forgot-password')}>
            Forgot password?
          </button>
        </div>

        <div className="signup-prompt">
          Don't have an account? <button type="button" className="link-button" onClick={() => navigate('/signup')}>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;