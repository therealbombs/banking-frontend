// src/services/api.ts
import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const api = axios.create({  // Aggiungiamo 'export'
  baseURL: API_CONFIG.baseURL,
});

// Interceptor per gestione token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
