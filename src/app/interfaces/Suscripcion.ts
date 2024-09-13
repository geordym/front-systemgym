import { Client } from "./client";
import { Membresia } from "./Membresia.interface";

export interface Suscripcion {
  id: string,
  client: Client,
  membresia: Membresia,
  fechaInicio: string,
  fechaFin: string,
  estado: string

}
