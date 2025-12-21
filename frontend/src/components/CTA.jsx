import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container cta-container">
        <div className="cta-text">
          <h2 className="cta-title">
            Ready to Install Your <span>Solar System</span>?
          </h2>
          <p className="cta-subtitle">
            Get a free site assessment and subsidy guidance for your home or business in Madhya Pradesh.
          </p>
        </div>

        <div className="cta-actions">
          <Link to="/apply" className="cta-primary-btn">
            Get Free Solar Quote
          </Link>
          <Link to="/contact" className="cta-secondary-btn">
            Talk to Our Expert
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
