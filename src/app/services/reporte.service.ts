import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '@/interfaces/IngresoEgreso';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService:AuthService) {}


  listarIngresoEgreso(): Observable<{ success: boolean; message?: string; ingresoegreso?: IngresoEgreso }> {
    const endpoint = `${this.apiUrl}/api/reportes/ingresos-egresos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<IngresoEgreso[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        pagos: data,
        message: 'Lista de pagos obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de pagos:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de pagos'
        });
      })
    );
  }


  listarIngresoEgresoPorFecha(fecha: string): Observable<{ success: boolean; message?: string; ingresoegreso?: IngresoEgreso }> {
    const endpoint = `${this.apiUrl}/api/reportes/ingresos-egresos/${fecha}`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<IngresoEgreso>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        ingresoegreso: data,
        message: 'Lista de ingresos y egresos obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de Ingresos y Egresos:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de Ingresos y Egresos'
        });
      })
    );
  }
}




