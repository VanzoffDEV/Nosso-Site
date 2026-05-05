import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://vanzoff-backend.onrender.com',
  baseURL: 'https://api.agenciavanzoff.com.br'
});
export default api;
// build v2