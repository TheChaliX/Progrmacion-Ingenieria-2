package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hola_mundo_controller {
    @GetMapping("/hola")
    public String hola() {
        return "Hola Mundo desde Spring Boot";
    }
}
