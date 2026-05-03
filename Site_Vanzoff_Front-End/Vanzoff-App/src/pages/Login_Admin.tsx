import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fazemos a chamada para o seu backend no Render
      const response = await api.get("/api/posts", {
        auth: {
          username: email,
          password: password,
        },
      });

      if (response.status === 200) {
        alert("✅ Acesso autorizado! Bem-vindo Abelardo e Ludmila.");

        // 1. Salvamos a autenticação ANTES de mudar de página
        localStorage.setItem("isAuth", "true");
        
        const nomeUsuario = email.split("@")[0];
        localStorage.setItem(
          "userName",
          nomeUsuario.charAt(0).toUpperCase() + nomeUsuario.slice(1)
        );

        // 2. Redirecionamos na MESMA aba para evitar bloqueio de pop-up
        navigate("/admin");
      }
    } catch (error) {
      console.error("Erro de login:", error);
      alert("❌ E-mail ou senha incorretos! Verifique as variáveis no Render.");
    }
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container { height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #1a1a1a; font-family: 'Poppins', sans-serif; }
        .login-card { background-color: #000; padding: 40px; border-radius: 15px; border: 1px solid #F7CD04; width: 100%; max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .login-card h2 { color: #F7CD04; margin-bottom: 20px; }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-group label { display: block; color: #ccc; margin-bottom: 8px; }
        .input-group input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #333; background: #1a1a1a; color: #fff; outline: none; }
        .btn-login { width: 100%; padding: 15px; background: #F7CD04; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .btn-login:hover { background: #ffdb33; transform: scale(1.02); }
        .btn-back-home { display: inline-block; margin-top: 25px; color: #888; text-decoration: none; font-size: 14px; transition: 0.3s; }
        .btn-back-home:hover { color: #F7CD04; }
      `}</style>

      <div className="login-card">
        <img src="/images/Vanzoff agencia.png" alt="Vanzoff" style={{ width: "120px", marginBottom: "20px" }} />
        <h2>Painel Restrito</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-mail</label>
            <input type="email" required placeholder="admin@vanzoff.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-login">Entrar no Painel</button>
        </form>
        <Link to="/" className="btn-back-home">← Voltar para a Home</Link>
      </div>
    </div>
  );
};