import './About.css';

export const About = () => {
  return (
    <section id="sobre" className="Quem_Nos_Somos">
      <div className="Conteudo_sobre">
        <h2 className="Tittle">Quem Somos</h2>
        
        <div className="flex-container">
          {/* Ajuste o caminho da imagem se necessário */}
          <img 
            src="/images/WhatsApp Image 2026-02-16 at 11.44.49.jpeg" 
            alt="Quem Somos" 
            className="Foto_base" 
          />
             
          <p className="Conteudo">
            A Vanzoff é uma agência de marketing e soluções digitais criada para empresas que querem crescer com estratégia, clareza e resultados reais.<br /><br />

            Somos um perfil novo nas redes, mas carregamos 8 anos de experiência de mercado, atuando diretamente com empresários,
            profissionais liberais e marcas que precisam transformar presença digital em oportunidades de negócio.<br /><br />

            Aqui, marketing não é só estética ou postagem: é posicionamento, estratégia e conversão.
          </p>
        </div>
      </div>
    </section>
  );
};