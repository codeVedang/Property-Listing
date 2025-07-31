import React from 'react';
import { Property } from '../types/property';

interface ViewDetailsModalProps {
  property: Property;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ property, onClose }) => {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 scale-95 animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300">
          ×
        </button>
        <img src={property.imageUrl} alt={property.name} className="w-full h-72 object-cover rounded-xl mb-6" />
        <h2 className="text-3xl font-bold text-gray-900">{property.name}</h2>
        <p className="text-gray-600 mt-1 text-lg">{property.location}</p>
        <p className="text-3xl font-bold text-blue-600 my-4">₹{property.price.toLocaleString()}</p>
        <p className="text-gray-700 leading-relaxed">{property.description}</p>
      </div>
    </div>
  );
};

export default ViewDetailsModal;