import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex items-center justify-center">
        {/* Outer Circle */}
        <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-opacity-75"></div>

        {/* Inner Circle */}
        <div className="absolute animate-spin-reverse rounded-full h-12 w-12 border-t-4 border-red-400 border-opacity-50"></div>

        {/* Center Dot */}
        <div className="h-4 w-4 bg-red-600 rounded-full"></div>
      </div>
    </div>
  );
};