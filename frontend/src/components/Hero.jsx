  import { Link } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import { getProjects } from '../utils/api';

  const Hero = () => {
    const [projectStats, setProjectStats] = useState({
      totalCapacity: '0',
      completedCount: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProjectStats = async () => {
        try {
          // Fetch only completed projects
          const response = await getProjects();
          const completedProjects = response.data.filter(
            (project) => project.status === 'completed'
          );

          // Calculate total capacity
          let totalCapacity = 0;
          completedProjects.forEach((project) => {
            if (project.capacity) {
              const capacityValue = parseInt(project.capacity);
              if (!isNaN(capacityValue)) {
                totalCapacity += capacityValue;
              }
            }
          });

          setProjectStats({
            totalCapacity: totalCapacity > 0 ? `${totalCapacity}kw` : '0kw',
            completedCount: completedProjects.length,
          });
        } catch (error) {
          console.error('Error fetching project stats:', error);
          // Keep default values if fetch fails
        } finally {
          setLoading(false);
        }
      };

      fetchProjectStats();
    }, []);

    return (
      <section className="hero-section">
        <div className="container">
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
                  <span className="stat-number">{loading ? '...' : projectStats.totalCapacity}</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">MP</span>
                  <span className="stat-label">Wide Service</span>
                </div>
                <div className="stat">
                  <span className="stat-number">60</span>
                  <span className="stat-label">Happy Customer</span>
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
