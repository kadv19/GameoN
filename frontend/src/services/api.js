import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Add CORS headers for all requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-ADMIN-TOKEN, MEMBER-TOKEN',
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...corsHeaders,
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['X-ADMIN-TOKEN'] = token; // For admin routes
      config.headers['MEMBER-TOKEN'] = token; // For member routes
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  adminLogin: (credentials) => api.post('/admin/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// Members API
export const membersAPI = {
  create: (memberData) => api.post('/members', memberData),
  getAll: () => api.get('/members'),
  getById: (id) => api.get(`/members/${id}`),
  searchByPhone: (phone) => api.get(`/members/search/phone/${phone}`),
  searchByName: (name) => api.get(`/members/search/name/${name}`),
  searchByUsername: (username) => api.get(`/members/search/username/${username}`),
  update: (id, data) => api.put(`/members/${id}`, data),
  delete: (id) => api.delete(`/members/${id}`),
};

// Games API
export const gamesAPI = {
  getAll: () => api.get('/games'),
  getById: (id) => api.get(`/games/${id}`),
  create: (gameData) => api.post('/games', gameData),
  update: (id, data) => api.put(`/games/${id}`, data),
  delete: (id) => api.delete(`/games/${id}`),
};

// Transactions API
export const transactionsAPI = {
  create: (transactionData) => api.post('/transactions', transactionData),
  getAll: () => api.get('/transactions'),
  delete: (id) => api.delete(`/transactions/${id}`),
  deleteAll: () => api.delete('/transactions'),
};

// Recharges API
export const rechargesAPI = {
  create: (rechargeData) => api.post('/recharges', rechargeData),
  getAll: () => api.get('/recharges'),
};

// Collections API
export const collectionsAPI = {
  getByDate: (date) => api.get(`/admin/dashboard/collections/${date}`),
  getToday: () => api.get('/admin/dashboard/collections/today'),
};

// Admin API
export const adminAPI = {
  getMembers: () => api.get('/admin/dashboard/members'),
  getMemberById: (id) => api.get(`/admin/dashboard/members/${id}`),
  updateMember: (id, data) => api.put(`/admin/dashboard/members/${id}`, data),
  deleteMember: (id) => api.delete(`/admin/dashboard/members/${id}`),
  getGames: () => api.get('/admin/dashboard/games'),
  createGame: (gameData) => api.post('/admin/dashboard/games', gameData),
  updateGame: (id, data) => api.put(`/admin/dashboard/games/${id}`, data),
  deleteGame: (id) => api.delete(`/admin/dashboard/games/${id}`),
  getTransactions: () => api.get('/admin/dashboard/transactions'),
  getRecharges: () => api.get('/admin/dashboard/recharges'),
};

export default api;