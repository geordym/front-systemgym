
export interface Inscripcion {
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  direccion_residencia: string;
  telefono_personal: number;
  telefono_contacto_emergencia: number;
  email: string;
  lesiones: string;
  enfermedades: string;
  informacion_medica_relevante: string;
  tipo_sangre: string;
  politicas: boolean;
  consentimiento: boolean;
}

export interface InscripcionResponse {
  success: boolean;
  message: string;
  id_factura?: number; // `id_factura` es opcional porque solo estará presente si la inscripción es exitosa
}
