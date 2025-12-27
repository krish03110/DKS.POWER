import { Link } from 'react-router-dom';

const ProjectsGrid = ({ projects = [], loading = false }) => {
  // Sample projects if no data from backend
  const defaultProjects = [
    {
      id: 1,
      title: 'Govindpura Residential Solar',
      location: 'Bhopal, MP',
      capacity: '5kW',
      type: 'Rooftop Residential',
      image: 'solar-home-1.jpg',
      status: 'Completed 2025'
    },
    {
      id: 2,
      title: 'Commercial Installation',
      location: 'Indore Industrial Area',
      capacity: '25kW',
      type: 'Commercial Rooftop',
      image: 'solar-commercial-1.jpg',
      status: 'Completed 2025'
    },
    {
      id: 3,
      title: 'Solar Pump Project',
      location: 'Hoshangabad Farms',
      capacity: '7.5HP',
      type: 'PM KUSUM Pump',
      image: 'solar-pump-1.jpg',
      status: 'Commissioned 2025'
    },
  ];

  const displayProjects = projects.length > 0 ? projects.slice(0, 4) : defaultProjects;

  if (loading) {
    return (
      <div className="projects-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="project-card skeleton">
            <div className="project-image skeleton"></div>
            <div className="project-content">
              <div className="project-title skeleton"></div>
              <div className="project-meta skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {displayProjects.map((project) => (
        <div key={project.id} className="project-card">
          <div className="project-image">
            <img 
              src={`/assets/${project.image}`} 
              alt={project.title}
              loading="lazy"
            />
            <div className="project-overlay">
              <span className="capacity-badge">{project.capacity}</span>
            </div>
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-meta">
              <span className="location">{project.location}</span>
              <span className="type">{project.type}</span>
            </div>
            <div className="project-status">
              <span className="status-badge">{project.status}</span>
            </div>
            <Link to="/contact" className="project-link">
              View Details →
            </Link>
          </div>
        </div>
      ))}
      
      <div className="view-all-cta">
        <Link to="/projects" className="cta-button">
          View All Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectsGrid;
