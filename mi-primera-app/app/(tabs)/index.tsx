/**
 * Ingeniería de Software II — Unidad 5 — Clase 4
 * Taller: el catálogo alimentado por la API real
 * SOLUCIONARIO — versión de la clase (el fetch vive en la pantalla)
 *
 * Ubicación en el proyecto:  app/(tabs)/index.tsx
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Tarjeta from '../../components/tarjeta';

/**
 * PUNTO 2 — La dirección del backend, en una sola constante.
 *
 * CAMBIAR POR LA IP DE TU COMPUTADORA (ipconfig en Windows).
 * "localhost" no sirve: para el celular, localhost es el celular.
 */
const API = 'http://172.20.10.3:8080';

/**
 * PUNTO 2 — La forma de los datos que devuelve el backend.
 *
 * Copia del ProductoDTO de Java. Los nombres tienen que coincidir
 * exactamente con los del JSON: si acá pusiéramos "titulo" en vez de
 * "nombre", llegaría undefined y nadie avisaría.
 */
type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

export default function PantallaCatalogo() {
  /**
   * PUNTO 3 — Los tres estados de una pantalla que pide datos.
   *
   * cargando arranca en true porque el pedido sale apenas aparece la
   * pantalla: desde el primer instante ya estamos esperando.
   */
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * La función va declarada acá adentro porque useEffect no puede ser
     * async. Se define y se la llama en la última línea del efecto.
     */
    async function cargar() {
      try {
        const respuesta = await fetch(API + '/api/productos');

        // Sin este chequeo, un 404 o un 500 pasarían como si fueran datos.
        if (!respuesta.ok) {
          throw new Error('El servidor respondió ' + respuesta.status);
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (e) {
        setError('No se pudieron cargar los productos. Revisá que el servidor esté encendido y que la IP sea la correcta.');
      } finally {
        // Corre siempre, haya salido bien o mal. Por eso va acá y no
        // repetido en el try y en el catch.
        setCargando(false);
      }
    }

    cargar();
  }, []); // los corchetes vacíos: una sola vez, al aparecer la pantalla

  /**
   * PUNTO 3 — Salida temprana: un return por cada estado.
   *
   * Los tres return van DESPUÉS de todos los hooks. Si se pusiera un
   * return antes de un useState, React tira "Invalid hook call".
   */
  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#2E74B5" />
        <Text style={styles.mensaje}>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  /**
   * PUNTO 4 — Si llegó hasta acá, hay datos para mostrar.
   *
   * FlatList dibuja sólo lo que entra en pantalla, que es lo que
   * corresponde cuando los datos vienen del servidor y no sabemos
   * cuántos van a ser.
   */
  return (
    <View style={styles.pantalla}>
      <Text style={styles.encabezado}>Catálogo</Text>

      {productos.length === 0 && (
        <Text style={styles.vacio}>El catálogo está vacío.</Text>
      )}

      <FlatList
        data={productos}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          /**
           * Acá se ve el trabajo de la clase: los nombres del backend no
           * son los mismos que las props de Tarjeta, así que los
           * adaptamos en el momento de usarlos.
           *
           * El componente Tarjeta no se toca. Cuarta clase seguida.
           */
          <Tarjeta
            titulo={item.nombre}
            descripcion={
              item.stock > 0 ? `Stock: ${item.stock} unidades` : 'Sin stock'
            }
            precio={item.precio}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  centro: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  encabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3864',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  mensaje: {
    fontSize: 15,
    color: '#595959',
  },
  error: {
    fontSize: 15,
    color: '#B33A3A',
    textAlign: 'center',
    lineHeight: 22,
  },
  vacio: {
    fontSize: 15,
    color: '#595959',
    textAlign: 'center',
    paddingVertical: 24,
  },
});

/**
 * Para probar el estado de error:
 *
 * Apagar el backend en IntelliJ y recargar la app. Tiene que aparecer el
 * mensaje rojo, no una pantalla en blanco. Es el caso que nunca se prueba
 * y el que más se ve en producción.
 */
