import React, { useState } from 'react';
 //import axios from 'axios';
import './Contato.css';
import '../../api'; // Certifique-se de que o caminho para o api.ts está correto
import api from '../../api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Adicionei para bater com o Java
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mapeamos para os nomes que o seu Lead.java espera
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectDescription: `[Serviço: ${formData.service}] - ${formData.message}`
    };

    try {
      // Rota pública definida no seu SecurityConfig
      await api.post('/api/leads', payload);
      alert(`🚀 Obrigado, ${formData.name}! Recebemos seu projeto e responderemos em breve.`);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      alert("❌ Ops! Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="Contact-Section">
      <div className="Contact-Container">
        <div className="Contact-Info">
          <h2 className="Tittle_Contact">Vamos Construir <br /> algo <span>Grande?</span></h2>
          <p>Se você busca posicionamento e resultados reais, mande uma mensagem. Respondemos em até 24h.</p>
          <div className="Contact-Items">
            <div className="item">
              <i className="fa-brands fa-whatsapp"></i>
              <div>
                <p>WhatsApp</p>
                <a href="https://wa.me/5581920044471" target="_blank" rel="noreferrer">(81) 92004-4471</a>
              </div>
            </div>
            <div className="item">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <p>E-mail</p>
                <span>vanzoffhub@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="Contact-Form-Box">
          <form className="Contact-Form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="name" placeholder="Seu Nome completo" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <input type="email" name="email" placeholder="Seu melhor e-mail" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <input type="text" name="phone" placeholder="WhatsApp (DDD + Número)" required value={formData.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <select name="service" required onChange={handleChange} value={formData.service}>
                <option value="" disabled>Serviço de interesse</option>
                <option value="branding">Design Gráfico / Branding</option>
                <option value="social">Social Media</option>
                <option value="site">Sites / Landing Pages</option>
                <option value="consultoria">Consultoria</option>
              </select>
            </div>
            <div className="input-group">
              <textarea name="message" placeholder="Conte um pouco sobre o seu projeto..." required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn-send">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </section>
  );
};