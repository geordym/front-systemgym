import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PagosYSuscripcion } from '@/interfaces-client/PagosYSuscripcion';

@Injectable({
  providedIn: 'root'
})
export class ClientmoduleService {


  private apiUrl = environment.APIURL;


  constructor(private http: HttpClient, private userService: AuthService) {}


  listarPagosYSuscripciones(): Observable<{ success: boolean; message?: string; pagosysuscripcion?: PagosYSuscripcion }> {
    const endpoint = `${this.apiUrl}/api/cliente/listar/pagosysuscripciones`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<PagosYSuscripcion>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        pagosysuscripcion: data,
        message: 'Lista de pagos y suscripciones obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de pagos y suscripciones:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de pagos y suscripciones'
        });
      })
    );
  }
}
