// src/utils/imageHelper.js
const API_BASE_URL = 'http://localhost:5000';

export const getFullImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // إذا كان الرابط كامل (يبدأ بـ http)
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // إذا كان الرابط نسبي (يبدأ بـ /)
  if (imageUrl.startsWith('/')) {
    return API_BASE_URL + imageUrl;
  }
  
  // إذا كان الرابط بدون slash
  return API_BASE_URL + '/' + imageUrl;
};

export const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'14\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';