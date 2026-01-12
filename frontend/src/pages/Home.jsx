import { useState, useEffect } from "react";
import { getProjects } from "../utils/api";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import SchemesSection from "../components/SchemesSection";
import CTA from "../components/CTA";
import OfficeSlider from "../components/OfficeSlider";
import { SITE_CONFIG, SCHEMES } from "../utils/constants";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="content-overlay">
        <Hero />

        <OfficeSlider />

        <section className="projects-section">
          <div className="container">
            <h2 className="section-title">Projects Completed by Us</h2>
            {loading ? (
              <div className="projects-grid">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="project-skeleton" />
                ))}
              </div>
            ) : (
              <ProjectsGrid projects={projects} loading={false} />
            )}
          </div>
        </section>

        <SchemesSection schemes={SCHEMES} />
        <CTA />

        <section className="home-footer-text">
          <div className="container">
            <p>
              &copy; {new Date().getFullYear()} {SITE_CONFIG.company}. Powering Madhya Pradesh with Solar.
            </p>
            <p className="footer-address">{SITE_CONFIG.address}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;