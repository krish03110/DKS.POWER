import { useState } from 'react';
import { forgotPassword } from '../utils/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await forgotPassword(email);
      setMessage('If an account exists, you will receive password reset instructions.');
    } catch (err) {
      // If endpoint not found, show fallback help message
      setMessage('If the server does not support password reset, please contact support or your administrator.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container">
      <h2>Forgot password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Enter your account email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}

        <div className="auth-actions">
          <button type="submit" className="cta-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;