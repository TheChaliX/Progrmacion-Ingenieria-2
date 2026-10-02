/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — pantalla de inicio
 *
 * Ubicación en el proyecto:  src/app/index.tsx
 *
 * index.tsx es la ruta "/": la primera pantalla que se ve al abrir la
 * app. Funciona de menú: tres botones, uno por cada pantalla.
 *
 * Esta pantalla no pide datos al servidor, así que no tiene useEffect
 * ni estados de carga. Sólo navega.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PantallaInicio() {
  return (
    <View style={styles.pantalla}>
      <Text style={styles.titulo}>Mi primera app con navegación</Text>
      <Text style={styles.subtitulo}>
        Cada botón abre una pantalla que trae sus datos del backend de
        Programación I.
      </Text>

      {/*
        router.push apila una pantalla nueva encima de esta.
        La ruta es el nombre del archivo: "/productos" es productos.tsx.

        Es el mismo Pressable con onPress de la clase 3: lo único nuevo
        es lo que se hace adentro del onPress.
      */}
      <Pressable style={styles.boton} onPress={() => router.push('/productos')}>
        <Text style={styles.botonTexto}>Productos</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => router.push('/contactos')}>
        <Text style={styles.botonTexto}>Contactos</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => router.push('/eventos')}>
        <Text style={styles.botonTexto}>Eventos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    padding: 24,
    gap: 14,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3864',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#595959',
    textAlign: 'center',
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#2E74B5',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
