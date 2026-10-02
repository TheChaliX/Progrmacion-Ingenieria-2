/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — capa de acceso a la API
 *
 * Ubicación en el proyecto:  src/services/api.ts
 *
 * Es el mismo archivo de la clase 4, con dos funciones nuevas:
 * obtenerContactos y obtenerEventos.
 *
 * Fijate cómo creció: para sumar dos endpoints nuevos se agregaron dos
 * funciones y dos types, sin tocar nada de lo que ya estaba. Las
 * pantallas que ya usaban obtenerProductos no se enteraron.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

/**
 * La dirección del backend, en un solo lugar de todo el proyecto.
 *
 * CAMBIAR POR LA IP DE LA NOTEBOOK donde corre Spring Boot.
 *
 * Si están usando el hotspot de un celular, la IP cambia al conectarse:
 * hay que volver a correr ipconfig DESPUÉS de conectar la notebook a
 * esa red, y copiar la "Dirección IPv4" que aparezca.
 */
export const API_URL = 'http://172.20.10.9:8080';

/* ------------------------------------------------------------------ */
/* Los types: copia, del lado del cliente, de los DTO de Java.         */
/* Los nombres tienen que coincidir exactamente con los del JSON.      */
/* ------------------------------------------------------------------ */

export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

export type Contacto = {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
};

/**
 * La fecha llega como texto ("15/10/2026"), no como fecha: así la
 * declara el EventoDTO del backend. Por eso acá es string y se muestra
 * tal cual, sin convertirla.
 */
export type Evento = {
  id: number;
  nombre: string;
  fecha: string;
  lugar: string;
  cupo: number;
};

/* ------------------------------------------------------------------ */
/* Las funciones: una por endpoint.                                    */
/* ------------------------------------------------------------------ */

/** GET /api/productos  ->  200 con un array de productos */
export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await fetch(`${API_URL}/api/productos`);
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`);
  }
  return respuesta.json();
}

/** GET /api/contactos  ->  200 con un array de contactos */
export async function obtenerContactos(): Promise<Contacto[]> {
  const respuesta = await fetch(`${API_URL}/api/contactos`);
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`);
  }
  return respuesta.json();
}

/** GET /api/eventos  ->  200 con un array de eventos */
export async function obtenerEventos(): Promise<Evento[]> {
  const respuesta = await fetch(`${API_URL}/api/eventos`);
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`);
  }
  return respuesta.json();
}

/**
 * GET /api/productos/{id}  ->  200 con el producto, o 404 si no existe
 *
 * La dejamos escrita en la clase 4 sin usar. En esta clase la usa el
 * EXTRA del taller: la pantalla de detalle de un producto.
 */
export async function obtenerProductoPorId(id: number): Promise<Producto> {
  const respuesta = await fetch(`${API_URL}/api/productos/${id}`);
  if (respuesta.status === 404) {
    throw new Error(`No existe el producto con id ${id}`);
  }
  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`);
  }
  return respuesta.json();
}
