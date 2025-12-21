import { useState } from 'react';
import { SITE_CONFIG } from '../utils/constants';
import { submitContact } from '../utils/api';

const Contact = () => {
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
      <div className="contact-success">
        <div className="container">
          <div className="success-card">
            <h1 className="success-title">Message Sent Successfully!</h1>
            <p className="success-message">
              Thank you {formData.fullName}! We'll get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="new-message-btn"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">Get In Touch With Us</h1>
          <p className="page-subtitle">
            Have questions about solar installation, pricing, or our services? 
            Our team is here to help.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info-card">
            <h3 className="info-title">Contact Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="info-link">
                    dks.power.ingmail.com
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p className="info-text">{SITE_CONFIG.phone[0]}</p>
                  <p className="info-text">{SITE_CONFIG.phone[1]}</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p className="info-text">{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🌞</div>
                <div>
                  <h4>Service Area</h4>
                  <p className="info-text">Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3 className="form-title">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Solar inquiry, pricing, installation"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="form-textarea"
                  placeholder="Tell us about your solar requirements..."
                ></textarea>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
