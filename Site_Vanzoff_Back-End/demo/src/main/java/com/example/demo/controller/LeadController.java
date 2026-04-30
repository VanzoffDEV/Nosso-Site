package com.example.demo.controller;

import com.example.demo.model.Lead;
import com.example.demo.repository.LeadRepository;
import com.example.demo.Service.EmailService; // Importe o seu serviço aqui
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadRepository repository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public Lead salvarLead(@RequestBody Lead lead) {
        Lead novoLead = repository.save(lead);
        emailService.enviarEmailContato(novoLead);
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