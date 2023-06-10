package com.sat.students.utils;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/satApp/v1/**")
                .allowedOrigins("http://localhost:3000")
                    .allowedHeaders("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
        }
}
