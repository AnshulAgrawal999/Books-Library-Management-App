import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart(state) { state.loading = true; state.error = null; },
    fetchBooksSuccess(state, action) { state.loading = false; state.books = action.payload; },
    fetchBooksFailure(state, action) { state.loading = false; state.error = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBooks.fulfilled, (state, action) => { state.loading = false; state.books = action.payload; })
      .addCase(fetchBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;
export default booksSlice.reducer;

export const fetchBooks = createAsyncThunk('books/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/books');
    // If the API returns { books: [...] }
    return res.data.books || res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch books');
  }
}); 