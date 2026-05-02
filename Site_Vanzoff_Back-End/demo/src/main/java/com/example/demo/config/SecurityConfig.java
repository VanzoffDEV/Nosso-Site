package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) 
            .csrf(csrf -> csrf.disable()) 
            
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp.policyDirectives(
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline'; " +
                    "style-src 'self' 'unsafe-inline'; " +
                    "img-src 'self' data: https:;"))
                .frameOptions(frame -> frame.deny())
            )

            .authorizeHttpRequests(auth -> auth
                // 1. O que qualquer visitante pode fazer:
                .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()     // Ver Blog
                .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()  // Ver Portfólio
                .requestMatchers(HttpMethod.POST, "/api/leads").permitAll()       // ENVIAR CONTATO (Seguro para o cliente)

                // 2. O que só Abelardo e Ludmila podem fazer:
                .requestMatchers(HttpMethod.GET, "/api/leads/**").authenticated() // VER CONTATOS RECEBIDOS
                .requestMatchers(HttpMethod.DELETE, "/api/leads/**").authenticated() // EXCLUIR CONTATOS
                
                // 3. Qualquer outra alteração (Postar no blog, deletar, etc) exige login
                .anyRequest().authenticated() 
                
            )
            
            .httpBasic(withDefaults()); 
        
        return http.build();
    }

@Bean
public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // LIBERANDO O DOMÍNIO OFICIAL E O LOCALHOST
    configuration.setAllowedOrigins(Arrays.asList(
       "http://localhost:5173", 
       "https://agenciavanzoff.vercel.app",
       "agenciavanzoff.vercel.app",
        "http://127.0.0.1:5173",
        "https://www.agenciavanzoff.com.br", // Domínio da Ludmila
        "https://agenciavanzoff.com.br"      // Versão sem www
    )); 

    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
    configuration.setAllowCredentials(true); 
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); 
    }
}
