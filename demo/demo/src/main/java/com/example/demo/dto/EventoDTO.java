package com.example.demo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * EJERCICIO 9 — EventoDTO con validacion.
 *
 * Mismo DTO que veniamos usando en la clase de metodos HTTP, ahora con
 * las reglas declaradas.
 *
 * La fecha sigue siendo un String, igual que antes, para no cambiar el
 * contrato de la API a mitad de la unidad. La validamos con @Pattern:
 * la expresion regular exige el formato dd/MM/yyyy.
 *
 *   \\d{2}  ->  exactamente dos digitos
 *   /       ->  la barra literal
 *
 * (Cuando trabajemos con fechas de verdad, el tipo va a ser LocalDate y
 * vamos a poder usar @Future directamente. Por ahora, @Pattern alcanza.)
 */
public record EventoDTO(

        int id,

        @NotBlank(message = "El nombre del evento es obligatorio")
        String nombre,

        @NotBlank(message = "La fecha es obligatoria")
        @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}",
                 message = "La fecha debe tener el formato dd/MM/yyyy")
        String fecha,

        @NotBlank(message = "El lugar es obligatorio")
        String lugar,

        @Min(value = 1, message = "El cupo debe ser de al menos 1 persona")
        @Max(value = 500, message = "El cupo no puede superar las 500 personas")
        int cupo) {
}
