import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideToast } from '../features/ui/uiSlice';
import Toast from './Toast';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const { toasts } = useSelector(state => state.ui);

  const handleCloseToast = (toastId) => {
    dispatch(hideToast(toastId));
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      maxWidth: '400px'
    }}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer; 