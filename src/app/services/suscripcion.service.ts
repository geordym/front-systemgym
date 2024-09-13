import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Suscripcion } from '@/interfaces/Suscripcion';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient, private userService: AuthService) { }

  public apiUrl = environment.APIURL;

  listarSuscripciones(): Observable<{ success: boolean; message?: string; suscripciones?: Suscripcion[] }> {
    const endpoint = `${this.apiUrl}/membresias/suscripcion/listar`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Suscripcion[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        suscripciones: data,
        message: 'Lista de suscripciones obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de suscripciones:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de suscripciones'
        });
      })
    );

  }

  suscribirCliente(form: any): Observable<{ success: boolean, message: string }> {
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/api/membresias/suscribir`, form, { headers }).pipe(
      map(response => {
        if (response.success) {
          return { success: true, message: response.message };
        } else {
          throw new Error(response.message || 'Error desconocido');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema con la inscripción:', error);
        return throwError({
          success: false,
          message: error.error.message || 'Suscripción NO exitosa, algo falló'
        });
      })
    );

  }
}
