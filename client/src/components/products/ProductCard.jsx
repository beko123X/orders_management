// src/components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// ✅ Backend Base URL
const API_BASE_URL = 'http://localhost:5000';

// ✅ Default image (Base64)
const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'16\' fill=\'%239ca3af\'%3ENo Image%3C/text%3E%3C/svg%3E';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(() => {
    // ✅ Build correct image URL
    if (product?.imageUrl) {
      // If URL starts with /uploads
      if (product.imageUrl.startsWith('/uploads')) {
        return API_BASE_URL + product.imageUrl;
      }
      // If it's a full URL
      return product.imageUrl;
    }
    return DEFAULT_IMAGE;
  });

  console.log('🖼️ Product:', product.name, 'Image URL:', imgSrc);

  const handleImageError = () => {
    console.log('❌ Failed to load image:', imgSrc);
    setImageError(true);
    setImgSrc(DEFAULT_IMAGE);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', imgSrc);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link to={`/products/${product._id}`} className="block h-48 bg-gray-100 relative">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm">❌ Failed to load</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span className={`text-sm ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to={`/products/${product._id}`}
            className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
          
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;