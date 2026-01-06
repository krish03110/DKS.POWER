import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// You will need to add createProject to your ../utils/api file
import { createProject } from '../utils/api'; 
import './AddProject.css';

const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    district: '',
    state: 'Madhya Pradesh',
    capacity: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    // Convert FileList to Array
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = new FormData();
      data.append('title', formData.title);
      // Sending nested object data usually requires specific formatting or backend handling
      // Here we send them as flat keys or bracket notation depending on backend expectation
      data.append('location[district]', formData.district);
      data.append('location[state]', formData.state);
      data.append('capacity', formData.capacity);
      
      // Append each selected image file
      files.forEach(file => {
        data.append('images', file);
      });

      await createProject(data);
      alert('Project added successfully!');
      navigate('/projects');
    } catch (error) {
      console.error("Error uploading project", error);
      alert("Failed to upload project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-page">
      <div className="container">
        <div className="contact-header" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
          <h1 className="page-title" style={{ color: '#1E7F4F' }}>Add New Project</h1>
        </div>

        <div className="contact-form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Project Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} className="form-input" required placeholder="e.g. Solar Installation at MP Nagar" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>District *</label>
                <input name="district" value={formData.district} onChange={handleChange} className="form-input" required placeholder="e.g. Bhopal" />
              </div>
              <div className="form-group">
                <label>Capacity *</label>
                <input name="capacity" value={formData.capacity} onChange={handleChange} className="form-input" required placeholder="e.g. 5kW" />
              </div>
            </div>

            <div className="form-group">
              <label>Project Images (Select up to 4) *</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                className="form-input"
                required
              />
              <small style={{color: '#666'}}>Hold Ctrl (Windows) or Cmd (Mac) to select multiple files.</small>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Uploading...' : 'Add Project'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;