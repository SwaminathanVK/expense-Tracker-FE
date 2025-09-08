// utils/axiosInstance.js
import axios from "axios";

// 🔗 Backend Base URL (Render Deployment or Local)
const baseURL = "https://expense-tracker-7sfy.onrender.com/api/v1";

// Create instance
const axiosInstance = axios.create({
  baseURL,
  withCredentials: false, // we’re using JWT in headers, not cookies
});

// Attach Token Automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global Response Interceptor (optional, helps handle 401 errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout on token expiry
      localStorage.removeItem("token");
      window.location.href = "/login"; // or navigate("/login") if using React Router
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
