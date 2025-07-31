import axios from 'axios';
import { Property } from '../types/property';

const API_URL ='https://688b64aa2a52cabb9f51913d.mockapi.io/Property';

export const getProperties = async (): Promise<Property[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProperty = async (property: Omit<Property, 'id'>): Promise<Property> => {
  const response = await axios.post(API_URL, property);
  return response.data;
};

// New delete function
export const deleteProperty = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};