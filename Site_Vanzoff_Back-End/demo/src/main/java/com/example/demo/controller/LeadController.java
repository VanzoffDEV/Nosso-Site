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
    // 1. Força a gravação imediata no banco Neon
    Lead novoLead = repository.saveAndFlush(lead); 

    // 2. Chama o e-mail (que agora é @Async e não vai travar este método)
    try {
        emailService.enviarEmailContato(novoLead);
    } catch (Exception e) {
        System.err.println("⚠️ Erro ao disparar thread de e-mail: " + e.getMessage());
    }

    // 3. Retorna o lead IMEDIATAMENTE para o Front-end
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