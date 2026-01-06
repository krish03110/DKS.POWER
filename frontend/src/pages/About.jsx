import { SITE_CONFIG } from '../utils/constants';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="page-title">About DKS Power</h1>
          <p className="hero-subtitle">
            Powering Madhya Pradesh with Clean Solar Energy Solutions
          </p>
        </div>

        {/* Company Story */}
        <section className="about-story">
          <div className="content-grid">
            <div className="story-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="story-para">
                DKS Power is committed to delivering high-efficiency solar systems 
                engineered for performance and long-term value. From small homes to 
                large commercial spaces, we provide reliable solar solutions tailored 
                to each customer's needs.
              </p>
              <p className="story-para">
                Based in Bhopal, we serve multiple locations across Madhya Pradesh, 
                bringing clean energy to residential and commercial customers with 
                our commitment to quality, safety, and sustainability.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">MP Wide</div>
                <div className="stat-label">Service Coverage</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="services-overview">
          <h2 className="section-title">What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Residential Solar Installation</h3>
              <p>High-efficiency systems for homes that reduce electricity bills and provide energy independence.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Commercial & Factory Solar </h3>
              <p>Scalable solutions for businesses designed for maximum ROI and long-term reliability.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Installation & Maintenance</h3>
              <p>Professional installation with ongoing support and maintenance for peak performance.</p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="contact-section">
          <h2 className="section-title">Get Started Today</h2>
          <div className="contact-highlight">
            <div className="contact-details">
              <p><strong>📍 {SITE_CONFIG.address}</strong></p>
              <p>📞 {SITE_CONFIG.phone[0]} | {SITE_CONFIG.phone[1]}</p>
              <p>✉️ <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a></p>
            </div>
            <a href="/contact" className="cta-button">Contact Us Now</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
