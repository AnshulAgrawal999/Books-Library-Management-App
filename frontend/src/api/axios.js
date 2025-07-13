import axios from 'axios';

const api = axios.create({
  baseURL: 'https://books-library-management-app-rxj1.onrender.com/api',
  withCredentials: true, // for HTTP-only cookies
});

export default api; 