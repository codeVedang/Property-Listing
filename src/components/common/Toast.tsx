import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string | null;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, Date.now()]);

  if (!visible) return null;

  const bgColor = type === 'error' ? 'bg-red-600' : 'bg-green-600';

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-semibold shadow-xl animate-fadeIn ${bgColor}`}>
      {message}
    </div>
  );
};

export default Toast;