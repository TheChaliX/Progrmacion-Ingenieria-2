/**
 * Ingeniería de Software II — Unidad 5 — Clase 3
 * SOLUCIONARIO — tarjeta.tsx actualizado para el extra del taller
 *
 * Ubicación en el proyecto:  src/components/tarjeta.tsx
 *
 * En la clase 5 este archivo NO cambia: es el mismo de la clase 3.
 * Sólo se mueve a src/components/ porque el proyecto nuevo usa la
 * carpeta src/, igual que la plantilla default.
 *
 * Único cambio respecto de la versión de la clase 2: se agrega la prop
 * opcional `mostrarDescripcion` y la descripción pasa a mostrarse con el
 * operador &&.
 *
 * Como la prop es OPCIONAL y su valor por defecto es true, este mismo
 * archivo sirve para las dos versiones del taller: la base (que no la
 * manda y sigue viendo la descripción) y la del extra (que sí la manda).
 * Ampliar un componente sin romper a quienes ya lo usaban es justamente
 * lo que buscábamos al hablar de bajo acoplamiento.
 *
 * Prof. Luciano De Giorgio — IES N° 9233, Santa Fe
 */

import { StyleSheet, Text, View } from 'react-native';

type Props = {
  titulo: string;
  descripcion: string;
  precio: number;
  destacada?: boolean;
  mostrarDescripcion?: boolean;
};

export default function Tarjeta({
  titulo,
  descripcion,
  precio,
  destacada = false,
  mostrarDescripcion = true,
}: Props) {
  return (
    <View style={[styles.caja, destacada && styles.cajaDestacada]}>
      <Text style={styles.titulo}>{titulo}</Text>

      {/*
        El operador && de esta clase: si mostrarDescripcion es verdadera,
        se dibuja el Text. Si es falsa, no se dibuja nada.
      */}
      {mostrarDescripcion && (
        <Text style={styles.descripcion}>{descripcion}</Text>
      )}

      <Text style={styles.precio}>$ {precio}</Text>
    </View>
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
