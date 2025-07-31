import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="pb-6 mb-8 border-b border-gray-200">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
        Property Dashboard
      </h1>
    </header>
  );
};

export default Header;