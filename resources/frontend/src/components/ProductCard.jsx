import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ id, image, name, description, category, price, featured }) {
  const [imageError, setImageError] = useState(false);

  // Fallback image if main image fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80";

  return (
    <div className="bg-[#282b40] border-2 border-[#3a3f5c] overflow-hidden group hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={imageError ? fallbackImage : image} 
          alt={name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#282b40] via-transparent to-transparent opacity-60"></div>
        
        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Featured
          </span>
        )}

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-[#1f2235]/90 backdrop-blur-sm text-cyan-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
          {category}
        </span>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-[#282b40]/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            to={`/products/${id}`}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 font-bold uppercase text-sm hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-[#3a3f5c]">
          {price ? (
            <span className="text-2xl font-bold text-white">{price}</span>
          ) : (
            <span className="text-sm text-cyan-400 uppercase tracking-wider font-medium">Contact for Price</span>
          )}
          
          <Link 
            to={`/products/${id}`}
            className="text-cyan-400 hover:text-white transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default ProductCard;