import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient, private userService: AuthService) { }

  public apiUrl = environment.APIURL;

  suscribirCliente(form: any): Observable<{ success: boolean, message: string }> {
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean, message: string }>(`${this.apiUrl}/api/membresias/vender`, form, { headers }).pipe(
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
