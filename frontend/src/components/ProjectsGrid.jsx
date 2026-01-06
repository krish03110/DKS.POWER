import React, { useState, useEffect } from "react";

const ProjectsGrid = ({ projects = [], loading = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [projectImageIndex, setProjectImageIndex] = useState({});

  useEffect(() => {
    // initialize per-project image index
    const init = {};
    projects.forEach((p) => {
      const id = p._id || p.id || p.title;
      init[id] = projectImageIndex[id] || 0;
    });
    setProjectImageIndex((prev) => ({ ...init, ...prev }));
    if (!autoSlide || projects.length === 0) return;
    const t = setInterval(() => {
      setCurrentSlide((s) => (projects.length ? (s + 1) % projects.length : 0));
    }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSlide, projects]);

  const goToSlide = (idx) => {
    if (!projects.length) return;
    setCurrentSlide(idx % projects.length);
  };

  const toggleAutoSlide = () => setAutoSlide((v) => !v);

  const prevProjectImage = (project) => {
    const id = project._id || project.id || project.title;
    const imgs = (project.images || []).slice(0, 3);
    if (!imgs.length) return;
    setProjectImageIndex((prev) => ({ ...prev, [id]: (prev[id] || 0) - 1 >= 0 ? prev[id] - 1 : imgs.length - 1 }));
  };

  const nextProjectImage = (project) => {
    const id = project._id || project.id || project.title;
    const imgs = (project.images || []).slice(0, 3);
    if (!imgs.length) return;
    setProjectImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % imgs.length }));
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

  return (
    <div className="projects-slideshow">
      {projects.map((project, idx) => {
        const id = project._id || project.id || project.title;
        const imgs = (project.images || []).slice(0, 3);
        const imgIndex = projectImageIndex[id] || 0;
        return (
          <div
            key={id || idx}
            className={`slideshow-slide ${idx === currentSlide ? "active" : ""}`}
            style={{ display: idx === currentSlide ? "block" : "none" }}
          >
            <div className="project-hero">
              {imgs.length ? (
                <>
                  <img src={imgs[imgIndex]} alt={project.title} loading="lazy" />
                  <div className="image-controls">
                    {imgs.length > 1 && (
                      <>
                        <button className="img-prev" onClick={() => prevProjectImage(project)}>‹</button>
                        <button className="img-next" onClick={() => nextProjectImage(project)}>›</button>
                      </>
                    )}
                    <div className="img-counter">{imgIndex + 1} / {imgs.length}</div>
                  </div>
                </>
              ) : (
                <div className="no-image">No image</div>
              )}

              <div className="project-overlay">
                <h3>{project.title}</h3>
                <p>
                  {typeof project.location === "string"
                    ? project.location
                    : project.location?.district || project.location?.state || ""} - {project.capacity} kW
                </p>
                <button className="view-details" onClick={() => goToSlide(idx)}>
                  View Details
                </button>
              </div>
            </div>

            <div className="slideshow-thumbs">
              {imgs.map((img, imgIdx) => (
                <img
                  key={imgIdx}
                  src={img}
                  alt={`Thumb ${imgIdx + 1}`}
                  onClick={() => setProjectImage(project, imgIdx)}
                  className={imgIdx === imgIndex ? "active-thumb" : ""}
                />
              ))}
            </div>
          </div>
        );
      })}

      <div className="slideshow-dots">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${currentSlide === idx ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>

      <button
        className="slide-prev"
        onClick={() => goToSlide((currentSlide - 1 + projects.length) % projects.length)}
      >
        ‹
      </button>
      <button className="slide-next" onClick={() => goToSlide((currentSlide + 1) % projects.length)}>
        ›
      </button>

      <button className="auto-toggle" onClick={toggleAutoSlide}>
        {autoSlide ? "⏸️" : "▶️"}
      </button>
    </div>
  );
};

export default ProjectsGrid;
