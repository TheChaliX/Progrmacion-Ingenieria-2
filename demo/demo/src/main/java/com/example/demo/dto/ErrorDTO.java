package com.example.demo.dto;

import java.time.LocalDateTime;

public record ErrorDTO(
        LocalDateTime timestamp,
        int estado,
        String error,
        String mensaje
) { }
