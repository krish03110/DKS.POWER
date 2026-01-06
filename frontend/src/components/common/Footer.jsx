import { Link } from 'react-router-dom';
import logo from '../../dks.png';
import facebookLogo from '../../assets/facebook-logo.svg';
import instagramLogo from '../../assets/instagram-logo.svg';
import { SITE_CONFIG } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <img src={logo} alt="DKS Marketing" className="logo-img" />
                <p className="footer-tagline">Power Your Life With Clean Solar Energy</p>
              </div>
              <div className="social-links">
                <a href="https://www.facebook.com/dksmarketingbpl" className="social-link" aria-label="Facebook">
                  <img src={facebookLogo} alt="Facebook" className="social-logo" />
                </a>
                <a href="https://www.instagram.com/p/DSPBaNUCD69/" className="social-link" aria-label="Instagram">
                  <img src={instagramLogo} alt="Instagram" className="social-logo" />
                </a>
                <a href={`mailto:${SITE_CONFIG.email}`} className="social-link" aria-label="Email">
                  <span className="social-icon">✉️</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/schemes">Subsidies</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><Link to="/services">Residential Solar</Link></li>
                <li><Link to="/services">Commercial Solar</Link></li>
                <li><Link to="/services">Maintenance</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-details">
                <p className="contact-item">
                  📞 <a href={`tel:${SITE_CONFIG.phone[0]}`}>{SITE_CONFIG.phone[0]}</a>
                </p>
                <p className="contact-item">
                  📍 {SITE_CONFIG.address}
                </p>
                <p className="contact-item">
                  ✉️ <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-content">
            <p>&copy; 2025 DKS Power. All rights reserved. | Serving Madhya Pradesh</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
