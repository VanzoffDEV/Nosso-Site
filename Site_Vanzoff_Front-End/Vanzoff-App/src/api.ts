import axios from 'axios';

const api = axios.create({
  // Ele vai ler do .env. No PC será localhost, no Render será o link da API
  //baseURL: import.meta.env.VITE_API_URL, 
});

export default api;