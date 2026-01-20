import { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../utils/constants';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Schemes = () => {
  const [activeTab, setActiveTab] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/schemes`);
        console.log('Schemes fetched:', data);
        setSchemes(data);
        if (data.length > 0) {
          setActiveTab(data[0]._id);
        }
      } catch (error) {
        console.error('Failed to fetch schemes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const getSubsidyTable = (title) => {
    if (title && title.toLowerCase().includes('surya')) {
      return (
        <table className="subsidy-table">
          <thead>
            <tr>
              <th>System Capacity</th>
              <th>Subsidy Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>for 1 kW</td><td>₹30,000</td></tr>
            <tr><td>2 kW</td><td>₹60,000</td></tr>
            <tr><td>3 kW & above</td><td>₹78,000 (Max)</td></tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading schemes...</div>;
  }

  return (
    <div className="schemes-page">
      <div className="container">
        <div className="schemes-header">
          <h1 className="page-title">Government Solar Subsidies</h1>
          <p className="page-subtitle">
            Indian Government schemes make solar power affordable. 
            Apply through DKS Power and save up to 60% on installation!
          </p>
        </div>

        {/* Schemes Tabs */}
        <div className="schemes-tabs">
          {schemes.map(scheme => (
            <div 
              key={scheme._id}
              className={`tab-item ${activeTab === scheme._id ? 'active' : ''}`}
              onClick={() => setActiveTab(scheme._id)}
            >
              {scheme.title}
            </div>
          ))}
        </div>

        {/* Active Scheme Details */}
        <div className="scheme-details">
          {schemes.map(scheme => (
            <div key={scheme._id} className={`scheme-card ${activeTab === scheme._id ? 'active' : ''}`}>
              <div className="scheme-content">
                <h2>{scheme.title}</h2>
                <p className="scheme-desc">{scheme.description}</p>
                
                {(scheme.subsidy || scheme.target) && (
                  <div className="scheme-highlight">
                    {scheme.subsidy && (
                      <div className="highlight-item">
                        <span className="highlight-label">Subsidy:</span>
                        <span className="highlight-value">{scheme.subsidy}</span>
                      </div>
                    )}
                    {scheme.target && (
                      <div className="highlight-item">
                        <span className="highlight-label">Target:</span>
                        <span className="highlight-value">{scheme.target}</span>
                      </div>
                    )}
                  </div>
                )}

                {getSubsidyTable(scheme.title)}
                <div className="scheme-actions">
                  <Link to="/apply" className="get-help-btn">
                    Get Help from DKS Power
                  </Link>
                  {scheme.link && (
                     <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="secondary-cta" style={{marginLeft: '1rem'}}>
                       Official Website
                     </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Subsidy Summary Table */}
        <section className="subsidy-summary">
          <h2 className="section-title">Subsidy at a Glance</h2>
          <div className="summary-table-wrapper">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Scheme</th>
                  <th>Max Subsidy</th>
                  <th>Who Can Apply</th>
                  <th>Portal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PM Surya Ghar</td>
                  <td>₹78,000</td>
                  <td>Households</td>
                  <td>pmsuryaghar.gov.in</td>
                </tr>
                <tr>
                  <td>PM KUSUM</td>
                  <td>60% + Loan</td>
                  <td>Farmers</td>
                  <td>mnre.gov.in</td>
                </tr>
                <tr>
                  <td>MNRE Rooftop</td>
                  <td>40% (upto 3kW)</td>
                  <td>Residential</td>
                  <td>solarrooftop.gov.in</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="schemes-cta">
          <h3>Ready to Claim Your Subsidy?</h3>
          <p>DK's Power helps you apply for all government schemes with approved vendors.</p>
          <div className="cta-buttons">
            <Link to="/apply" className="primary-cta">Apply Now</Link>
            <Link to="/contact" className="secondary-cta">Talk to Expert</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
