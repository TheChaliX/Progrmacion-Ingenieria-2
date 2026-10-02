package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record ProductoDTO(
        int id,

        @NotBlank(message = "El nombre del producto es obligatorio")
        String nombre,

        @Positive(message = "El precio debe ser estrictamente mayor a cero")
        double precio,

        @PositiveOrZero(message = "El stock no puede ser un número negativo")
        int stock
) { }