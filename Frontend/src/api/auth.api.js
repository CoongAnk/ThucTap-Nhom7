import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Create axios instance
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Register a new user
 * @param {Object} userData - { email, password, name, role, birthDay }
 * @returns {Promise} - { accessToken }
 */
export const register = async (userData) => {
  try {
    const response = await authAPI.post("/register", {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role,
      birthDay: userData.birthDay,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise} - { accessToken }
 */
export const login = async (credentials) => {
  try {
    const response = await authAPI.post("/login", {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Store access token in localStorage
 * @param {string} token
 */
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 * Get access token from localStorage
 * @returns {string|null}
 */
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Clear access token (logout)
 */
export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
  delete authAPI.defaults.headers.common.Authorization;
};

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAccessToken();
};

export default authAPI;
