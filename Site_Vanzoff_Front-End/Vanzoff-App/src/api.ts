import axios from 'axios';

const api = axios.create({
  // Ele tenta pegar a URL da Vercel; se não achar, usa o localhost (para quando você estiver editando)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

export default api;