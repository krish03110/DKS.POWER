import axios from 'axios';
import { SITE_CONFIG } from './constants';

const api = axios.create({
  baseURL: SITE_CONFIG.apiBase,
});

// Add auth token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth APIs
export const submitApplication = (data) => api.post('/applications', data);
export const submitContact = (data) => api.post('/contact', data);

// Project APIs
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// User/Auth APIs
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (data) => api.post('/auth/register', data);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (data) => api.post('/auth/reset-password', data);

export default api;
