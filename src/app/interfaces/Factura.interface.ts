import { Client } from "./client";

export interface Factura {
  id:              number;
  iva:             number;
  total:           number;
  monto_pendiente: number;
  descripcion:     string;
  cliente:         Client;
  fecha:           Date;
  estado:          string;
  items:           any[];
}

