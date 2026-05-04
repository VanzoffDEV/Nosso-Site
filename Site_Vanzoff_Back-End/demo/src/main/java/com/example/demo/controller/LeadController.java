package com.example.demo.controller;

import com.example.demo.model.Lead;
import com.example.demo.repository.LeadRepository;
import com.example.demo.Service.EmailService; // Importe o seu serviço aqui
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;  


@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadRepository repository;

    @Autowired
    private EmailService emailService;

@PostMapping
@Transactional
public Lead salvarLead(@RequestBody Lead lead) {
    // 1. Salva no banco primeiro e garante a persistência
    Lead novoLead = repository.save(lead);
    repository.flush(); // Força o Hibernate a gravar no Neon agora mesmo

    // 2. Tenta enviar o e-mail de forma isolada
    try {
        emailService.enviarEmailContato(novoLead);
    } catch (Exception e) {
        // Se o e-mail falhar, apenas logamos o erro. O lead já está salvo!
        System.err.println("⚠️ Lead salvo no banco, mas e-mail falhou: " + e.getMessage());
    }

    // 3. Retorna o lead para o Front-end
    return novoLead;
}

    @GetMapping
    public List<Lead> listarLeads() {
        return repository.findAll();
    }

    // Rota para excluir (Caixa de Entrada)
    @DeleteMapping("/{id}")
    public void excluirLead(@PathVariable Long id) {
        repository.deleteById(id);
    }
}