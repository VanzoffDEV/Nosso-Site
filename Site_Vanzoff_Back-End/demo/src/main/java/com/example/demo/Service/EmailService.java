package com.example.demo.Service;

import com.example.demo.model.Lead;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    // Essa chave virá do Environment Variables do Render (RESEND_API_KEY)
    @Value("${resend.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @Async // Mantemos o Assíncrono para o site responder em milissegundos
    public void enviarEmailContato(Lead lead) {
        String url = "https://api.resend.com/emails";

        try {
            // 1. Criar os Headers (Autenticação Bearer)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            // 2. Criar o Corpo do E-mail (JSON)
            Map<String, Object> body = new HashMap<>();
            body.put("from", "Vanzoff Site <onboarding@resend.dev>"); // No início use o onboarding deles
            body.put("to", "vanzoffhub@gmail.com");
            body.put("subject", "🚀 Novo Lead: " + lead.getName());
            
            // Criando o HTML bonitão para o seu e-mail
            String htmlContent = String.format(
                "<h2>Novo Lead Recebido - Vanzoff</h2>" +
                "<p><strong>Nome:</strong> %s</p>" +
                "<p><strong>E-mail:</strong> %s</p>" +
                "<p><strong>WhatsApp:</strong> %s</p>" +
                "<p><strong>Projeto:</strong> %s</p>",
                lead.getName(), lead.getEmail(), lead.getPhone(), lead.getProjectDescription()
            );
            body.put("html", htmlContent);

            // 3. Enviar a Requisição POST
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            restTemplate.postForEntity(url, entity, String.class);

            System.out.println("✅ E-mail enviado com sucesso via Resend API!");

        } catch (Exception e) {
            // Se a API do Resend falhar, o servidor não morre, apenas loga o erro
            System.err.println("❌ Erro ao enviar e-mail via Resend: " + e.getMessage());
        }
    }
}