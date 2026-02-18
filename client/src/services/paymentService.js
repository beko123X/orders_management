// src/services/paymentService.js
import API from './api';

const paymentService = {
  createPaymentIntent: (orderId) => 
    API.post('/payments/stripe/create-intent', { orderId }),
  
  refundOrder: (orderId) => 
    API.put(`/payments/refund/${orderId}`),
  
  confirmPayment: (paymentIntentId) => 
    API.post('/payments/confirm', { paymentIntentId }),
};

export default paymentService;