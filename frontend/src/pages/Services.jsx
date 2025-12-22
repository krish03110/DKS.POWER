import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../utils/constants';

const Services = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Residential Solar Installation',
      desc: 'Complete rooftop solar systems for homes (1kW - 10kW). Reduce electricity bills by 80-100%. Government subsidy eligible.',
      features: ['Site survey & design', 'Panel + inverter installation', 'Net metering setup', '25-year warranty']
    },
    {
      icon: '🏢',
      title: 'Commercial Solar Systems',
      desc: 'Large-scale solar for businesses, factories & offices. Payback in 3-5 years with high ROI. Custom financing available.',
      features: ['Ground/rooftop mount', 'Power plant design', 'Grid connectivity', 'Performance guarantee']
    },
    {
      icon: '🔧',
      title: 'Solar Panel Maintenance',
      desc: 'Annual cleaning, performance checks & repairs. Keep your system at 98% efficiency. MNRE approved service.',
      features: ['Dust & dirt cleaning', 'Thermal imaging', 'Inverter servicing', 'AMC contracts']
    },
    {
      icon: '⚡',
      title: 'Solar Pump Installation',
      desc: 'PM KUSUM scheme pumps for farmers. 60% subsidy + 30% loan. Reliable water supply without diesel.',
      features: ['3HP to 10HP pumps', 'Submersible/surface', 'Remote monitoring', 'Subsidy assistance']
    },
    {
      icon: '📋',
      title: 'Subsidy & Documentation',
      desc: 'Complete government subsidy paperwork. PM Surya Ghar, KUSUM, MNRE applications handled.',
      features: ['Online portal filing', 'Vendor empanelment', 'Net metering NOC', '100% success rate']
    },
    {
      icon: '📞',
      title: 'Site Assessment & Consultation',
      desc: 'Free site visit, solar potential analysis & custom quotes. Shadow analysis & load calculation.',
      features: ['Roof/space evaluation', 'Energy audit', 'ROI calculation', 'No obligation quote']
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <div className="services-header">
          <h1 className="page-title">Our Solar Services</h1>
          <p className="page-subtitle">
            End-to-end solar solutions from consultation to maintenance. 
            MNRE approved vendor serving Madhya Pradesh.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i} className="feature-item">✅ {feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="service-cta">Get Quote</Link>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <section className="process-section">
          <h2 className="section-title">Our 5-Step Process</h2>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Free Consultation</h3>
              <p>Site visit + energy audit + custom proposal</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Design & Quote</h3>
              <p>System design + subsidy calculation + financing</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Approval & Subsidy</h3>
              <p>Government paperwork + net metering + permissions</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Installation</h3>
              <p>2-3 day professional installation + testing</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Handover & Support</h3>
              <p>Commissioning + training + 25-year support</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-section">
          <div className="content-wrapper">
            <div className="why-text">
              <h2 className="section-title">Why DKS Power?</h2>
              <ul className="why-list">
                <li>MNRE approved vendor</li>
                <li>100+ successful installations</li>
                <li>Local Bhopal team - fast service</li>
                <li>Complete subsidy assistance</li>
                <li>25-year panel warranty</li>
                <li>5-year service guarantee</li>
              </ul>
            </div>
            <div className="contact-block">
              <h3>Ready to Go Solar?</h3>
              <p>Call us today for free consultation</p>
              <div className="contact-highlight">
                <div className="phone-display">{SITE_CONFIG.phone[0]}</div>
                <Link to="/contact" className="contact-btn">Book Site Visit</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
