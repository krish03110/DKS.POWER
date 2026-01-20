import React, { useState, useEffect, useCallback, useRef } from "react";

const ProjectsGrid = ({ projects = [], loading = false, onProjectSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [projectImageIndex, setProjectImageIndex] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const intervalRef = useRef(null);
  const projectsRef = useRef(projects);

  // Update projects ref when projects change
  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  const goToSlide = useCallback((idx) => {
    if (!projectsRef.current.length || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(idx % projectsRef.current.length);
    
    // Reset interval after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  }, [isTransitioning]);

  const handleProjectSelect = useCallback((project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  }, [onProjectSelect]);

  // Auto-slide logic - FIXED
  const startAutoSlide = useCallback(() => {
    if (!autoSlide || projectsRef.current.length === 0) return;
    
    intervalRef.current = setInterval(() => {
      if (!isTransitioning && projectsRef.current.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % projectsRef.current.length);
      }
    }, 2500); // Faster speed: 2.5 seconds instead of 4
  }, [autoSlide, isTransitioning]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initialize project images and setup auto-slide
  useEffect(() => {
    // Initialize per-project image index
    const init = {};
    projects.forEach((p) => {
      const id = p._id || p.id || p.title;
      init[id] = projectImageIndex[id] || 0;
    });
    setProjectImageIndex((prev) => ({ ...init, ...prev }));

    // Stop previous interval
    stopAutoSlide();
    
    // Start new interval
    startAutoSlide();

    return () => stopAutoSlide();
  }, [projects, autoSlide, startAutoSlide, stopAutoSlide]);

  const toggleAutoSlide = () => {
    setAutoSlide((prev) => {
      const newValue = !prev;
      if (newValue) {
        startAutoSlide();
      } else {
        stopAutoSlide();
      }
      return newValue;
    });
  };

  // Transition end handler
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const prevProjectImage = (project) => {
    const id = project._id || project.id || project.title;
    const imgs = (project.images || []).slice(0, 3);
    if (!imgs.length) return;
    setProjectImageIndex((prev) => ({ 
      ...prev, 
      [id]: (prev[id] || 0) - 1 >= 0 ? prev[id] - 1 : imgs.length - 1 
    }));
  };

  const nextProjectImage = (project) => {
    const id = project._id || project.id || project.title;
    const imgs = (project.images || []).slice(0, 3);
    if (!imgs.length) return;
    setProjectImageIndex((prev) => ({ 
      ...prev, 
      [id]: ((prev[id] || 0) + 1) % imgs.length 
    }));
  };

  const setProjectImage = (project, idx) => {
    const id = project._id || project.id || project.title;
    setProjectImageIndex((prev) => ({ ...prev, [id]: idx }));
  };

  if (loading) {
    return (
      <div className="projects-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="project-skeleton" />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return <div className="projects-grid empty">No projects available</div>;
  }

  return (
    <div className="projects-slideshow">
      <div className="slideshow-container" style={{ display: 'grid', gridTemplateAreas: '"slide"', overflow: 'hidden', position: 'relative', minHeight: '500px' }}>
        {projects.map((project, idx) => {
          const id = project._id || project.id || project.title;
          const imgs = (project.images || []).slice(0, 3);
          const imgIndex = projectImageIndex[id] || 0;
          
          return (
            <div
              key={id || idx}
              className={`slideshow-slide ${idx === currentSlide ? "active" : ""}`}
              style={{ 
                gridArea: 'slide',
                width: '100%',
                height: '100%',
                transform: `translateX(${(idx - currentSlide) * 100}%)`,
                transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
              }}
            >
              <div className="project-hero">
                {imgs.length ? (
                  <>
                    <img 
                      src={imgs[imgIndex]} 
                      alt={project.title} 
                      loading="lazy"
                    />
                
                  </>
                ) : (
                  <div className="no-image">No image available</div>
                )}

                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>
                    {typeof project.location === "string"
                      ? project.location
                      : project.location?.district || project.location?.state || ""} - {project.capacity} kW
                  </p>
                  <button 
                    className="view-details" 
                    onClick={() => handleProjectSelect(project)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="slideshow-dots">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${currentSlide === idx ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
