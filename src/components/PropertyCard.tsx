import React from 'react';
import { Property } from '../types/property';
import { useProperties } from '../hooks/useProperties';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const { deleteProperty } = useProperties();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${property.name}"?`)) {
      deleteProperty(property.id);
    }
  };

  return (
    <div onClick={() => onViewDetails(property)} className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer animate-fadeIn">
      <div className="relative">
        <img src={property.imageUrl} alt={property.name} className="w-full h-56 object-cover" />
        <div onClick={handleDelete} className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600">
          ×
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">{property.name}</h3>
        <p className="text-gray-500 mt-1">{property.location}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">{property.type}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;