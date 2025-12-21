import { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG, SCHEMES } from '../utils/constants';
import { getProjects } from '../utils/api';
import Hero from '../components/Hero';
import ProjectsGrid from '../components/ProjectsGrid';
import SchemesSection from '../components/SchemesSection';
import CTA from '../components/CTA';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // Vanta Birds Animation (exact params from your link)
  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = window.VANTA.BIRDS({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color1: 0x10b981,  // Green birds
      color2: 0x059669,  // Dark green birds
      birdSize: 1.00,
      wingSpan: 30.00,
      speedLimit: 5.00,
      separation: 20.00,
      cohesion: 20.00,
      quantity: 5,
      backgroundAlpha: 0.0,  // Transparent background
      backgroundColor: 0xffffff,  // White (won't show)
      colorMode: "varianceGradient"
    });

    vantaEffectRef.current = effect;

    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Animated Birds Background */}
      <div ref={vantaRef} className="vanta-bg"></div>
      
      {/* Overlay Content */}
      <div className="content-overlay">
        <Hero />
        
        <section className="projects-section">
          <div className="container">
            <h2 className="section-title">Projects Completed by Us</h2>
            {loading ? (
              <div className="projects-grid">
                <div className="project-skeleton"></div>
                <div className="project-skeleton"></div>
                <div className="project-skeleton"></div>
                <div className="project-skeleton"></div>
              </div>
            ) : (
              <ProjectsGrid projects={projects} />
            )}
          </div>
        </section>

        <SchemesSection schemes={SCHEMES} />
        <CTA />
        
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 {SITE_CONFIG.company}. Powering Madhya Pradesh with Solar.</p>
            <p className="footer-address">{SITE_CONFIG.address}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
