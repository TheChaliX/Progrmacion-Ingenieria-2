/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — pantalla de eventos
 *
 * Ubicación en el proyecto:  src/app/eventos.tsx   ->  ruta /eventos
 *
 * Mismo patrón que productos.tsx y contactos.tsx. Usa Fila, igual que
 * contactos: un evento tampoco tiene precio.
 *
 * La fecha se muestra tal como llega del backend ("15/10/2026"): el
 * EventoDTO la declara como String, así que no hay que convertirla.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import Fila from '../components/fila';
import { obtenerEventos, type Evento } from '../services/api';

export default function PantallaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await obtenerEventos();
        setEventos(datos);
      } catch (e) {
        setError('No se pudieron cargar los eventos. Revisá que el servidor esté encendido y que la IP sea la correcta.');
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
        <Text style={styles.mensaje}>Cargando eventos...</Text>
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
      {eventos.length === 0 && (
        <Text style={styles.vacio}>No hay eventos cargados.</Text>
      )}

      <FlatList
        data={eventos}
        keyExtractor={(ev) => String(ev.id)}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <Fila
            titulo={item.nombre}
            detalle={`${item.fecha}  ·  ${item.lugar}  ·  Cupo: ${item.cupo}`}
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
