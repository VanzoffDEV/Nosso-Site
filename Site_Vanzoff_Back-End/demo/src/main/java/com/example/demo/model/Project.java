package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_projects")
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String client;
    private String category;
    
    // Mesma lógica: URLs longas não vão mais quebrar o banco
    @Column(length = 1000)
    private String imageUrl;
    
    // Texto ilimitado para a descrição do projeto
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}