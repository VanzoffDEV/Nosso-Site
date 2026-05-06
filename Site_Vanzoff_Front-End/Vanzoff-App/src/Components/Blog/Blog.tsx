import { useEffect, useState } from 'react';
import axios from 'axios';
import './Blog.css';

interface Post {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  createdAt: string;
}

export const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const carregarPosts = async () => {
      try {
        const response = await axios.get('https://api.agenciavanzoff.com.br/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarPosts();
  }, []);

  const formatarData = (dataString: string) => {
    if (!dataString) return "Recentemente";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <section className="Blog" id="blog">
      <div className="Conteudo_Blog">
        <h2 className="Tittle_PT">Blog Vanzoff</h2>
        <p className="Paragrafo_PT">Estratégias, tendências e insights para escalar seu negócio.</p>
      </div>

      <div className="blog-container">
        {loading ? (
          <p className="loading-text">Carregando artigos...</p>
        ) : (
          posts.map((post) => (
            <article className="blog-card" key={post.id} onClick={() => setSelectedPost(post)}>
              <div className="blog-image">
                <img src={post.imageUrl || '/images/default-blog.jpg'} alt={post.title} />
                <span className="category">{post.category}</span>
              </div>
              <div className="blog-info">
                <span className="date">{formatarData(post.createdAt)}</span>
                <h3>{post.title}</h3>
                <p>{post.summary.substring(0, 120)}...</p>
                <button className="read-more">Ler Artigo →</button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* MODAL (JANELA FLUTUANTE) */}
      {selectedPost && (
        <div className="blog-modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPost(null)}>&times;</button>
            <div className="modal-header-img">
                <img src={selectedPost.imageUrl} alt={selectedPost.title} />
            </div>
            <div className="modal-body">
              <span className="category-modal">{selectedPost.category}</span>
              <span className="date-modal">{formatarData(selectedPost.createdAt)}</span>
              <h2>{selectedPost.title}</h2>
              <div className="full-text">
                {selectedPost.summary.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};