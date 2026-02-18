// src/pages/MyOrders.jsx - نسخة محسنة مع تصميم جميل
import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ChevronRight,
  Eye
} from 'lucide-react';
import { orderAPI } from '../services/api';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const API_BASE_URL = 'http://localhost:5000';

// دالة الحصول على رابط الصورة
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/')) return API_BASE_URL + imageUrl;
  return API_BASE_URL + '/' + imageUrl;
};

// دالة الحصول على ألوان الحالة
const getStatusStyle = (status) => {
  const styles = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: <Clock className="h-4 w-4" />,
      label: 'Pending'
    },
    paid: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <CheckCircle className="h-4 w-4" />,
      label: 'Paid'
    },
    shipped: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <Truck className="h-4 w-4" />,
      label: 'Shipped'
    },
    delivered: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      icon: <CheckCircle className="h-4 w-4" />,
      label: 'Delivered'
    },
    cancelled: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <XCircle className="h-4 w-4" />,
      label: 'Cancelled'
    }
  };
  return styles[status] || styles.pending;
};

// دالة تنسيق التاريخ
const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getMyOrders();
      console.log('Orders data:', data);
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="h-8 w-8 mr-3 text-blue-600" />
            My Orders
          </h1>
          <p className="text-gray-600 mt-2 ml-11">
            Track and manage your orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't placed any orders. Start shopping to see your orders here!
            </p>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
            >
              Browse Products
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusStyle = getStatusStyle(order.status);
              
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <div className="flex items-center space-x-2">
                          <Package className="h-5 w-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-500">
                            Order #{order._id.slice(-8)}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.icon}
                          <span className="ml-1">{statusStyle.label}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="flex items-center font-semibold text-gray-900">
                          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                          ${order.totalPrice}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Package className="h-4 w-4 mr-2 text-blue-600" />
                      Items ({order.products.length})
                    </h3>
                    
                    <div className="space-y-4">
                      {order.products.map((item, idx) => {
                        const productId = item.product?._id || idx;
                        const imageUrl = getImageUrl(item.product?.imageUrl);
                        const showImage = imageUrl && !imageErrors[productId];

                        return (
                          <div
                            key={idx}
                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            {/* Product Image */}
                            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0 border border-gray-200">
                              {showImage ? (
                                <img
                                  src={imageUrl}
                                  alt={item.product?.name}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(productId)}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <Package className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {item.product?.name || 'Product'}
                                  </h4>
                                  {item.product?.description && (
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                      {item.product.description}
                                    </p>
                                  )}
                                </div>
                                <span className="font-bold text-blue-600">
                                  ${(item.quantity * item.price).toFixed(2)}
                                </span>
                              </div>
                              
                              <div className="flex items-center mt-2 text-sm text-gray-600">
                                <span className="bg-gray-200 px-2 py-1 rounded-md">
                                  Qty: {item.quantity}
                                </span>
                                <span className="mx-2">×</span>
                                <span>${item.price} each</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center text-sm text-gray-600 mb-3 sm:mb-0">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        <span>Shipping to: <span className="font-medium">Ahmed Mohamed</span></span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {order.status === 'pending' && !order.isPaid && (
                          <>
                            <button
                              onClick={() => {/* handle pay */}}
                              className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                            >
                              Pay Now
                            </button>
                            <button
                              onClick={() => {/* handle cancel */}}
                              className="flex-1 sm:flex-none px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Order Details</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono">{selectedOrder._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(selectedOrder.status).bg} ${getStatusStyle(selectedOrder.status).text}`}>
                      {getStatusStyle(selectedOrder.status).icon}
                      <span className="ml-1">{getStatusStyle(selectedOrder.status).label}</span>
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Items</p>
                    <div className="space-y-3">
                      {selectedOrder.products.map((item, idx) => {
                        const productId = item.product?._id || idx;
                        const imageUrl = getImageUrl(item.product?.imageUrl);
                        const showImage = imageUrl && !imageErrors[productId];

                        return (
                          <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                              {showImage ? (
                                <img
                                  src={imageUrl}
                                  alt={item.product?.name}
                                  className="w-full h-full object-cover"
                                  onError={() => handleImageError(productId)}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.product?.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">${selectedOrder.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;