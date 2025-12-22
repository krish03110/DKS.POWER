import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // This simulates your database of 100+ projects.
    // In the future, you can replace this with an API call.
    const generateProjects = () => {
      const districts = ['Bhopal', 'Indore', 'Raisen', 'Vidisha', 'Sehore', 'Dewas'];
      const data = [];
      
      // Generating mock data for demonstration
      for (let i = 1; i <= 12; i++) { 
        const district = districts[Math.floor(Math.random() * districts.length)];
        data.push({
          id: i,
          title: `${district} Solar Installation #${i}`,
          client: `Client ${i}`,
          location: {
            district: district,
            state: 'Madhya Pradesh'
          },
          capacity: `${Math.floor(Math.random() * 10) + 3}kW`,
          // 4 Images per project as requested
          images: [
            `https://placehold.co/400x300/e2e8f0/1e293b?text=Site+${i}-1`,
            `https://placehold.co/400x300/e2e8f0/1e293b?text=Panel+${i}-2`,
            `https://placehold.co/400x300/e2e8f0/1e293b?text=Inverter+${i}-3`,
            `https://placehold.co/400x300/e2e8f0/1e293b?text=Meter+${i}-4`,
          ]
        });
      }
      return data;
    };

    setProjects(generateProjects());
  }, []);

  // Get unique districts for the filter menu
  const uniqueDistricts = ['All', ...new Set(projects.map(p => p.location.district))];
  
  // Filter logic
  const displayProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.location.district === filter);

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