/**
 * Ingeniería de Software II — Unidad 5 — Clase 5
 * SOLUCIONARIO — componente Fila
 *
 * Ubicación en el proyecto:  src/components/fila.tsx
 *
 * Por qué hace falta un componente nuevo:
 *
 * Tarjeta tiene la prop `precio` obligatoria y la muestra con un "$"
 * adelante. Sirve para productos, pero no para contactos ni eventos, que
 * no tienen precio. Su interfaz (sus props) está pensada para un solo
 * tipo de dato.
 *
 * En lugar de forzar Tarjeta para que sirva para todo, se crea un
 * componente más genérico: un título y una línea de detalle. Es la
 * pregunta de la clase 2, "¿hasta dónde llega un componente?", resuelta
 * con un caso real.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { StyleSheet, Text, View } from 'react-native';

type Props = {
  titulo: string;
  detalle: string;
};

export default function Fila({ titulo, detalle }: Props) {
  return (
    <View style={styles.fila}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.detalle}>{detalle}</Text>
    </View>
  );
}

/**
 * Mismos colores y bordes que Tarjeta, para que la app se vea pareja
 * aunque sean componentes distintos.
 */
const styles = StyleSheet.create({
  fila: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5DFEC',
    padding: 16,
    gap: 6,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  detalle: {
    fontSize: 14,
    color: '#595959',
  },
});
