// src/Components/Modal/PrivacyModal.tsx
import { useState } from 'react'; // Importamos o useState
import './WorkWithUs.css'; // Usando o mesmo CSS base

interface PrivacyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyProps) => {
  // Estado para controlar se o usuário marcou a caixinha
  const [hasAgreed, setHasAgreed] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    localStorage.setItem('vanzoff_privacy_accepted', 'true');
    onClose(); // Fecha o modal após salvar no localStorage
  };

  return (
    <div className="Modal-Overlay"> {/* Removido onClose do Overlay para forçar o aceite */}
      <div className="Modal-Content" onClick={(e) => e.stopPropagation()}>
        {/* Removido o botão 'X' Close-Btn para forçar o aceite pelo botão inferior */}
        
        <h2>🔒 Sua Privacidade na Vanzoff</h2>
        
        <div className="Job-Info" style={{ textAlign: 'left', fontSize: '13px', lineHeight: '1.5', maxHeight: '300px', overflowY: 'auto' }}>
          {/* ... Todo aquele texto legal da LGPD que criamos antes ... */}
          <p>
            Esta política está em conformidade com a 
            <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noreferrer" style={{ color: '#F7CD04', marginLeft: '5px' }}>
               Lei Geral de Proteção de Dados (Lei nº 13.709/18)
            </a>.
          </p>
          <br />
          <p>Ao continuar, você concorda que coletamos Nome e E-mail apenas para fins de propostas comerciais.</p>
        </div>

        {/* --- NOVA SEÇÃO: CHECKBOX --- */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '20px 0', color: '#ccc', fontSize: '14px' }}>
          <input 
            type="checkbox" 
            id="agreeCheckbox" 
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)} // Atualiza o estado
            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#F7CD04' }}
          />
          <label htmlFor="agreeCheckbox" style={{ cursor: 'pointer' }}>
            Li e concordo com a política de privacidade.
          </label>
        </div>
        {/* ---------------------------- */}
        
        {/* O botão fica 'disabled' se hasAgreed for false */}
        <button 
          className="btn-send" 
          onClick={handleAccept}
          disabled={!hasAgreed} 
          style={{ 
            marginTop: '10px', 
            opacity: hasAgreed ? 1 : 0.5, // Fica acinzentado se desabilitado
            cursor: hasAgreed ? 'pointer' : 'not-allowed',
            transition: '0.3s'
          }}
        >
          Entrar no Site
        </button>
      </div>
    </div>
  );
};