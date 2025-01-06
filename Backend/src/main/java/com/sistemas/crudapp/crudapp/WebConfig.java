package com.sistemas.crudapp.crudapp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite todas as URLs do backend
                .allowedOrigins("http://127.0.0.1:5500") // Permite o frontend na porta 5500
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Permite esses métodos HTTP
                .allowedHeaders("*"); // Permite todos os cabeçalhos
    }
}
