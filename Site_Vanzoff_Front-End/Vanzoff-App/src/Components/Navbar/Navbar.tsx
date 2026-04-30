import React from "react";
import "./Navbar.css";  

type NavbarProps = {
  onOpenModal: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <header className="container">
      <div className="Logo">
        {/* No React, links internos usam '/' para a home */}
        <a href="/">
          <img src="/images/Vanzoff agencia.png" alt="Logo Da Agência" />
        </a>
      </div>
        
      <nav className="Nav">
        <ul className="Nav_list">
          <li><a href="#sobre">Quem Somos</a></li>
          <li><a href="#servicos">Serviços</a></li>
          <li><a href="#portfolio">Portfólio</a></li>
          <li><a href="#blog">Blog</a></li>
          {/* Se você criar a página trabalhe em React depois, mudaremos para <Link> */}
          <li><a href="#" onClick={(e) => {
            e.preventDefault();
            onOpenModal();
          }}>Trabalhe Conosco</a></li>
          <li><a href="#contato" className="btn-outline">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
};