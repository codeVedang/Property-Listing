import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};