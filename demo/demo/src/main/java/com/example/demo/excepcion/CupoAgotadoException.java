package com.example.demo.excepcion;

public class CupoAgotadoException extends RuntimeException {
    public CupoAgotadoException(String message) {
        super(message);
    }
}
