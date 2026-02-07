import axios from "axios";

// Use Vercel proxy in production, Vite dev proxy in development
const BASE_URL = import.meta.env.PROD 
  ? "/api/proxy/api" 
  : "/api";  // Vite dev proxy will forward to backend

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
