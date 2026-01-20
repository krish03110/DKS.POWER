import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';



import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Dashboard,
  Add,
  Edit,
  Delete as DeleteIcon,
  Folder,
  Business,
  Build,
  Settings,
} from '@mui/icons-material';
import axios from 'axios';

const drawerWidth = 240;
const API_BASE_URL = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [sliderDialog, setSliderDialog] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [sliderFormData, setSliderFormData] = useState({
    title: '',
    subtitle: '',
    order: 0,
  });
  const [sliderImage, setSliderImage] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [schemeDialog, setSchemeDialog] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [schemeFormData, setSchemeFormData] = useState({
    title: '',
    description: '',
    subsidy: '',
    target: '',
    link: '',
  });
  const [services, setServices] = useState([]);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: '',
    description: '',
    icon: '',
    price: '',
    features: '',
  });

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchStats();
    } else if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'offices') {
      fetchSliderImages();
    } else if (activeTab === 'schemes') {
      fetchSchemes();
    } else if (activeTab === 'services') {
      fetchServices();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/projects/stats`);
      setStats(res.data);
    } catch (err) {
      showAlert('Failed to fetch stats', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/projects`);
      setProjects(res.data);
    } catch (err) {
      showAlert('Failed to fetch projects', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  const fetchSliderImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/slider-images`);
      setSliderImages(res.data);
    } catch (err) {
      showAlert('Failed to fetch slider images', 'error');
      console.error(err);
    }
    setLoading(false);
  };

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/schemes`);
      console.log('Fetched schemes:', res.data);
      setSchemes(res.data);
    } catch (err) {
      showAlert('Failed to fetch schemes', 'error');
      console.error('Error fetching schemes:', err);
    }
    setLoading(false);
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/services`);
      console.log('Fetched services:', res.data);
      setServices(res.data);
    } catch (err) {
      showAlert('Failed to fetch services', 'error');
      console.error('Error fetching services:', err);
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`);
        showAlert('Project deleted successfully', 'success');
        fetchProjects();
      } catch (err) {
        showAlert('Failed to delete project', 'error');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/projects/${projectId}/status`, {
        status: newStatus,
      });
      showAlert('Project status updated', 'success');
      fetchProjects();
    } catch (err) {
      showAlert('Failed to update status', 'error');
      console.error(err);
    }
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 3000);
  };

  const handleOpenOfficeDialog = (image = null) => {
    if (image) {
      setEditingSlider(image);
      setSliderFormData({
        title: image.title,
        subtitle: image.subtitle || '',
        order: image.order || 0,
      });
    } else {
      setEditingSlider(null);
      setSliderFormData({
        title: '',
        subtitle: '',
        order: 0,
      });
    }
    setSliderImage(null);
    setSliderDialog(true);
  };

  const handleCloseOfficeDialog = () => {
    setSliderDialog(false);
    setEditingSlider(null);
    setSliderImage(null);
  };

  const handleOfficeInputChange = (e) => {
    const { name, value } = e.target;
    setSliderFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) : value,
    }));
  };

  const handleOfficeImageChange = (e) => {
    setSliderImage(e.target.files[0]);
  };

  const handleOfficeSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!sliderFormData.title.trim()) {
      showAlert('Please enter a picture title', 'error');
      return;
    }

    if (!editingSlider && !sliderImage) {
      showAlert('Please select an image', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', sliderFormData.title);
      formData.append('subtitle', sliderFormData.subtitle);
      formData.append('order', sliderFormData.order);

      if (sliderImage) {
        formData.append('images', sliderImage);
      }

      if (editingSlider) {
        await axios.put(`${API_BASE_URL}/admin/slider-images/${editingSlider._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Slider image updated successfully', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/admin/slider-images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showAlert('Slider image added successfully', 'success');
      }
      handleCloseOfficeDialog();
      fetchSliderImages();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save slider image';
      showAlert(errorMessage, 'error');
      console.error('Error uploading image:', err);
    }
  };

  const handleDeleteOffice = async (id) => {
    if (window.confirm('Are you sure you want to delete this slider image?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/slider-images/${id}`);
        showAlert('Slider image deleted successfully', 'success');
        fetchSliderImages();
      } catch (err) {
        showAlert('Failed to delete slider image', 'error');
        console.error(err);
      }
    }
  };

  const handleOpenSchemeDialog = (scheme = null) => {
    if (scheme) {
      setEditingScheme(scheme);
      setSchemeFormData({
        title: scheme.title,
        description: scheme.description || '',
        subsidy: scheme.subsidy || '',
        target: scheme.target || '',
        link: scheme.link || '',
      });
    } else {
      setEditingScheme(null);
      setSchemeFormData({
        title: '',
        description: '',
        subsidy: '',
        target: '',
        link: '',
      });
    }
    setSchemeDialog(true);
  };

  const handleCloseSchemeDialog = () => {
    setSchemeDialog(false);
    setEditingScheme(null);
  };

  const handleSchemeInputChange = (e) => {
    const { name, value } = e.target;
    setSchemeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSchemeSubmit = async (e) => {
    e.preventDefault();
    if (!schemeFormData.title.trim()) {
      showAlert('Please enter a scheme title', 'error');
      return;
    }

    try {
      if (editingScheme) {
        await axios.put(`${API_BASE_URL}/admin/schemes/${editingScheme._id}`, schemeFormData);
        showAlert('Scheme updated successfully', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/admin/schemes`, schemeFormData);
        showAlert('Scheme added successfully', 'success');
      }
      handleCloseSchemeDialog();
      fetchSchemes();
    } catch (err) {
      showAlert('Failed to save scheme', 'error');
      console.error(err);
    }
  };

  const handleDeleteScheme = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/schemes/${id}`);
        showAlert('Scheme deleted successfully', 'success');
        fetchSchemes();
      } catch (err) {
        showAlert('Failed to delete scheme', 'error');
        console.error(err);
      }
    }
  };

  const handleOpenServiceDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceFormData({
        title: service.title,
        description: service.description || '',
        icon: service.icon || '',
        price: service.price || '',
        features: service.features ? service.features.join('\n') : '',
      });
    } else {
      setEditingService(null);
      setServiceFormData({
        title: '',
        description: '',
        icon: '',
        price: '',
        features: '',
      });
    }
    setServiceDialog(true);
  };

  const handleCloseServiceDialog = () => {
    setServiceDialog(false);
    setEditingService(null);
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!serviceFormData.title.trim()) {
      showAlert('Please enter a service title', 'error');
      return;
    }

    try {
      const features = serviceFormData.features
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const serviceData = {
        title: serviceFormData.title,
        description: serviceFormData.description,
        icon: serviceFormData.icon,
        price: serviceFormData.price,
        features,
      };

      if (editingService) {
        await axios.put(`${API_BASE_URL}/admin/services/${editingService._id}`, serviceData);
        showAlert('Service updated successfully', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/admin/services`, serviceData);
        showAlert('Service added successfully', 'success');
      }
      handleCloseServiceDialog();
      fetchServices();
    } catch (err) {
      showAlert('Failed to save service', 'error');
      console.error(err);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/services/${id}`);
        showAlert('Service deleted successfully', 'success');
        fetchServices();
      } catch (err) {
        showAlert('Failed to delete service', 'error');
        console.error(err);
      }
    }
  };

  const tabs = [
    { icon: <Dashboard />, label: 'Dashboard', key: 'dashboard' },
    { icon: <Folder />, label: 'Projects', key: 'projects' },
    { icon: <Business />, label: 'Offices', key: 'offices' },
    { icon: <Build />, label: 'Schemes', key: 'schemes' },
    { icon: <Settings />, label: 'Services', key: 'services' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#1976d2',
        }}
      >
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <Toolbar />
        <List>
          {tabs.map((tab) => (
            <ListItem
              button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              selected={activeTab === tab.key}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  borderLeft: '4px solid #1976d2',
                },
              }}
            >
              <ListItemIcon>{tab.icon}</ListItemIcon>
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Toolbar />
        {alert.show && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, show: false })}
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        )}

        {activeTab === 'dashboard' && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Dashboard Overview
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Total Projects
                      </Typography>
                      <Typography variant="h5">{stats.total}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Completed
                      </Typography>
                      <Typography variant="h5" sx={{ color: '#4caf50' }}>
                        {stats.completed}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Pending
                      </Typography>
                      <Typography variant="h5" sx={{ color: '#ff9800' }}>
                        {stats.pending}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        )}

        {activeTab === 'projects' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Manage Projects</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/add-project')}
              >
                Add Project
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : projects.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography>No projects found</Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} key={project._id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">{project.title}</Typography>
                            <Typography color="textSecondary" sx={{ mb: 1 }}>
                              {project.description}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth size="small">
                                  <InputLabel>Status</InputLabel>
                                  <Select
                                    value={project.status}
                                    label="Status"
                                    onChange={(e) =>
                                      handleStatusChange(project._id, e.target.value)
                                    }
                                  >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="completed">Completed</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              {project.location?.district && (
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="body2">
                                    <strong>Location:</strong> {project.location.district}, {project.location.state}
                                  </Typography>
                                </Grid>
                              )}
                              {project.capacity && (
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="body2">
                                    <strong>Capacity:</strong> {project.capacity}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </Box>
                          <Box sx={{ ml: 2 }}>
                            <Button
                              startIcon={<Edit />}
                              onClick={() => navigate(`/add-project/${project._id}`)}
                              variant="outlined"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              color="error"
                              onClick={() => handleDeleteProject(project._id)}
                              variant="outlined"
                              size="small"
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {activeTab === 'offices' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Manage Office Slider Pictures</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenOfficeDialog()}
              >
                Add Picture
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : sliderImages.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography>No slider images found</Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {sliderImages.map((image) => (
                  <Grid item xs={12} md={6} key={image._id}>
                    <Card>
                      <CardContent>
                        {image.imageUrl && (
                          <Box
                            component="img"
                            src={image.imageUrl}
                            alt={image.title}
                            sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 1, mb: 2 }}
                          />
                        )}
                        <Typography variant="h6">{image.title}</Typography>
                        {image.subtitle && (
                          <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>
                            {image.subtitle}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          <strong>Order:</strong> {image.order}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            startIcon={<Edit />}
                            onClick={() => handleOpenOfficeDialog(image)}
                            variant="outlined"
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteOffice(image._id)}
                            variant="outlined"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            <Dialog open={sliderDialog} onClose={handleCloseOfficeDialog} maxWidth="sm" fullWidth>
              <DialogTitle>{editingSlider ? 'Edit Slider Picture' : 'Add New Slider Picture'}</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Picture Title"
                    name="title"
                    value={sliderFormData.title}
                    onChange={handleOfficeInputChange}
                    required
                    placeholder="e.g., Our Modern Workspace"
                  />
                  <TextField
                    fullWidth
                    label="Subtitle (Optional)"
                    name="subtitle"
                    value={sliderFormData.subtitle}
                    onChange={handleOfficeInputChange}
                    placeholder="e.g., A look at our office"
                  />
                  <TextField
                    fullWidth
                    label="Display Order"
                    name="order"
                    type="number"
                    value={sliderFormData.order}
                    onChange={handleOfficeInputChange}
                  />
                  <Box sx={{ p: 2, border: '2px dashed #ccc', borderRadius: 1, textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { borderColor: '#1976d2', backgroundColor: '#f5f5f5' } }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleOfficeImageChange}
                      style={{ display: 'none' }}
                      id="slider-image-input"
                    />
                    <label htmlFor="slider-image-input" style={{ cursor: 'pointer', display: 'block' }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {sliderImage ? sliderImage.name : 'Click to select an image'}
                      </Typography>
                      {!sliderImage && <Typography variant="caption" sx={{ color: '#666' }}>or drag and drop</Typography>}
                    </label>
                  </Box>
                  {editingSlider && (
                    <Typography variant="caption" sx={{ color: '#666', fontStyle: 'italic' }}>
                      Leave image empty to keep current one
                    </Typography>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseOfficeDialog}>Cancel</Button>
                <Button 
                  onClick={handleOfficeSubmit} 
                  variant="contained"
                  disabled={!sliderFormData.title.trim() || (!editingSlider && !sliderImage)}
                >
                  {editingSlider ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}

        {activeTab === 'schemes' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Manage Schemes</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenSchemeDialog()}
              >
                Add Scheme
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : schemes.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography>No schemes found</Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {schemes.map((scheme) => (
                  <Grid item xs={12} md={6} key={scheme._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{scheme.title}</Typography>
                        <Typography color="textSecondary" sx={{ mb: 1 }}>
                          {scheme.description}
                        </Typography>
                        {scheme.subsidy && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Subsidy:</strong> {scheme.subsidy}
                          </Typography>
                        )}
                        {scheme.target && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Target:</strong> {scheme.target}
                          </Typography>
                        )}
                        {scheme.link && (
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            <a href={scheme.link} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                              Visit Link
                            </a>
                          </Typography>
                        )}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            startIcon={<Edit />}
                            onClick={() => handleOpenSchemeDialog(scheme)}
                            variant="outlined"
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteScheme(scheme._id)}
                            variant="outlined"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            <Dialog open={schemeDialog} onClose={handleCloseSchemeDialog} maxWidth="sm" fullWidth>
              <DialogTitle>{editingScheme ? 'Edit Scheme' : 'Add New Scheme'}</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Scheme Title"
                    name="title"
                    value={schemeFormData.title}
                    onChange={handleSchemeInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={schemeFormData.description}
                    onChange={handleSchemeInputChange}
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    label="Subsidy Details"
                    name="subsidy"
                    value={schemeFormData.subsidy}
                    onChange={handleSchemeInputChange}
                    placeholder="e.g. ₹78,000 for 3kW system"
                  />
                  <TextField
                    fullWidth
                    label="Target Audience"
                    name="target"
                    value={schemeFormData.target}
                    onChange={handleSchemeInputChange}
                    placeholder="e.g. Residential households"
                  />
                  <TextField
                    fullWidth
                    label="Link (Optional)"
                    name="link"
                    value={schemeFormData.link}
                    onChange={handleSchemeInputChange}
                    placeholder="https://"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseSchemeDialog}>Cancel</Button>
                <Button 
                  onClick={handleSchemeSubmit} 
                  variant="contained"
                  disabled={!schemeFormData.title.trim()}
                >
                  {editingScheme ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}

        {activeTab === 'services' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Manage Services</Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenServiceDialog()}
              >
                Add Service
              </Button>
            </Box>

            {loading ? (
              <CircularProgress />
            ) : services.length === 0 ? (
              <Card>
                <CardContent>
                  <Typography>No services found</Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {services.map((service) => (
                  <Grid item xs={12} md={6} key={service._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{service.title}</Typography>
                        {service.icon && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Icon:</strong> {service.icon}
                          </Typography>
                        )}
                        {service.price && (
                          <Typography variant="body2" sx={{ mb: 1, color: '#1976d2', fontWeight: 'bold' }}>
                            {service.price}
                          </Typography>
                        )}
                        <Typography color="textSecondary" sx={{ mb: 1 }}>
                          {service.description}
                        </Typography>
                        {service.features && service.features.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              <strong>Features:</strong>
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {service.features.map((feature, idx) => (
                                <li key={idx}>
                                  <Typography variant="caption">{feature}</Typography>
                                </li>
                              ))}
                            </ul>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            startIcon={<Edit />}
                            onClick={() => handleOpenServiceDialog(service)}
                            variant="outlined"
                            size="small"
                          >
                            Edit
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => handleDeleteService(service._id)}
                            variant="outlined"
                            size="small"
                          >
                            Delete
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            <Dialog open={serviceDialog} onClose={handleCloseServiceDialog} maxWidth="sm" fullWidth>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogContent>
                <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Service Title"
                    name="title"
                    value={serviceFormData.title}
                    onChange={handleServiceInputChange}
                    required
                    placeholder="e.g., Solar Panel Installation"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={serviceFormData.description}
                    onChange={handleServiceInputChange}
                    multiline
                    rows={3}
                    placeholder="Describe the service..."
                  />
                  <TextField
                    fullWidth
                    label="Icon (emoji or icon name)"
                    name="icon"
                    value={serviceFormData.icon}
                    onChange={handleServiceInputChange}
                    placeholder="e.g., ☀️ or solar"
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={serviceFormData.price}
                    onChange={handleServiceInputChange}
                    placeholder="e.g., ₹5,000 - ₹15,000"
                  />
                  <TextField
                    fullWidth
                    label="Features (one per line)"
                    name="features"
                    value={serviceFormData.features}
                    onChange={handleServiceInputChange}
                    multiline
                    rows={4}
                    placeholder="Feature 1 - Enter each feature on a new line"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseServiceDialog}>Cancel</Button>
                <Button 
                  onClick={handleServiceSubmit} 
                  variant="contained"
                  disabled={!serviceFormData.title.trim()}
                >
                  {editingService ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
