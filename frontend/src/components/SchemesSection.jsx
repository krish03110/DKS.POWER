import { Link } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
  return (
    <div className="scheme-card" style={{ borderColor: scheme.color }}>
      <div className="scheme-icon">{scheme.icon}</div>
      <h3 className="scheme-title">{scheme.title}</h3>
      <p className="scheme-subtitle">{scheme.subtitle}</p>
      <p className="scheme-subsidy">{scheme.subsidy}</p>
      <p className="scheme-desc">{scheme.desc}</p>
    </div>
  );
};

export const SchemesSection = ({ schemes = [] }) => {
  const defaultSchemes = [
    {
      id: 1,
      title: 'PM Surya Ghar Muft Bijli Yojana',
      subtitle: 'Up to 300 Units Free Electricity',
      subsidy: '₹78,000 (3kW)',
      desc: 'Get rooftop solar for your home with 60% central subsidy.',
      icon: '🏠',
      color: '#10b981'
    },
    {
      id: 2,
      title: 'PM KUSUM Yojana',
      subtitle: 'Solar Pumps for Farmers',
      subsidy: '60% Subsidy + 30% Loan',
      desc: 'Replace diesel pumps with solar for agriculture.',
      icon: '🌾',
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'MNRE Rooftop Solar',
      subtitle: 'Grid Connected Systems',
      subsidy: '40% upto 3kW',
      desc: 'Central subsidy for residential rooftops.',
      icon: '🏢',
      color: '#3b82f6'
    }
  ];

  const displaySchemes = schemes.length > 0 ? schemes : defaultSchemes;

  return (
    <section className="schemes-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Government Solar Schemes</h2>
          <p className="section-subtitle">Save up to 60% with govt subsidies</p>
        </div>

        <div className="schemes-grid">
          {displaySchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        <div className="schemes-cta">
          <Link to="/apply" className="cta-button">Check Eligibility</Link>
        </div>
      </div>
    </section>
  );
};

export default SchemesSection;