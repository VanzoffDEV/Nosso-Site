import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Usando sua config centralizada com a URL do Render

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'portfolio' | 'leads'>('blog');
  const [history, setHistory] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Estados dos Campos do Formulário
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('estratégia');
  const [summary, setSummary] = useState('');
  const [client, setClient] = useState('');
  
  // NOVO ESTADO: Agora guardamos o arquivo em vez da URL de texto
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Centralizamos a config de autenticação
  const config = { auth: { username: 'admin@vanzoff.com.br', password: import.meta.env.VITE_ADMIN_PASSWORD } };

  const fetchData = async () => {
    if (localStorage.getItem('isAuth') !== 'true') {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const endpoint = activeTab === 'leads' ? '/api/leads' : (activeTab === 'blog' ? '/api/posts' : '/api/projects');
      const res = await api.get(endpoint, {
        ...config,
        params: { _t: Date.now() } 
      });
      
      if (activeTab === 'leads') {
        setLeads(res.data);
      } else {
        setHistory(res.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, [activeTab]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = activeTab === 'blog' ? '/api/posts' : '/api/projects';

    // REFORMULADO: Usando FormData para enviar o arquivo binário
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('summary', summary);
    
    if (activeTab === 'portfolio') {
      formData.append('client', client);
    }

    if (imageFile) {
      formData.append('image', imageFile); // 'image' deve bater com o @RequestParam do Java
    } else {
      alert("⚠️ Por favor, selecione uma imagem.");
      return;
    }

    try {
      // IMPORTANTE: Headers multipart/form-data é necessário para arquivos
      await api.post(endpoint, formData, {
        ...config,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("🚀 Publicado com sucesso!");
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("❌ Falha ao publicar. Verifique a conexão ou o tamanho da imagem.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("⚠️ Deseja excluir permanentemente?")) {
      const endpoint = activeTab === 'blog' ? '/api/posts' : '/api/projects';
      try {
        await api.delete(`${endpoint}/${id}`, config);
        fetchData();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (window.confirm("🗑️ Deseja remover este contato?")) {
      try {
        await api.delete(`/api/leads/${id}`, config);
        alert("✅ Contato excluído!");
        fetchData();
      } catch (error) {
        alert("❌ Falha ao excluir.");
      }
    }
  };

  const resetForm = () => {
    setTitle(''); 
    setImageFile(null); 
    setSummary(''); 
    setClient('');
    setCategory('estratégia');
    // Limpa o campo de arquivo visualmente
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userName');
    navigate('/');
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
        .loading-text { color: #F7CD04; margin-top: 20px; font-weight: bold; }
        .btn-logout { background: #ff4d4d; color: #fff; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: auto; }
        
        /* Estilo para o input de arquivo */
        input[type="file"]::file-selector-button {
          background-color: #444;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 15px;
          transition: 0.3s;
        }
        input[type="file"]::file-selector-button:hover { background-color: #555; }
      `}</style>

      <div className="Admin-Sidebar">
        <div className="Logo-Admin">
          <img src="/images/Vanzoff agencia.png" alt="Vanzoff" style={{ width: '180px', marginBottom: '50px' }} />
        </div>
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
            <span>Olá, Abelardo e Ludmila</span>
            <div className="user-avatar">AL</div>
          </div>
        </header>

        {loading ? (
          <p className="loading-text">🔄 Carregando dados da Vanzoff...</p>
        ) : (
          <>
            {activeTab !== 'leads' ? (
              <>
                <div className="Form-Container">
                  <h3>Nova Publicação: {activeTab === 'blog' ? 'Blog' : 'Portfólio'}</h3>
                  <form onSubmit={handlePublish}>
                    <div className="input-group"><label>Título</label><input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                    
                    {activeTab === 'portfolio' && (
                      <div className="input-group"><label>Cliente</label><input type="text" required value={client} onChange={(e) => setClient(e.target.value)} /></div>
                    )}
                    
                    <div className="input-group">
                      <label>Categoria</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="estratégia">Estratégia</option>
                        <option value="design">Design</option>
                        <option value="tecnologia">Tecnologia</option>
                      </select>
                    </div>

                    {/* MUDANÇA: Campo de Upload de Imagem */}
                    <div className="input-group">
                      <label>Imagem de Capa</label>
                      <input 
                        id="fileInput"
                        type="file" 
                        accept="image/*" 
                        required 
                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                      />
                    </div>

                    <div className="input-group"><label>Conteúdo</label><textarea rows={5} required value={summary} onChange={(e) => setSummary(e.target.value)} /></div>
                    
                    <button type="submit" className="btn-save">🚀 Publicar Agora</button>
                  </form>
                </div>

                <div className="History-Container">
                  <h4 style={{ marginBottom: '20px', color: '#F7CD04' }}>📋 Histórico</h4>
                  {history.map((item) => (
                    <div className="history-item" key={item.id}>
                      <div style={{ textAlign: 'left' }}>
                        <strong>{item.title}</strong><br />
                        <small>{item.category}</small>
                      </div>
                      <button className="btn-delete" onClick={() => handleDelete(item.id)} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Excluir</button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="History-Container">
                <h4 style={{ marginBottom: '20px', color: '#F7CD04' }}>📥 Mensagens Recebidas</h4>
                {leads.length > 0 ? leads.map((lead) => (
                  <div className="lead-card" key={lead.id}>
                    <button className="btn-delete-lead" onClick={() => handleDeleteLead(lead.id)}>🗑️</button>
                    <p><strong>Nome:</strong> {lead.name}</p>
                    <p><strong>E-mail:</strong> {lead.email}</p>
                    <p><strong>WhatsApp:</strong> {lead.phone}</p>
                    <p style={{ marginTop: '10px', color: '#ccc', fontSize: '14px' }}><strong>Projeto:</strong> {lead.projectDescription}</p>
                    <small style={{ color: '#555' }}>Recebido em: {new Date(lead.createdAt).toLocaleString('pt-BR')}</small>
                  </div>
                )) : <p>Nenhuma mensagem nova por enquanto.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};