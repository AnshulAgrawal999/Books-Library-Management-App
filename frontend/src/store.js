import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import booksReducer from './features/books/booksSlice';
import myBooksReducer from './features/mybooks/myBooksSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    mybooks: myBooksReducer,
    ui: uiReducer,
  },
}); 