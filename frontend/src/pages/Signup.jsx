import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
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
      const { data } = await registerUser({ name, email, password, role });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container">
      <h2>Create account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error && <div className="form-error">{error}</div>}

        <div className="auth-actions">
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </div>

        <div className="signup-prompt">
          Already have an account? <button type="button" className="link-button" onClick={() => navigate('/login')}>Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;