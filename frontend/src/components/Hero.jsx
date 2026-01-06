  import { Link } from 'react-router-dom';

  const Hero = () => {
    return (
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Power Your Life With  
              <span className="highlight"> Clean Solar</span> Energy
            </h1>
            <p className="hero-subtitle" font-color="black">
              Solar Solutions That Power Your Growth. From small homes to large 
              commercial spaces, we deliver high-efficiency solar systems engineered 
              for performance and long-term value.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">MP</span>
                <span className="stat-label">Wide Service</span>
              </div>
              <div className="stat">
                <span className="stat-number">60%</span>
                <span className="stat-label">Govt Subsidy</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/apply" className="cta-primary">
                Get Free Quote
              </Link>
              <Link to="/services" className="cta-secondary">
                View Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="trust-bar">
          <div className="container">
            <div className="trust-items">
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span>MNRE Approved</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🏢</span>
                <span>Govt Vendor</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span>5-Star Service</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">📞</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Hero;
