import { Egreso } from "./Egreso";
import { Pago } from "./Pago.interface";

export interface IngresoEgreso {
  ingresos: Pago[];
  egresos:  Egreso[];
}

