package com.example.demo.Service; // Verifique se sua pasta começa com 'S' maiúsculo ou 's' minúsculo

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
// ESTA LINHA ABAIXO É O QUE RESOLVE O ERRO DO LEAD:
import com.example.demo.model.Lead; 

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
   
    @Async // <--- Isso faz o e-mail rodar "por fora", sem travar o site
    public void enviarEmailContato(Lead lead) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("vanzoffhub@gmail.com");
            message.setTo("vanzoffhub@gmail.com"); 
            message.setSubject("🚀 Novo Lead: " + lead.getName());
            message.setText("Detalhes do Contato Vanzoff:\n\n" +
                            "Nome: " + lead.getName() + "\n" +
                            "E-mail: " + lead.getEmail() + "\n" +
                            "WhatsApp: " + lead.getPhone() + "\n" +
                            "Descrição do Projeto: " + lead.getProjectDescription());
            
            mailSender.send(message);
            System.out.println("✅ E-mail enviado em segundo plano!");
        } catch (Exception e) {
            // Se o Gmail der timeout aqui, o site não trava mais!
            System.err.println("❌ Falha no e-mail em background: " + e.getMessage());
        }
    }
}