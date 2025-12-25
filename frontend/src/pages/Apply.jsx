import { useState } from 'react';
import { SITE_CONFIG } from '../utils/constants';
import { submitApplication } from '../utils/api';

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    schemeType: 'residential',
    powerRequirement: '',
    address: '',
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
      // Map fullName to name for backend compatibility
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        // Optionally include other fields if backend is updated
        schemeType: formData.schemeType,
        powerRequirement: formData.powerRequirement,
        address: formData.address
      };
      await submitApplication(payload);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        schemeType: 'residential',
        powerRequirement: '',
        address: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="apply-success">
        <div className="container">
          <div className="success-card">
            <h1 className="success-title">Application Submitted!</h1>
            <p className="success-message">
              Thank you! Our team will contact you within 24 hours to discuss your solar solution.
            </p>
            <div className="contact-info">
              <p><strong>DKS Power</strong></p>
              <p>{SITE_CONFIG.phone[0]} | {SITE_CONFIG.email}</p>
            </div>
            <button 
              onClick={() => setSuccess(false)}
              className="apply-again-btn"
            >
              Apply for Another Scheme
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <div className="container">
        <div className="apply-header">
          <h1 className="page-title">Apply for Solar Scheme</h1>
          <p className="page-subtitle">
            Get clean solar power for your home or business. 
            Fill the form and our experts will guide you.
          </p>
        </div>

        <div className="apply-content">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="apply-form">
              {/* Rest of your form code stays exactly the same */}
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
                  <label>Scheme Type *</label>
                  <select
                    name="schemeType"
                    value={formData.schemeType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="residential">Residential Solar</option>
                    <option value="commercial">Commercial Solar</option>
                    <option value="solarpump">Solar Pump</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Power Requirement (kW) *</label>
                  <input
                    type="number"
                    name="powerRequirement"
                    value={formData.powerRequirement}
                    onChange={handleChange}
                    placeholder="e.g. 3kW, 5kW"
                    step="0.1"
                    min="0.1"
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    required
                    className="form-input"
                    placeholder="Your complete address in Madhya Pradesh"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="form-input"
                  placeholder="Any specific requirements for your solar installation?"
                ></textarea>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button 
                type="submit" 
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Submitting...' : 'Apply Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;