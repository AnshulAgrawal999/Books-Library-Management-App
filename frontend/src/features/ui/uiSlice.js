import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toast: {
    show: false,
    message: '',
    type: 'success'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'success'
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    }
  }
});

export const { showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer; 