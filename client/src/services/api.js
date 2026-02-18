// src/services/api.js - تأكد من وجود这部分
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// ===== PRODUCT ENDPOINTS =====
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  create: (formData) => API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => API.delete(`/products/${id}`),
};

// ===== ORDER ENDPOINTS =====
export const orderAPI = {
  create: (orderData) => API.post('/orders', orderData),
  getMyOrders: () => API.get('/orders/myorders'),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  cancel: (id) => API.put(`/orders/${id}/cancel`),
  pay: (id, paymentMethod) => API.post(`/orders/${id}/pay`, { paymentMethod }),
};

// ===== PAYMENT ENDPOINTS =====
export const paymentAPI = {
  createIntent: (orderId) => API.post('/payments/stripe/create-intent', { orderId }),
  refund: (orderId) => API.put(`/payments/refund/${orderId}`),
};

// ✅ ===== USER ENDPOINTS (لصفحة Users Management) =====
export const userAPI = {
  // Get all users with pagination and filters
  getAll: (params) => API.get('/users', { params }),
  
  // Get single user
  getOne: (id) => API.get(`/users/${id}`),
  
  // Update user role
  updateRole: (id, data) => API.put(`/users/${id}/role`, data),
  
  // Delete user
  delete: (id) => API.delete(`/users/${id}`),
  
  // Get user statistics
  getStats: () => API.get('/users/stats'),
};

export default API;