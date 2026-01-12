import { useState } from 'react';
import { SITE_CONFIG } from '../utils/constants'; // Adjust path as needed

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    
    const whatsappNumber = '9893302902';
  
    const userPhone = formData.phone.replace(/[^0-9]/g, ''); // Clean phone
    const text = `New Contact Inquiry%0A%0AName: ${encodeURIComponent(formData.fullName)}%0APhone: ${userPhone}%0AEmail: ${encodeURIComponent(formData.email)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    
    // Redirect to WhatsApp Web/Mobile
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="contact-page">
      <div className="container">
        <form onSubmit={handleWhatsAppRedirect} className="contact-form">
          <h2>Get in Touch</h2>
          
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="whatsapp-btn">
            Start WhatsApp Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
