import './Footer.css';
import { Link } from 'react-router-dom';

export const Footer = ({ onOpenModal, onOpenPrivacy }: { onOpenModal: () => void; onOpenPrivacy: () => void }) => {
  return (
    <footer className="Main-Footer">
      <div className="Footer-Container">
        
        {/* Coluna da Logo e Social */}
        <div className="Footer-Col">
          <img src="/images/Vanzoff agencia.png" alt="Logo Vanzoff" className="Footer-Logo" />
          <p>Transformando presença digital em oportunidades reais de negócio. 8 anos de experiência no mercado.</p>
          <div className="Social-Icons">
            <a href="https://www.instagram.com/agenciavanzoff" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/vanzoff" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://wa.me/5581920044471" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        {/* Coluna Navegação */}
        <div className="Footer-Col">
          <h3>Navegação</h3>
          <ul>
            <li><a href="#sobre">Quem Somos</a></li>
            <li><a href="#servicos">Serviços</a></li>
            <li><a href="#portfolio">Portfólio</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        {/* Coluna Institucional */}
        <div className="Footer-Col">
          <h3>Institucional</h3>
          <ul>
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              onOpenModal();
            }}>Trabalhe Conosco</a></li>
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              onOpenPrivacy();
            }}>Privacidade</a></li>
            <li><a href="#contato">Fale Conosco</a></li>
            {/* Link para o login admin que configuraremos nas rotas em breve */}
            <li><Link to="/login" target="_blank" rel='noopener noreferrer'>Sou Administrador</Link></li>
          </ul>
        </div>

      </div>

      <div className="Footer-Bottom">
        <p>&copy; {new Date().getFullYear()} Agência Vanzoff. Todos os direitos reservados. Desenvolvido por <strong>VanzoffDev</strong>.</p>
      </div>
    </footer>
  );
};