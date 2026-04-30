import './WorkWithUs.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkWithUsModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null; // Não renderiza nada se estiver fechado

  return (
    <div className="Modal-Overlay" onClick={onClose}>
      <div className="Modal-Content" onClick={(e) => e.stopPropagation()}>
        <button className="Close-Btn" onClick={onClose}>&times;</button>
        
        <h2>🚀 Trabalhe na Vanzoff</h2>
        <p>Estamos sempre em busca de talentos que queiram transformar o mercado digital.</p>
        
        <div className="Job-Info">
          <h3>Como funciona?</h3>
          <ul>
            <li><strong>Banco de Talentos:</strong> Analisamos currículos para futuras vagas.</li>
            <li><strong>Áreas:</strong> Design, Social Media, Dev e Estratégia.</li>
          </ul>
          <p>Envie seu portfólio para: <strong>vanzoffhub@gmail.com</strong></p>
        </div>

        <button className="btn-send" onClick={onClose}>Entendido!</button>
      </div>
    </div>
  );
};