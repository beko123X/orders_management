// src/components/admin/OrderDetailsModal.jsx
import React from 'react';
import { X, Package, User, Mail, Calendar, DollarSign, MapPin } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (e) => {
    onStatusChange(order._id, e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
            <p className="text-sm text-gray-500 mt-1">Order #{order._id?.slice(-8)}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Order Status and Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Order Status</p>
              <select
                value={order.status}
                onChange={handleStatusChange}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(order.status)}`}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <span className={`inline-block px-3 py-1.5 rounded-lg text-sm font-medium
                ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
              `}>
                {order.isPaid ? 'Paid' : 'Unpaid'}
              </span>
              {order.paidAt && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(order.paidAt)}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="font-medium capitalize">{order.paymentMethod || 'Cash'}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-500" />
              Customer Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{order.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{order.user?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-mono text-sm">{order.user?._id || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                Shipping Address
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Package className="h-5 w-5 mr-2 text-gray-500" />
              Order Items
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Product</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Quantity</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.products?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{item.product?.name || 'Product'}</p>
                          {item.product?.sku && (
                            <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">${item.price?.toFixed(2)}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4 font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${order.totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-blue-600">${order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              Order Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-24 text-sm text-gray-500">Created:</div>
                <div className="text-sm">{formatDate(order.createdAt)}</div>
              </div>
              {order.paidAt && (
                <div className="flex items-start">
                  <div className="w-24 text-sm text-gray-500">Paid:</div>
                  <div className="text-sm">{formatDate(order.paidAt)}</div>
                </div>
              )}
              {order.shippedAt && (
                <div className="flex items-start">
                  <div className="w-24 text-sm text-gray-500">Shipped:</div>
                  <div className="text-sm">{formatDate(order.shippedAt)}</div>
                </div>
              )}
              {order.deliveredAt && (
                <div className="flex items-start">
                  <div className="w-24 text-sm text-gray-500">Delivered:</div>
                  <div className="text-sm">{formatDate(order.deliveredAt)}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;