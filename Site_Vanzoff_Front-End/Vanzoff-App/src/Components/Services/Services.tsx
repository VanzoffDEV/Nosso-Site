import './Services.css';

export const Services = () => {
  return (
    <section className="Services" id="servicos">
      <div className="Conteudo_Services">
        <h2 className="Tittle_S">Serviços</h2>
        <p className="Paragrafo_S">
          Na Vanzoff, oferecemos soluções completas para fortalecer sua marca,
          atrair clientes e gerar crescimento sustentável:
        </p>
      </div>

      <div className="portfolio-bento-grid">
        <div className="bento-item featured">
          <img src="https://cruzeirodosul.vtexassets.com/arquivos/ids/161274-800-auto?v=638628654729500000&width=800&height=auto&aspect=true" alt="Design Gráfico" />
          <div className="overlay">
            <h3>Design Gráfico</h3>
            <p>Criação estratégica de elementos visuais para comunicar mensagens, fortalecer a identidade da marca e gerar conexão com o público.</p>
          </div>
        </div>

        <div className="bento-item vertical">
          <img src="/images/Social media.jpeg" alt="Social Media" />
          <div className="overlay">
            <h3>Social Media</h3>
            <p>Gestão estratégica das redes sociais para posicionar a marca e gerar oportunidades de negócio.</p>
          </div>
        </div>

        <div className="bento-item">
          <img src="https://rhopen.com.br/wp-content/uploads/2024/04/280406-entenda-como-uma-consultoria-pode-contribuir-na-tomada-de-decisao.jpg" alt="Consultoria" />
          <div className="overlay">
            <h3>Consultoria</h3>
            <p>Diagnóstico completo e estratégico para otimizar sua presença digital.</p>
          </div>
        </div>

        <div className="bento-item horizontal">
          <img src="https://neilpatel.com/wp-content/uploads/2016/04/laptop-and-desk.jpg" alt="Sites e Landing Pages" />
          <div className="overlay">
            <h3>Sites e Landing Pages</h3>
            <p>Soluções web que unem design estratégico e tecnologia para gerar autoridade e conversão.</p>
          </div>
        </div>

        <div className="bento-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPckwI4SB1ZzYct2QcKbaMVgfk25iAlgoEw&s" alt="Eventos" />
          <div className="overlay">
            <h3>Eventos</h3>
            <p>Organização e execução de eventos para fortalecer a marca e engajar o público.</p>
          </div>
        </div>
      </div>
    </section>
  );
};