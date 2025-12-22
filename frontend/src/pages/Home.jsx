import { useState, useEffect, useRef } from "react";
import { getProjects } from "../utils/api";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import SchemesSection from "../components/SchemesSection";
import CTA from "../components/CTA";
import { SITE_CONFIG, SCHEMES } from "../utils/constants";
const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  // Vanta Birds Animation
  useEffect(() => {
    if (!vantaRef.current || !window.VANTA || !window.VANTA.BIRDS) return;

    const effect = window.VANTA.BIRDS({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: 0x1E7F4F, // Primary Green
      color2: 0xFFC107, // Highlight Yellow
      birdSize: 1.0,
      wingSpan: 30.0,
      speedLimit: 5.0,
      separation: 20.0,
      cohesion: 20.0,
      quantity: 5,
      backgroundAlpha: 1.0,
      backgroundColor: 0x1E7F4F, // Primary Green
      colorMode: "varianceGradient",
    });

    vantaEffectRef.current = effect;

    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data.slice(0, 4));
      } catch (error) {
        console.warn("API not reachable, using default project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Animated Birds Background */}
      <div ref={vantaRef} className="vanta-bg" />

      {/* Overlay Content */}
      <div className="content-overlay">
        <Hero />

        {/* Projects Section */}
        <section className="projects-section">
          <div className="container">
            <h2 className="section-title">Projects Completed by Us</h2>
            {loading ? (
              <div className="projects-grid">
                <div className="project-skeleton" />
                <div className="project-skeleton" />
                <div className="project-skeleton" />
                <div className="project-skeleton" />
              </div>
            ) : (
              <ProjectsGrid projects={projects} loading={false} />
            )}
          </div>
        </section>

        {/* Schemes & CTA */}
        <SchemesSection schemes={SCHEMES} />
        <CTA />

        {/* Optional small footer text if you really want it inside Home */}
        <section className="home-footer-text">
          <div className="container">
            <p>
              &copy; 2025 {SITE_CONFIG.company}. Powering Madhya Pradesh with
              Solar.
            </p>
            <p className="footer-address">{SITE_CONFIG.address}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
