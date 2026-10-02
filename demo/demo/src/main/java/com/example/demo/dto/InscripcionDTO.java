package com.example.demo.dto;

public record InscripcionDTO(
        int eventoId,
        String nombreEvento,
        int inscriptos,
        int lugaresDisponibles) {
}