import { useState, useEffect } from 'react';
import { getProjects } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentSlides, setCurrentSlides] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        const raw = data || [];

        const normalized = raw.map((p) => {
          const id = p._id || p.id || p.title;
          const location = {
            district: p.location?.district || 'Murwara',
            state: p.location?.state || 'Madhya Pradesh'
          };
          const capacity = p.capacity || '';
          const status = p.status || 'Completed';
          const description = p.description || '';
          const images = (p.images && p.images.length) ? p.images : (p.imageUrl ? [p.imageUrl] : []);

          // Initialize slideshow
          setCurrentSlides(prev => ({ ...prev, [id]: 0 }));

          return { ...p, id, location, capacity, status, description, images };
        });

        setProjects(normalized);
        console.log('Projects by district:', normalized.reduce((acc, p) => {
          acc[p.location.district] = (acc[p.location.district] || 0) + 1;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // **ONLY districts where you have installed solar projects**
  const uniqueDistricts = ['All', ...new Set(projects.map(p => p.location?.district || 'Unknown'))].sort();

  // Slideshow controls
  const goToSlide = (projectId, direction) => {
    setCurrentSlides(prev => {
      const current = prev[projectId] || 0;
      const total = projects.find(p => p.id === projectId)?.images?.length || 1;
      const nextSlide = direction === 'next' 
        ? (current + 1) % total 
        : (current - 1 + total) % total;
      return { ...prev, [projectId]: nextSlide };
    });
  };

  const displayProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.location?.district === filter);

  if (loading) {
    return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading projects...</div>;
  }

  return (
    <div className="projects-page">
      <div className="container">
        <div className="projects-header">
          <h1 className="page-title">Our Solar Projects</h1>
          <p className="page-subtitle">
            Browse our successful installations across {uniqueDistricts.length - 1} districts in Madhya Pradesh.
          </p>
        </div>

        {/* **ONLY districts with actual projects** */}
        <div className="projects-filter">
          {uniqueDistricts.map(district => (
            <button 
              key={district}
              onClick={() => setFilter(district)}
              className={`filter-btn ${filter === district ? 'active' : ''}`}
            >
              {district === 'All' ? 'All Projects' : district}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {displayProjects.map(project => {
            const currentSlideIndex = currentSlides[project.id] || 0;
            const totalSlides = project.images?.length || 1;
            
            return (
              <div key={project.id} className="project-card">
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-meta">
                    <span>📍 {project.location?.district}, {project.location?.state}</span>
                    <span className="capacity">⚡ {project.capacity || 'N/A'}</span>
                    <span className={`status ${project.status.toLowerCase()}`}>{project.status}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>

                {/* Slideshow */}
                <div className="project-images">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <div className="slideshow-hero">
                        <img 
                          src={project.images[currentSlideIndex]} 
                          alt={`${project.title} - Slide ${currentSlideIndex + 1}`} 
                          className="hero-image"
                        />
                        <div className="slideshow-indicators">
                          {project.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`indicator ${idx === currentSlideIndex ? 'active' : ''}`}
                              onClick={() => setCurrentSlides(prev => ({ ...prev, [project.id]: idx }))}
                            />
                          ))}
                        </div>
                        <div className="slide-counter">
                          {currentSlideIndex + 1} / {totalSlides}
                        </div>
                      </div>

                      {totalSlides > 1 && (
                        <>
                          <button 
                            className="slide-prev"
                            onClick={() => goToSlide(project.id, 'prev')}
                          >
                            ‹
                          </button>
                          <button 
                            className="slide-next"
                            onClick={() => goToSlide(project.id, 'next')}
                          >
                            ›
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="no-image">No images available</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {displayProjects.length === 0 && !loading && filter !== 'All' && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
            <h3>No projects in {filter}</h3>
            <p>Check other districts for our solar installations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
