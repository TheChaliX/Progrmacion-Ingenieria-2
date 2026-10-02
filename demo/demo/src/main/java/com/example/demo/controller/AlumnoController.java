package com.example.demo.controller;

import com.example.demo.dto.AlumnoDTO;
import com.example.demo.excepcion.RecursoNoEncontradoException;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AlumnoController {

    private final List<AlumnoDTO> alumnos = new ArrayList<>();

    // Cambiado a String para que no te tire error de argumentos
    @GetMapping("/saludo/personal")
    public String saludar(@RequestParam String nombre) {
        return "Hola " + nombre;
    }

    @PostMapping("/alumnos")
    public AlumnoDTO registrarAlumno(@Valid @RequestBody AlumnoDTO nuevo) {
        alumnos.add(nuevo);
        return nuevo;
    }

    @GetMapping("/alumnos/{legajo}")
    public AlumnoDTO obtenerAlumno(@PathVariable int legajo) {
        for (AlumnoDTO a : alumnos) {
            if (a.legajo() == legajo) {
                return a;
            }
        }
        throw new RecursoNoEncontradoException("No se encontró ningún alumno con el legajo " + legajo);
    }
}
