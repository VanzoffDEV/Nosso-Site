import './Portfolio.css';

export const Portfolio = () => {
  // Array com as logos para facilitar a duplicação do loop infinito
  const logos = [
    "/images/Rita.png",
    "/images/Rodrigues.png",
    "/images/Ninhos.png",
    "/images/Magestral.png",
    "/images/Cazer.png"
  ];

  return (
    <section className="Portfolio" id="portfolio">
      <div className="Conteudo_Portfolio">
        <h2 className="Tittle_P">Portfólio</h2>
        <p className="Paragrafo_P">Algumas marcas que confiaram em nós.</p>
      </div>

      <div className="logos-slider">
        <div className="logos-track">
          {/* Primeira sequência de logos */}
          {logos.map((logo, index) => (
            <img key={`logo-1-${index}`} src={logo} alt="Logo Cliente" />
          ))}
          {/* Segunda sequência para o loop infinito */}
          {logos.map((logo, index) => (
            <img key={`logo-2-${index}`} src={logo} alt="Logo Cliente" />
          ))}
        </div>
      </div>
    </section>
  );
};