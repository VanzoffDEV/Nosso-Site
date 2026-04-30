import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'portfolio' | 'leads'>('blog');
  const [history, setHistory] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('estratégia');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [client, setClient] = useState('');

  // Centralizamos a config de autenticação
  const config = { auth: { username: 'admin@vanzoff.com', password: '#Mar250824' } };

  const fetchData = async () => {
    if (localStorage.getItem('isAuth') !== 'true') {
      navigate('/login');
      return;
    }

    try {
      if (activeTab === 'leads') {
        const res = await axios.get('http://localhost:8080/api/leads', config);
        setLeads(res.data);
      } else {
        const endpoint = activeTab === 'blog' ? '/api/posts' : '/api/projects';
        const res = await axios.get(`http://localhost:8080${endpoint}`, config);
        setHistory(res.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, [activeTab]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab === 'blog' ? '/api/posts' : '/api/projects';
    const payload = {
      title, category, imageUrl: image, summary,
      client: activeTab === 'portfolio' ? client : "" 
    };

    try {
      await axios.post(`http://localhost:8080${endpoint}`, payload, config);
      alert("🚀 Publicado com sucesso!");
      resetForm();
      fetchData();
    } catch (error) {
      alert("❌ Falha ao publicar. Verifique o Back-end.");
    }
  };

  // FUNÇÃO PARA EXCLUIR POSTS/PROJETOS
  const handleDelete = async (id: number) => {
    if (window.confirm("⚠️ Deseja excluir permanentemente?")) {
      const endpoint = activeTab === 'blog' ? '/api/posts' : '/api/projects';
      try {
        await axios.delete(`http://localhost:8080${endpoint}/${id}`, config);
        fetchData();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  };

  // NOVA FUNÇÃO: EXCLUIR CONTATOS (LEADS)
  const handleDeleteLead = async (id: number) => {
    if (window.confirm("🗑️ Deseja remover este contato da sua caixa de entrada?")) {
      try {
        await axios.delete(`http://localhost:8080/api/leads/${id}`, config);
        alert("✅ Contato excluído com sucesso!");
        fetchData(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir lead:", error);
        alert("❌ Falha ao excluir o contato.");
      }
    }
  };

  const resetForm = () => {
    setTitle(''); setImage(''); setSummary(''); setClient('');
    setCategory('estratégia');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userName');
    alert("Encerrando sessão de Abelardo e Ludmila...");
    if (window.opener) {
      window.close();
    } else {
      navigate('/');
    }
  };

  return (
    <section className="Admin-Dashboard">
      <style>{`
        .Admin-Dashboard { display: flex; min-height: 100vh; background-color: #1a1a1a; width: 100vw; color: #fff; font-family: 'Poppins', sans-serif; }
        .Admin-Sidebar { width: 280px; background-color: #000; padding: 40px 20px; position: fixed; height: 100vh; border-right: 1px solid #333; z-index: 100; display: flex; flex-direction: column; }
        .Admin-Main { flex: 1; margin-left: 280px; padding: 40px 60px; display: flex; flex-direction: column; align-items: center; }
        .nav-btn { display: block; color: #888; padding: 15px; border-radius: 8px; margin-bottom: 10px; transition: 0.3s; cursor: pointer; border: none; background: none; width: 100%; text-align: left; font-size: 16px; font-family: inherit;}
        .nav-btn.active { background-color: #2e2a2a; color: #F7CD04; font-weight: bold; }
        .Form-Container { background-color: #2e2a2a; padding: 40px; border-radius: 20px; width: 100%; max-width: 800px; border: 1px solid #444; margin-bottom: 40px; }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; margin-bottom: 8px; color: #F7CD04; font-size: 14px; }
        .input-group input, .input-group select, .input-group textarea { width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #444; border-radius: 8px; color: #fff; outline: none; }
        .btn-save { width: 100%; padding: 18px; background: #F7CD04; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; }
        .Admin-User { display: flex; align-items: center; gap: 12px; background: #222; padding: 8px 15px; border-radius: 30px; border: 1px solid #333; }
        .user-avatar { width: 40px; height: 40px; background: #F7CD04; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .History-Container { width: 100%; max-width: 800px; background: #000; padding: 20px; border-radius: 15px; border: 1px solid #333; }
        .history-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #222; }
        .lead-card { background: #111; padding: 25px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #F7CD04; text-align: left; width: 100%; position: relative; }
        .btn-delete-lead { position: absolute; top: 15px; right: 15px; background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 20px; transition: 0.3s; }
        .btn-delete-lead:hover { transform: scale(1.2); }
        .btn-delete { background: #ff4d4d; color: #fff; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-size: 12px; }
        .btn-logout { margin-top: auto; color: #ff4d4d; background: none; border: none; padding: 15px; cursor: pointer; text-align: left; font-family: inherit; font-size: 16px; }

        /* --- RESPONSIVIDADE --- */
        @media (min-width: 769px) {
    .Admin-Dashboard { flex-direction: row; }
    .Admin-Sidebar { width: 280px; height: 100vh; position: fixed; flex-direction: column; border-right: 1px solid #333; border-bottom: none; justify-content: flex-start; }
    .Admin-Main { margin-left: 280px; padding: 40px 60px; }
    .nav-btn { display: block; width: 100%; margin-bottom: 10px; font-size: 16px; padding: 15px; }
    .btn-logout { margin-top: auto; padding: 15px; font-size: 16px; }
    .Logo-Admin img { width: 180px !important; margin-bottom: 50px; }
      `}</style>

      <div className="Admin-Sidebar">
        <div className="Logo-Admin"><img src="/images/Vanzoff agencia.png" alt="Vanzoff" style={{ width: '180px', marginBottom: '50px' }} /></div>
        <nav style={{ display: 'flex', flexDirection: 'column', height: '80%' }}>
          <button className={`nav-btn ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => setActiveTab('blog')}>📝 Posts do Blog</button>
          <button className={`nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('portfolio')}>💼 Cases do Portfólio</button>
          <button className={`nav-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>📥 Contatos Recebidos</button>
          <button onClick={handleLogout} className="btn-logout">⬅️ Sair do Painel</button>
        </nav>
      </div>

      <div className="Admin-Main">
        <header style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
          <h2>Painel Administrativo</h2>
          <div className="Admin-User">
            <span style={{ fontWeight: '500' }}>Olá, Abelardo e Ludmila</span>
            <div className="user-avatar">AL</div>
          </div>
        </header>

        {activeTab !== 'leads' ? (
          <>
            <div className="Form-Container">
              <h3>Nova Publicação: {activeTab === 'blog' ? 'Blog' : 'Portfólio'}</h3>
              <form onSubmit={handlePublish}>
                <div className="input-group"><label>Título</label><input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                {activeTab === 'portfolio' && (<div className="input-group"><label>Cliente</label><input type="text" required value={client} onChange={(e) => setClient(e.target.value)} /></div>)}
                <div className="input-group"><label>Categoria</label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="estratégia">Estratégia</option><option value="design">Design</option><option value="tecnologia">Tecnologia</option></select></div>
                <div className="input-group"><label>URL Imagem</label><input type="text" required value={image} onChange={(e) => setImage(e.target.value)} /></div>
                <div className="input-group"><label>Conteúdo</label><textarea rows={5} required value={summary} onChange={(e) => setSummary(e.target.value)} /></div>
                <button type="submit" className="btn-save">🚀 Publicar Agora</button>
              </form>
            </div>
            <div className="History-Container">
              <h4 style={{ marginBottom: '20px', color: '#F7CD04' }}>📋 Histórico</h4>
              {history.map((item) => (
                <div className="history-item" key={item.id}>
                  <div style={{ textAlign: 'left' }}><strong>{item.title}</strong><br /><small>{item.category}</small></div>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>Excluir</button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="History-Container">
            <h4 style={{ marginBottom: '20px', color: '#F7CD04' }}>📥 Mensagens Recebidas</h4>
            {leads.length > 0 ? leads.map((lead) => (
              <div className="lead-card" key={lead.id}>
                {/* BOTÃO DE EXCLUIR LEAD */}
                <button 
                  className="btn-delete-lead" 
                  title="Excluir contato"
                  onClick={() => handleDeleteLead(lead.id)}
                >
                  🗑️
                </button>

                <p><strong>Nome:</strong> {lead.name}</p>
                <p><strong>E-mail:</strong> {lead.email}</p>
                <p><strong>WhatsApp:</strong> {lead.phone}</p>
                <p style={{ marginTop: '10px', color: '#ccc', fontSize: '14px' }}><strong>Projeto:</strong> {lead.projectDescription}</p>
                <small style={{ color: '#555' }}>Recebido em: {new Date(lead.createdAt).toLocaleString('pt-BR')}</small>
              </div>
            )) : <p>Nenhum contato por enquanto.</p>}
          </div>
        )}
      </div>
    </section>
  );
};