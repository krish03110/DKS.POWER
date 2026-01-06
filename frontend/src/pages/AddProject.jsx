import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../utils/api';
const MP_DISTRICTS = [
  'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat',
  'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur',
  'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas',
  'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda',
  'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni',
  'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena',
  'Murwara', 'Narmadapuram', 'Neemuch', 'Niwari', 'Panna',
  'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar',
  'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur',
  'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh',
  'Ujjain', 'Umaria', 'Vidisha'
];
const AddProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    district: '',
    state: 'Madhya Pradesh',
    capacity: '',
    status: 'pending',
    description: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Build FormData for multipart upload (fields + files)
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description || '');
      fd.append('district', formData.district || '');
      fd.append('state', formData.state || '');
      fd.append('capacity', formData.capacity || '');
      fd.append('status', formData.status || 'pending');

      files.forEach((file) => {
        fd.append('images', file);
      });

      const res = await createProject(fd);
      if (res && res.status === 201) {
        navigate('/projects');
      }
    } catch (err) {
      // Log full axios error for debugging
      console.error('Create project error:', err);
      // Prefer server-provided message when available
      const serverMsg = err?.response?.data?.message || err?.response?.data || err.message || 'Failed to create project';
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-page">
      <div className="container">
        <h1 className="page-title">Add New Project</h1>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Project Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} className="form-input" required placeholder="e.g. Solar Installation at MP Nagar" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>District *</label>
                <select name="district" value={formData.district} onChange={handleChange} className="form-input" required placeholder="e.g. Bhopal">
                  <option value="">Select District</option>
                  {MP_DISTRICTS.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                  <label>capacity(kW) *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g. 3kW, 5kW"
                    step="0.1"
                    min="0.1"
                    required
                    className="form-input"
                    />
              </div>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="form-textarea" placeholder="Project details..." />
            </div>

            <div className="form-group">
              <label>Panel Top View</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                className="form-input"
              />
              
            </div>
            <div className="form-group">
              <label>Panel Front View </label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                className="form-input"
              />
              
            </div><div className="form-group">
              <label>Inverter image </label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange} 
                className="form-input"
              />
              
            </div>

            {error && <div className="error-message">{error}</div>}

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