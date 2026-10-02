package com.example.demo.controller;

import com.example.demo.dto.ProductoDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final List<ProductoDTO> productos = new ArrayList<>();
    private int siguienteId = 1;

    public ProductoController() {
        productos.add(new ProductoDTO(siguienteId++, "Teclado mecánico", 46000, 12));
        productos.add(new ProductoDTO(siguienteId++, "Mouse inalámbrico", 18000, 30));
        productos.add(new ProductoDTO(siguienteId++, "Monitor 24 pulgadas", 210000, 5));
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@Valid @RequestBody ProductoDTO nuevo) {
        ProductoDTO productoCreado = new ProductoDTO(
                siguienteId,
                nuevo.nombre(),
                nuevo.precio(),
                nuevo.stock()
        );
        productos.add(productoCreado);
        siguienteId++;
        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
    }

    @GetMapping
    public List<ProductoDTO> obtenerTodos() {
        return productos;
    }
}
