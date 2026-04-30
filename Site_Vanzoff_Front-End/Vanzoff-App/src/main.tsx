import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Isso chama o seu arquivo App.tsx
import './index.css'     // Isso carrega o fundo escuro e as fontes

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)