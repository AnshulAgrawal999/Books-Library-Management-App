import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  myBooks: [],
  loading: false,
  error: null,
};

export const fetchMyBooks = createAsyncThunk('mybooks/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/mybooks');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch my books');
  }
});

export const addBookToMyBooks = createAsyncThunk('mybooks/add', async (bookId, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.post(`/mybooks/${bookId}`);
    // Show success toast
    dispatch({ type: 'ui/showToast', payload: { message: 'Book added to your list!', type: 'success' } });
    return res.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to add book';
    dispatch({ type: 'ui/showToast', payload: { message: errorMessage, type: 'error' } });
    return rejectWithValue(errorMessage);
  }
});

export const updateBookStatus = createAsyncThunk('mybooks/updateStatus', async ({ bookId, status }, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.patch(`/mybooks/${bookId}/status`, { status });
    dispatch({ type: 'ui/showToast', payload: { message: `Status updated to "${status}"`, type: 'success' } });
    return { bookId, status };
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to update status';
    dispatch({ type: 'ui/showToast', payload: { message: errorMessage, type: 'error' } });
    return rejectWithValue(errorMessage);
  }
});

export const updateBookRating = createAsyncThunk('mybooks/updateRating', async ({ bookId, rating }, { rejectWithValue, dispatch }) => {
  try {
    const res = await api.patch(`/mybooks/${bookId}/rating`, { rating });
    const ratingText = rating === 0 ? 'No rating' : `${rating} star${rating > 1 ? 's' : ''}`;
    dispatch({ type: 'ui/showToast', payload: { message: `Rating updated to ${ratingText}`, type: 'success' } });
    return { bookId, rating };
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Failed to update rating';
    dispatch({ type: 'ui/showToast', payload: { message: errorMessage, type: 'error' } });
    return rejectWithValue(errorMessage);
  }
});

const myBooksSlice = createSlice({
  name: 'mybooks',
  initialState,
  reducers: {
    // fetchMyBooksStart(state) { state.loading = true; state.error = null; },
    // fetchMyBooksSuccess(state, action) { state.loading = false; state.myBooks = action.payload; },
    // fetchMyBooksFailure(state, action) { state.loading = false; state.error = action.payload; },
    // updateStatus(state, action) {
    //   const { bookId, status } = action.payload;
    //   const book = state.myBooks.find(b => b.bookId === bookId);
    //   if (book) book.status = status;
    // },
    // updateRating(state, action) {
    //   const { bookId, rating } = action.payload;
    //   const book = state.myBooks.find(b => b.bookId === bookId);
    //   if (book) book.rating = rating;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBooks.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyBooks.fulfilled, (state, action) => { state.loading = false; state.myBooks = action.payload; })
      .addCase(fetchMyBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(addBookToMyBooks.fulfilled, (state, action) => { state.myBooks.push(action.payload); })
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const { bookId, status } = action.payload;
        const book = state.myBooks.find(b => b.bookId === bookId);
        if (book) book.status = status;
      })
      .addCase(updateBookRating.fulfilled, (state, action) => {
        const { bookId, rating } = action.payload;
        const book = state.myBooks.find(b => b.bookId === bookId);
        if (book) book.rating = rating;
      });
  },
});

export const { fetchMyBooksStart, fetchMyBooksSuccess, fetchMyBooksFailure, updateStatus, updateRating } = myBooksSlice.actions;
export default myBooksSlice.reducer; 