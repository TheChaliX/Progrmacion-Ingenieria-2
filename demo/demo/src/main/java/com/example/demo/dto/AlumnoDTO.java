package com.example.demo.dto;

import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record AlumnoDTO(
        @Positive(message = "El legajo debe ser un número positivo")
                         int legajo,
        @NotBlank(message = "El nombre del alumno es obligatorio")
                        String nombre,
        @NotBlank(message = "El apellido del alumno es obligatorio")
                        String apellido,
        @NotBlank(message = "La carrera es obligatoria")
                        String carrera
)
{
}
