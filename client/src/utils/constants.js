// src/utils/constants.js
export const API_BASE_URL = 'http://localhost:5000/api';

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.PAID]: 'bg-green-100 text-green-800',
  [ORDER_STATUS.SHIPPED]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUS.DELIVERED]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
};

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MANAGER: 'manager',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
};