export interface Pago {
  id:          number;
  factura_id:  number;
  descripcion: string;
  metodo_pago: string;
  monto:       number;
  fecha?: Date;
}
