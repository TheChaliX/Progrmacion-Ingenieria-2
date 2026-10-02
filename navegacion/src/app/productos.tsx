/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — pantalla de productos
 *
 * Ubicación en el proyecto:  src/app/productos.tsx   ->  ruta /productos
 *
 * Es la pantalla de la clase 4 casi sin cambios. Las diferencias:
 *
 *   - Ya no tiene el texto "Catálogo" arriba: el título ahora lo pone
 *     el Stack, desde el _layout.tsx.
 *   - El import de la API y de Tarjeta sube un solo nivel (../), porque
 *     el archivo está directamente en src/app/ y no en una subcarpeta.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Tarjeta from '../components/tarjeta';
import { obtenerProductos, type Producto } from '../services/api';

export default function PantallaProductos() {
  // Los tres estados de una pantalla que pide datos (clase 4)
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (e) {
        setError('No se pudieron cargar los productos. Revisá que el servidor esté encendido y que la IP sea la correcta.');
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

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

  return (
    <View style={styles.pantalla}>
      {productos.length === 0 && (
        <Text style={styles.vacio}>No hay productos cargados.</Text>
      )}

      <FlatList
        data={productos}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
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
  pantalla: { flex: 1, backgroundColor: '#F4F7FB' },
  centro: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  lista: { padding: 16, gap: 12 },
  mensaje: { fontSize: 15, color: '#595959' },
  error: { fontSize: 15, color: '#B33A3A', textAlign: 'center', lineHeight: 22 },
  vacio: { fontSize: 15, color: '#595959', textAlign: 'center', paddingVertical: 24 },
});
