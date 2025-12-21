import { useState } from 'react';
import { SITE_CONFIG } from '../utils/constants';
import { Link } from 'react-router-dom';

const Schemes = () => {
  const [activeTab, setActiveTab] = useState('pm-surya');

  const schemes = [
    {
      id: 'pm-surya',
      title: 'PM Surya Ghar Muft Bijli Yojana',
      desc: 'Rooftop solar for homes - Get up to 300 units free electricity monthly',
      subsidy: '₹78,000 for 3kW system',
      target: 'Residential households',
      portal: 'pmsuryaghar.gov.in'
    },
    {
      id: 'kusum',
      title: 'PM KUSUM Yojana',
      desc: 'Solar pumps & power plants for farmers',
      subsidy: 'Up to 60% subsidy + 30% loan',
      target: 'Farmers & agriculture',
      portal: 'mnre.gov.in'
    },
    {
      id: 'rooftop',
      title: 'Grid-Connected Rooftop Solar (MNRE)',
      desc: 'Central subsidy for homes & institutions',
      subsidy: '40% up to 3kW, 20% for 3-10kW',
      target: 'Residential & Institutional',
      portal: 'solarrooftop.gov.in'
    }
  ];

  const getSubsidyTable = (schemeId) => {
    if (schemeId === 'pm-surya') {
      return (
        <table className="subsidy-table">
          <thead>
            <tr>
              <th>System Capacity</th>
              <th>Subsidy Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Up to 1 kW</td><td>₹30,000</td></tr>
            <tr><td>2 kW</td><td>₹60,000</td></tr>
            <tr><td>3 kW & above</td><td>₹78,000 (Max)</td></tr>
          </tbody>
        </table>
      );
    }
    return null;
  };

  return (
    <div className="schemes-page">
      <div className="container">
        <div className="schemes-header">
          <h1 className="page-title">Government Solar Subsidies</h1>
          <p className="page-subtitle">
            Indian Government schemes make solar power affordable. 
            Apply through DK's Power and save up to 60% on installation!
          </p>
        </div>

        {/* Schemes Tabs */}
        <div className="schemes-tabs">
          {schemes.map(scheme => (
            <div 
              key={scheme.id}
              className={`tab-item ${activeTab === scheme.id ? 'active' : ''}`}
              onClick={() => setActiveTab(scheme.id)}
            >
              {scheme.title}
            </div>
          ))}
        </div>

        {/* Active Scheme Details */}
        <div className="scheme-details">
          {schemes.map(scheme => (
            <div key={scheme.id} className={`scheme-card ${activeTab === scheme.id ? 'active' : ''}`}>
              <div className="scheme-content">
                <h2>{scheme.title}</h2>
                <p className="scheme-desc">{scheme.desc}</p>
                <div className="scheme-highlight">
                  <div className="highlight-item">
                    <span className="highlight-label">Subsidy:</span>
                    <span className="highlight-value">{scheme.subsidy}</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-label">Target:</span>
                    <span className="highlight-value">{scheme.target}</span>
                  </div>
                </div>
                {getSubsidyTable(scheme.id)}
                <div className="scheme-actions">
                  <a 
                    href={`https://${scheme.portal}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="apply-portal-btn"
                  >
                    Apply Online →
                  </a>
                  <Link to="/apply" className="get-help-btn">
                    Get Help from DK's Power
                  </Link>
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
