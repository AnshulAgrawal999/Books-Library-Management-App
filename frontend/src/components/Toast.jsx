import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.3s ease-out'
    };

    if (type === 'success') {
      return { ...baseStyle, backgroundColor: '#28a745' };
    } else if (type === 'error') {
      return { ...baseStyle, backgroundColor: '#dc3545' };
    } else {
      return { ...baseStyle, backgroundColor: '#007bff' };
    }
  };

  return (
    <div style={getToastStyle()}>
      {message}
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Toast; 