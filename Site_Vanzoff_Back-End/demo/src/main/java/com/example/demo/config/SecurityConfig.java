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
import org.springframework.web.cors.CorsConfigurationSource; // Adicionado import correto

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
                .frameOptions(frame -> frame.disable()) // Alterado para facilitar o H2 se precisar
            )

            .authorizeHttpRequests(auth -> auth
                // 1. Visitantes
                .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/projects/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/leads").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // LIBERA PRE-FLIGHT (Importante para CORS)

                // 2. Administração (Abelardo e Ludmila)
                .requestMatchers("/api/leads/**").authenticated()
                
                // 3. Qualquer outra coisa exige login
                .anyRequest().authenticated() 
            )
            
            .httpBasic(withDefaults()); 
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() { // Tipo de retorno ajustado
        CorsConfiguration configuration = new CorsConfiguration();
        
        // SOLUÇÃO PARA VERCEL: Permite qualquer subdomínio da vercel e localhost
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:5173",
            "https://*.vercel.app",
            "https://www.agenciavanzoff.com.br"
        ));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With"));
        
        // AGORA SIM: Credentials True funciona com OriginPatterns
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