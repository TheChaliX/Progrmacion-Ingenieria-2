package com.example.demo.controller;


import com.example.demo.dto.EventoDTO;
import com.example.demo.dto.InscripcionDTO;
import com.example.demo.excepcion.CupoAgotadoException;
import com.example.demo.excepcion.RecursoNoEncontradoException;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * EJERCICIO 9 — EventoController con validacion y regla de negocio.
 *
 * Ademas del CRUD, agrega un endpoint de inscripcion que puede fallar
 * por una razon distinta a todas las que veniamos manejando:
 *
 *   POST /api/eventos/{id}/inscripciones
 *
 * Si el evento ya llego a su cupo, el pedido esta bien armado (JSON
 * valido, id existente, tipos correctos) pero no se puede cumplir. Eso
 * NO es un 400: es un 409 Conflict.
 */
@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final List<EventoDTO> eventos = new ArrayList<>();

    /** Cuantos inscriptos lleva cada evento: id del evento -> cantidad. */
    private final Map<Integer, Integer> inscriptos = new HashMap<>();

    private int siguienteId = 1;

    public EventoController() {
        agregarEvento(new EventoDTO(siguienteId++, "Charla de Spring Boot", "15/10/2026", "Aula Magna", 3));
        agregarEvento(new EventoDTO(siguienteId++, "Taller de Postman", "22/10/2026", "Laboratorio 2", 20));
    }

    /** Metodo de ayuda: agrega el evento y arranca su contador en cero. */
    private void agregarEvento(EventoDTO evento) {
        eventos.add(evento);
        inscriptos.put(evento.id(), 0);
    }

    /** Metodo de ayuda: busca o lanza la excepcion. Evita repetir el for. */
    private EventoDTO buscarOFallar(int id) {
        for (EventoDTO e : eventos) {
            if (e.id() == id) {
                return e;
            }
        }
        throw new RecursoNoEncontradoException("No existe el evento con id " + id);
    }

    @GetMapping
    public List<EventoDTO> listar() {
        return eventos;
    }

    @GetMapping("/{id}")
    public EventoDTO buscarPorId(@PathVariable int id) {
        return buscarOFallar(id);
    }

    @PostMapping
    public ResponseEntity<EventoDTO> crear(@Valid @RequestBody EventoDTO nuevo) {
        EventoDTO evento = new EventoDTO(
                siguienteId++, nuevo.nombre(), nuevo.fecha(), nuevo.lugar(), nuevo.cupo());
        agregarEvento(evento);
        return ResponseEntity.status(HttpStatus.CREATED).body(evento);
    }

    @PutMapping("/{id}")
    public EventoDTO actualizar(@PathVariable int id, @Valid @RequestBody EventoDTO cambios) {
        for (int i = 0; i < eventos.size(); i++) {
            if (eventos.get(i).id() == id) {
                EventoDTO actualizado = new EventoDTO(
                        id, cambios.nombre(), cambios.fecha(), cambios.lugar(), cambios.cupo());
                eventos.set(i, actualizado);
                return actualizado;
            }
        }
        throw new RecursoNoEncontradoException("No existe el evento con id " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        boolean existia = eventos.removeIf(e -> e.id() == id);
        if (!existia) {
            throw new RecursoNoEncontradoException("No existe el evento con id " + id);
        }
        inscriptos.remove(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * EJERCICIO 9 — Inscribir a una persona en un evento.
     *
     * Tres resultados posibles, tres codigos distintos:
     *
     *   201 Created  -> quedaba lugar y la inscripcion se registro.
     *   404 Not Found -> el evento no existe (RecursoNoEncontradoException).
     *   409 Conflict  -> el evento existe pero esta lleno (CupoAgotadoException).
     *
     * Para probar el 409: el evento 1 tiene cupo 3, asi que la cuarta
     * inscripcion tiene que fallar.
     */
    @PostMapping("/{id}/inscripciones")
    public ResponseEntity<InscripcionDTO> inscribir(@PathVariable int id) {

        EventoDTO evento = buscarOFallar(id);
        int cantidad = inscriptos.get(id);

        if (cantidad >= evento.cupo()) {
            throw new CupoAgotadoException(
                    "El evento \"" + evento.nombre() + "\" ya cubrio su cupo de "
                    + evento.cupo() + " personas.");
        }

        cantidad++;
        inscriptos.put(id, cantidad);

        InscripcionDTO inscripcion = new InscripcionDTO(
                evento.id(), evento.nombre(), cantidad, evento.cupo() - cantidad);

        return ResponseEntity.status(HttpStatus.CREATED).body(inscripcion);
    }
}
