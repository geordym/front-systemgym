import { Inscripcion, InscripcionResponse } from '@/interfaces/Inscripcion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class InscripcionService {


  private apiUrl = environment.APIURL;


  constructor(private http: HttpClient, private userService:AuthService) {}

  inscribirCliente(inscripcion: Inscripcion): Observable<InscripcionResponse> {
    const endpoint = `${this.apiUrl}/api/cliente/inscribir`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<InscripcionResponse>(endpoint, inscripcion, { headers }).pipe(
      map(response => {
        // Si la respuesta tiene un id_factura, consideramos que es exitosa
        if (response && response.id_factura) {
          return { success: true, message: 'Inscripción exitosa', id_factura: response.id_factura };
        }
        // Si no tiene id_factura, manejamos el error como un error genérico
        return { success: false, message: 'Error inesperado' };
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }


  handleError(error: HttpErrorResponse): Observable<InscripcionResponse> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 0) {
        errorMessage = 'Network error: Please check your internet connection.';
      } else if (error.status >= 400 && error.status < 500) {
        if (typeof error.error === 'object' && !Array.isArray(error.error)) {
          // Extraer todos los mensajes de error en caso de que sea un objeto con pares clave-valor
          const messages = Object.values(error.error).join(' ');
          errorMessage = `Validation error: ${messages}`;
        } else {
          errorMessage = `Client-side error (${error.status}): ${error.error.message || 'Invalid request.'}`;
        }
      } else if (error.status >= 500) {
        errorMessage = `Server-side error (${error.status}): ${error.error.message || 'Server error occurred.'}`;
      }
    }

    console.error(errorMessage);

    // Retornamos un Observable con un error genérico en la estructura de InscripcionResponse
    return throwError({
      success: false,
      message: errorMessage
    });
  }


}
