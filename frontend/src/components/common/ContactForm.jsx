import { useState } from 'react';
import { SITE_CONFIG } from '../../utils/constants';
import { submitContact } from '../../utils/api';

const ContactForm = ({ onSuccess, title = "Send Message" }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await submitContact(formData);
      setSuccess(true);
      if (onSuccess) onSuccess(formData);
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="contact-form-success">
        <div className="success-icon">✅</div>
        <h3 className="success-title">Message Sent Successfully!</h3>
        <p className="success-message">
          Thank you {formData.fullName}! We'll get back to you within 24 hours.
        </p>
        <div className="success-contact">
          <p><strong>DKSPower</strong></p>
          <p>{SITE_CONFIG.phone[0]}</p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="reset-form-btn"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Your contact number"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            id="subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Solar inquiry, pricing quote, installation"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          required
          className="form-textarea"
          placeholder="Tell us about your solar requirements or questions..."
        ></textarea>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        className={`submit-btn ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Sending Message...
          </>
        ) : (
          title
        )}
      </button>
    </form>
  );
};

export default ContactForm;
