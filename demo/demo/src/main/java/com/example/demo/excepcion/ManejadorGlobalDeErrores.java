package com.example.demo.excepcion;

import com.example.demo.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ManejadorGlobalDeErrores {

    // 1. Captura cuando un recurso no existe (404)
    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ErrorDTO> noEncontrado(RecursoNoEncontradoException ex) {
        ErrorDTO error = new ErrorDTO(LocalDateTime.now(), 404, "Not Found", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // 1.b Captura cuando el evento existe pero ya no tiene cupo (409)
    @ExceptionHandler(CupoAgotadoException.class)
    public ResponseEntity<ErrorDTO> cupoAgotado(CupoAgotadoException ex) {
        ErrorDTO error = new ErrorDTO(LocalDateTime.now(), 409, "Conflict", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    // 2. Captura fallas de @Valid (400 con mapa detallado)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        for (FieldError e : ex.getBindingResult().getFieldErrors()) {
            errores.put(e.getField(), e.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errores);
    }

    // 3. JSON roto o tipos incorrectos en parámetros (400)
    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentTypeMismatchException.class})
    public ResponseEntity<ErrorDTO> pedidoMalArmado(Exception ex) {
        ErrorDTO error = new ErrorDTO(LocalDateTime.now(), 400, "Bad Request",
                "El pedido está mal armado: revise el formato JSON o el tipo de los parámetros.");
        return ResponseEntity.badRequest().body(error);
    }

    // 4. Red de seguridad genérica (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> generico(Exception ex) {
        ex.printStackTrace();
        ErrorDTO error = new ErrorDTO(LocalDateTime.now(), 500, "Internal Server Error", "Ocurrió un error inesperado.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}
