import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';

const AddPropertyForm: React.FC = () => {
  const { addNewProperty } = useProperties();
  const [name, setName] = useState('');
  const [type, setType] = useState('Plot');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !location || !description || !imageUrl) return alert("Please fill all fields.");
    setIsSubmitting(true);
    try {
      await addNewProperty({ name, type, price: Number(price), location, description, imageUrl });
      setName(''); setType('Plot'); setPrice(''); setLocation(''); setDescription(''); setImageUrl('');
    } catch (error) {
      alert("Error: Could not add property.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Property Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
        <select value={type} onChange={e => setType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition">
          <option>Plot</option>
          <option>Shed</option>
          <option>Retail Store</option>
        </select>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition" />
        <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all transform hover:-translate-y-0.5">
          {isSubmitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;