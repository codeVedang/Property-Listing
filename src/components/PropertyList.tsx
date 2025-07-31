import React, { useState, useMemo, useEffect } from 'react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from './PropertyCard';
import ViewDetailsModal from './ViewDetailsModal';
import { SkeletonCard } from './common/SkeletonCard';
import { Property } from '../types/property';

const PropertyList: React.FC = () => {
  const { state, fetchProperties } = useProperties();
  const { properties, isLoading } = state;

  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => { fetchProperties() }, [fetchProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType ? p.type === filterType : true)
    );
  }, [properties, searchTerm, filterType]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input type="text" placeholder="Search by name or location..." onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
        <select onChange={(e) => setFilterType(e.target.value)} className="w-full sm:w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
          <option value="">All Types</option>
          <option value="Plot">Plot</option>
          <option value="Shed">Shed</option>
          <option value="Retail Store">Retail Store</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isLoading && properties.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : (
          filteredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} onViewDetails={() => setSelectedProperty(prop)} />
          ))
        )}
      </div>
      {selectedProperty && (
        <ViewDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}
    </section>
  );
};

export default PropertyList;