/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — pantalla de contactos
 *
 * Ubicación en el proyecto:  src/app/contactos.tsx   ->  ruta /contactos
 *
 * Mismo patrón que productos.tsx (ver los comentarios de ese archivo).
 * Cambian tres cosas, y nada más:
 *
 *   1. La función que se llama: obtenerContactos en vez de obtenerProductos
 *   2. El type: Contacto en vez de Producto
 *   3. El componente: Fila en vez de Tarjeta, porque un contacto no
 *      tiene precio
 *
 * Que el resto sea idéntico es la prueba de que el patrón de los tres
 * estados sirve para cualquier pantalla que pida datos.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Fila from '../components/fila';
import { obtenerContactos, type Contacto } from '../services/api';

export default function PantallaContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await obtenerContactos();
        setContactos(datos);
      } catch (e) {
        setError('No se pudieron cargar los contactos. Revisá que el servidor esté encendido y que la IP sea la correcta.');
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
        <Text style={styles.mensaje}>Cargando contactos...</Text>
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
      {contactos.length === 0 && (
        <Text style={styles.vacio}>No hay contactos cargados.</Text>
      )}

      <FlatList
        data={contactos}
        keyExtractor={(c) => String(c.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Fila
            titulo={item.nombre}
            detalle={`${item.telefono}  ·  ${item.email}`}
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
