import axios from 'axios';
import { SITE_CONFIG } from './constants';

const api = axios.create({
  baseURL: SITE_CONFIG.apiBase,
});

export const submitApplication = (data) => api.post('/applications', data);
export const submitContact = (data) => api.post('/contact', data);

// NEW: fetch projects
export const getProjects = () => api.get('/projects');

export default api;
