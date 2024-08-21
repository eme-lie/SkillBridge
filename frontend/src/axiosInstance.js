// src/axiosInstance.js
import axios from "axios";

// Access the environment variable
const apiUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  // Optional: other default configurations
  // timeout: 10000, // Example timeout setting
});

export default axiosInstance;
