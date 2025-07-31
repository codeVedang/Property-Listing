import React from 'react';
import { PropertyProvider } from './context/PropertyContext';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import AddPropertyForm from './components/AddPropertyForm';
import Toast from './components/common/Toast';
import { useProperties } from './hooks/useProperties';

// A component to render the main content and consume the context
const Dashboard = () => {
  const { state } = useProperties();
  return (
    <>
      <Toast message={state.error} type="error" />
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyList />
        </div>
        <div>
          <AddPropertyForm />
        </div>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <PropertyProvider>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Header />
          <Dashboard />
        </div>
      </div>
    </PropertyProvider>
  );
};

export default App;