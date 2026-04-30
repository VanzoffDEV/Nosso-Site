package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_posts")
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String category;
    
    // Aumentamos para 1000 caracteres para aceitar URLs de imagens bem longas
    @Column(length = 1000)
    private String imageUrl;
    
    // Mudamos para columnDefinition = "TEXT" para aceitar resumos gigantes
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}