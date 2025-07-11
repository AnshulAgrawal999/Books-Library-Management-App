import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // for HTTP-only cookies
});

export default api; 