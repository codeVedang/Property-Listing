import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { Property } from '../types/property';
import { getProperties, addProperty, deleteProperty as apiDeleteProperty } from '../services/api';

// --- STATE AND ACTIONS ---
interface State {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Property[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD_SUCCESS'; payload: Property }
  | { type: 'DELETE_OPTIMISTIC'; payload: string }
  | { type: 'DELETE_REVERT'; payload: Property };

const initialState: State = {
  properties: [],
  isLoading: false,
  error: null,
};

// --- REDUCER ---
const propertyReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, properties: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD_SUCCESS':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'DELETE_OPTIMISTIC':
      return { ...state, properties: state.properties.filter(p => p.id !== action.payload) };
    case 'DELETE_REVERT':
      // Add the reverted property back to the list
      return { ...state, properties: [...state.properties, action.payload] };
    default:
      return state;
  }
};

// --- CONTEXT ---
export const PropertyContext = createContext<{
  state: State;
  fetchProperties: () => void;
  addNewProperty: (property: Omit<Property, 'id'>) => Promise<void>;
  deleteProperty: (propertyId: string) => Promise<void>;
}>({
  state: initialState,
  fetchProperties: () => {},
  addNewProperty: async () => {},
  deleteProperty: async () => {},
});

// --- PROVIDER ---
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  const fetchProperties = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await getProperties();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch properties.' });
    }
  }, []);

  const addNewProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      const newProperty = await addProperty(propertyData);
      dispatch({ type: 'ADD_SUCCESS', payload: newProperty });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to add property.' });
      throw e; // Re-throw to handle in form
    }
  };

  const deleteProperty = async (propertyId: string) => {
    const originalProperty = state.properties.find(p => p.id === propertyId);
    if (!originalProperty) return;

    // Optimistic UI update
    dispatch({ type: 'DELETE_OPTIMISTIC', payload: propertyId });

    try {
      await apiDeleteProperty(propertyId);
    } catch (e) {
      // If API call fails, revert the change
      dispatch({ type: 'DELETE_REVERT', payload: originalProperty });
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to delete property.' });
    }
  };

  return (
    <PropertyContext.Provider value={{ state, fetchProperties, addNewProperty, deleteProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};