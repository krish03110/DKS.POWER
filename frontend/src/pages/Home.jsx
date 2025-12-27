import { useState, useEffect } from "react";
import { getProjects } from "../utils/api";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import SchemesSection from "../components/SchemesSection";
import CTA from "../components/CTA";
import { SITE_CONFIG, SCHEMES } from "../utils/constants";
import solarImg from "../assets/solar.jpg";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <>
      {/* INLINE CSS FOR HOME PAGE */}
      <style>{`
        .home-wrapper {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* solar.jpg must be in /public or src/assets and path updated below */
        .home-bg-image {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url("/solar.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -2;
        }

        /* dark green overlay so text is readable on the photo */
        .home-bg-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 10% 10%, rgba(238, 185, 185, 0.08) 0%, transparent 80%),
                      // radial-gradient(circle at 80% 90%, rgba(241, 180, 180, 0.05) 0%, transparent 80%),
                      // rgba(0, 0, 0, 0.55);
          z-index: -1;
        }

        .content-overlay {
          position: relative;
          z-index: 1;
          min-height: 100vh;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #F7AC05 0%, #FFD700 50%, #29B675 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #F7AC05, #29B675);
          border-radius: 2px;
        }

        .projects-section {
          padding: 5rem 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2.5rem;
          margin-top: 2rem;
        }

        .project-skeleton {
          height: 300px;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.10) 25%,
            rgba(255,255,255,0.35) 50%,
            rgba(255,255,255,0.10) 75%
          );
          background-size: 200% 100%;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(41, 182, 117, 0.4);
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .home-footer-text {
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          padding: 3rem 0;
          margin-top: 6rem;
          border-top: 1px solid rgba(148, 163, 184, 0.4);
        }

        .home-footer-text p {
          text-align: center;
          color: #E0F2E9;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .footer-address {
          font-size: 1.1rem;
          opacity: 0.9;
          text-align: center;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.8rem;
          }
          .container {
            padding: 0 1.5rem;
          }
        }
      `}</style>

      <div className="home-wrapper">
        {/* Background image + overlay */}
        <div
          className="home-bg-image"
          style={{ backgroundImage: `url(${solarImg})` }}
        />
        <div className="home-bg-overlay" />

        {/* Main content */}
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

          {/* Footer text */}
          <section className="home-footer-text">
            <div className="container">
              <p>
                &copy; 2025 {SITE_CONFIG.company}. Powering Madhya Pradesh with Solar.
              </p>
              <p className="footer-address">{SITE_CONFIG.address}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
