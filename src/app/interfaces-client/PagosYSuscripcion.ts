import { Suscripcion } from "@/interfaces-client/Suscripcion";
import { Pago } from "./Pago";

export interface PagosYSuscripcion {

  pagoFacturas: Pago[],
  suscripcionList: Suscripcion[]

}
