import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [] // Array of toasts instead of single toast
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      const newToast = {
        id: Date.now() + Math.random(), // Unique ID for each toast
        message: action.payload.message,
        type: action.payload.type || 'success',
        timestamp: Date.now()
      };
      state.toasts.push(newToast);
    },
    hideToast: (state, action) => {
      const toastId = action.payload;
      state.toasts = state.toasts.filter(toast => toast.id !== toastId);
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    }
  }
});

export const { showToast, hideToast, clearAllToasts } = uiSlice.actions;
export default uiSlice.reducer; 