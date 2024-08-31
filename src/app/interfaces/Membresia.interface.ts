

export interface Membresia {
  id?: number;
  nombre: string;
  precio: number;
  periodicidad: 'mensual' | 'trimestral' | 'anual';
  accesos: string;
}
