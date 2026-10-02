package com.example.demo.controller;

import com.example.demo.dto.ContactoDTO;
import com.example.demo.excepcion.RecursoNoEncontradoException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/contactos")
public class ContactoController {

    private final List<ContactoDTO> contactos = new ArrayList<>();
    private int siguienteId = 4;

    public ContactoController() {
        contactos.add(new ContactoDTO(1, "Lucía Fernández", "342-4551122", "lucia.fernandez@mail.com"));
        contactos.add(new ContactoDTO(2, "Martín Gómez", "342-4778890", "martin.gomez@mail.com"));
        contactos.add(new ContactoDTO(3, "Sofía Ibarra", "342-4223344", "sofia.ibarra@gestion.com"));
    }

    @GetMapping
    public List<ContactoDTO> obtenerContactos() {
        return contactos;
    }


    @GetMapping("/{id}")
    public ContactoDTO obtenerContacto(@PathVariable int id) {
        for (ContactoDTO contacto : contactos) {
            if (contacto.id() == id) {
                return contacto;
            }
        }
        throw new RecursoNoEncontradoException("No existe el contacto con id " + id);
    }

    @GetMapping("/buscar")
    public List<ContactoDTO> buscarPorNombre(@RequestParam String nombre) {
        List<ContactoDTO> resultado = new ArrayList<>();
        for (ContactoDTO contacto : contactos) {
            if (contacto.nombre().toLowerCase().contains(nombre.toLowerCase())) {
                resultado.add(contacto);
            }
        }
        return resultado;
    }

    @PostMapping
    public ResponseEntity<ContactoDTO> crearContacto(@Valid @RequestBody ContactoDTO nuevoContacto) {
        ContactoDTO contactoCreado = new ContactoDTO(
                siguienteId,
                nuevoContacto.nombre(),
                nuevoContacto.telefono(),
                nuevoContacto.email()
        );
        contactos.add(contactoCreado);
        siguienteId++;
        return ResponseEntity.status(HttpStatus.CREATED).body(contactoCreado);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ContactoDTO> actualizarContacto(@PathVariable int id, @Valid @RequestBody ContactoDTO datosActualizados) {
        for (int i = 0; i < contactos.size(); i++) {
            ContactoDTO contactoActual = contactos.get(i);
            if (contactoActual.id() == id) {
                ContactoDTO contactoActualizado = new ContactoDTO(
                        id,
                        contactoActual.nombre(),
                        datosActualizados.telefono(),
                        datosActualizados.email()
                );
                contactos.set(i, contactoActualizado);
                return ResponseEntity.ok(contactoActualizado);
            }
        }
        throw new RecursoNoEncontradoException("No existe el contacto con id " + id);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarContacto(@PathVariable int id) {
        for (int i = 0; i < contactos.size(); i++) {
            if (contactos.get(i).id() == id) {
                contactos.remove(i);
                return ResponseEntity.noContent().build();
            }
        }
        throw new RecursoNoEncontradoException("No existe el contacto con id " + id);
    }
}
