import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get unique districts for the filter menu
  const uniqueDistricts = ['All', ...new Set(projects.map(p => p.location.district))];
  
  // Filter logic
  const displayProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.location.district === filter);

  if (loading) {
    return <div className="container" style={{padding: '4rem', textAlign: 'center'}}>Loading projects...</div>;
  }

  return (
    <div className="projects-page">
      <div className="container">
        <div className="projects-header">
          <h1 className="page-title">Our Completed Projects</h1>
          <p className="page-subtitle">
            Browse through our portfolio of over 100+ successful solar installations across Madhya Pradesh.
          </p>
        </div>

        {/* District Filter */}
        <div className="projects-filter">
          {uniqueDistricts.map(district => (
            <button 
              key={district}
              onClick={() => setFilter(district)}
              className={`filter-btn ${filter === district ? 'active' : ''}`}
            >
              {district}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {displayProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span>📍 {project.location.district}, {project.location.state}</span>
                  <span className="capacity">⚡ {project.capacity}</span>
                </div>
              </div>
              
              {/* 4 Images Grid */}
              <div className="project-images">
                {project.images.map((img, idx) => (
                  <div key={idx} className="img-wrapper">
                    <img src={img} alt={`Project view ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;