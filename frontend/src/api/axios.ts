import axios from "axios";

// Use Vercel proxy in production, direct API in development
const BASE_URL = import.meta.env.PROD 
  ? "/api/proxy/api" 
  : import.meta.env.VITE_API_URL || "http://localhost:4000/api";

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
