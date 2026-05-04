package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync // Habilita o suporte para métodos assíncronos, necessário para o envio de e-mails sem bloquear a resposta do lead
public class DemoApplication {

    public static void main(String[] args) {
            
        SpringApplication.run(DemoApplication.class, args);
    }

}