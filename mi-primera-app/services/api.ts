export const API_URL = 'http://192.168.100.18:8080';
export type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await fetch(`${API_URL}/api/productos`);

  if (!respuesta.ok) {
    throw new Error(`El servidor respondió ${respuesta.status}`);
  }

  return respuesta.json();
}

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
