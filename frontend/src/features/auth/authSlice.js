import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/register', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Register failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.get('/auth/logout');
    return null;
  } catch (err) {
    return rejectWithValue('Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) { state.loading = true; state.error = null; },
    loginSuccess(state, action) { state.loading = false; state.user = action.payload; },
    loginFailure(state, action) { state.loading = false; state.error = action.payload; },
    registerStart(state) { state.loading = true; state.error = null; },
    registerSuccess(state, action) { state.loading = false; state.user = action.payload; },
    registerFailure(state, action) { state.loading = false; state.error = action.payload; },
    logout(state) { state.user = null; },
    setUser(state, action) { state.user = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchCurrentUser.rejected, (state) => { state.loading = false; state.user = null; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; });
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout, setUser } = authSlice.actions;
export default authSlice.reducer; 