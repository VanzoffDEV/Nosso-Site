package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_leads")
@Data
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    
    @Column(columnDefinition = "TEXT")
    private String projectDescription;

    private LocalDateTime createdAt = LocalDateTime.now();
}