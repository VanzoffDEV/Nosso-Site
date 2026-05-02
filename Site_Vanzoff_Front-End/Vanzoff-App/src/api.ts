import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vanzoff-backend.onrender.com',
});

export default api;