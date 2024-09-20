import { Client } from "@/interfaces/client";
import { Membresia } from "@/interfaces-client/Membresia";

export interface Suscripcion {
  id: string,
  client: Client,
  membresia: Membresia,
  fechaInicio: string,
  fechaFin: string,
  estado: string
}
