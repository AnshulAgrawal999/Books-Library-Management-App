import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myBooks: [],
  loading: false,
  error: null,
};

const myBooksSlice = createSlice({
  name: 'mybooks',
  initialState,
  reducers: {
    fetchMyBooksStart(state) { state.loading = true; state.error = null; },
    fetchMyBooksSuccess(state, action) { state.loading = false; state.myBooks = action.payload; },
    fetchMyBooksFailure(state, action) { state.loading = false; state.error = action.payload; },
    updateStatus(state, action) {
      const { bookId, status } = action.payload;
      const book = state.myBooks.find(b => b.bookId === bookId);
      if (book) book.status = status;
    },
    updateRating(state, action) {
      const { bookId, rating } = action.payload;
      const book = state.myBooks.find(b => b.bookId === bookId);
      if (book) book.rating = rating;
    },
  },
});

export const { fetchMyBooksStart, fetchMyBooksSuccess, fetchMyBooksFailure, updateStatus, updateRating } = myBooksSlice.actions;
export default myBooksSlice.reducer; 