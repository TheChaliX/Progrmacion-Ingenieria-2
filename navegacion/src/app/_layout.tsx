/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — layout raíz
 *
 * Ubicación en el proyecto:  src/app/_layout.tsx
 *
 * Este archivo NO es una pantalla: es el que envuelve a todas las
 * pantallas y decide CÓMO se navega entre ellas.
 *
 * Acá elegimos un Stack: cada pantalla nueva se apila encima de la
 * anterior, y el botón de volver (o el gesto) la saca de la pila. El
 * Stack además dibuja solo la barra de arriba con el título y la flecha
 * para volver: no hay que programarla.
 *
 * Cada Stack.Screen le pone el título a una pantalla. El `name` es el
 * nombre del ARCHIVO sin la extensión: "productos" es productos.tsx.
 * Si no coincide, Expo Router avisa en la consola.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { Stack } from 'expo-router';

export default function LayoutRaiz() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Inicio' }} />
      <Stack.Screen name="productos" options={{ title: 'Productos' }} />
      <Stack.Screen name="contactos" options={{ title: 'Contactos' }} />
      <Stack.Screen name="eventos" options={{ title: 'Eventos' }} />
    </Stack>
  );
}
