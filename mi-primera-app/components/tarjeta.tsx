/**
 * Ingeniería de Software II — Unidad 5 — Clase 3
 * SOLUCIONARIO — tarjeta.tsx actualizado para el extra del taller
 *
 * Ubicación en el proyecto:  components/tarjeta.tsx
 *
 * Único cambio respecto de la versión de la clase 2: se agrega la prop
 * opcional `onSeleccionar` y la View pasa a ser un Pressable.
 *
 * Como la prop es OPCIONAL, este mismo archivo sirve para las dos
 * versiones del taller: la base (que no la manda) y la del extra (que sí).
 * Ampliar la interfaz de un componente sin romper a quienes ya lo usaban
 * es exactamente lo que buscábamos al hablar de bajo acoplamiento.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  titulo: string;
  descripcion: string;
  precio: number;
  destacada?: boolean;
  /**
   * Una función que la tarjeta va a llamar cuando la toquen.
   *
   * La tarjeta no sabe qué hace esa función ni le interesa: sólo avisa.
   * Quien la use decide qué pasa. Por eso los datos bajan y los eventos
   * suben.
   */
  onSeleccionar?: () => void;
};

export default function Tarjeta({
  titulo,
  descripcion,
  precio,
  destacada = false,
  onSeleccionar,
}: Props) {
  return (
    /**
     * Si no se manda onSeleccionar, onPress queda en undefined y el
     * Pressable simplemente no reacciona: se comporta igual que la View
     * de la clase 2.
     */
    <Pressable
      onPress={onSeleccionar}
      style={[styles.caja, destacada && styles.cajaDestacada]}
    >
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
      <Text style={styles.precio}>$ {precio}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5DFEC',
    padding: 16,
    gap: 6,
  },
  cajaDestacada: {
    backgroundColor: '#EEF3F9',
    borderColor: '#2E74B5',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  descripcion: {
    fontSize: 14,
    color: '#595959',
  },
  precio: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E74B5',
  },
});
