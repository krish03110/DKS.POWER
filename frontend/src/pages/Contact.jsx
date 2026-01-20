import { SITE_CONFIG } from '../utils/constants';

const Contact = () => {
  // Format phone number for WhatsApp (removes spaces/dashes)
  const whatsappNumber = SITE_CONFIG.phone[0].replace(/\D/g, '');
  const instagramUsername = "dkspower_solar"; // Replace with your actual username

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">Contact DKS Power</h1>
          <p className="page-subtitle">
            We help homeowners switch to clean and affordable solar energy with end-to-end residential rooftop solutions. From site survey and system design to installation and subsidy assistance, our experts ensure maximum savings and long-term performance.
          </p>
        </div>

        <div className="contact-grid">
          {/* WhatsApp Card */}
          <a 
            href={`https://wa.me/${9893636226}?text=Hi DKS Power, I am interested in a solar installation.`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-card whatsapp"
          >
            <div className="card-icon">💬</div>
            <h2>WhatsApp Chat</h2>
            <p>Get an instant quote with us on whatsapp.</p>
            <span className="chat-btn">Message on WhatsApp</span>
          </a>

          {/* Instagram Card */}
          <a 
            href={`https://www.instagram.com/p/DSPBaNUCD69/${instagramUsername}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-card instagram"
          >
            <div className="card-icon">📸</div>
            <h2>Instagram</h2>
            <p>Follow our latest projects and DM us for consultations.</p>
            <span className="chat-btn">Message on Instagram</span>
          </a>
        </div>

        <div className="office-info">
          <h3>Visit Our Office</h3>
          <p>📍 {SITE_CONFIG.address}</p>
          <p>📞 {SITE_CONFIG.phone[0]} | {SITE_CONFIG.phone[1]}</p>
          <p>✉️ {SITE_CONFIG.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;