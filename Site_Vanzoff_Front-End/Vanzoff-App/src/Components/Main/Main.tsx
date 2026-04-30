import './Main.css';

export const MainHero = () => {
  return (
    <section className="Main">
      {/* Container da imagem de fundo */}
      <div className="backgroundpage">
        <img 
          src="/images/backgroundpag.png" 
          alt="background" 
          className="Background" 
        />
      </div>

      {/* Conteúdo textual */}
      <div className="Main_content">
        <h1>TRANSFORME <br /> SUA EMPRESA</h1>
        <p>Marketing & Soluções Digitais</p>

        {/* Link para o WhatsApp */}
        <a 
          href="https://wa.me/5581920044471" 
          className="btn_chamada" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Fale Com Especialista
        </a>
      </div>
    </section>
  );
};