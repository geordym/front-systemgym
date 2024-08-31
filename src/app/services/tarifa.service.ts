import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Tarifa } from '@/interfaces/Tarifa.interface';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private http: HttpClient, private userService: AuthService) {}

  public apiUrl = environment.APIURL;

  actualizarTarifa(tarifa: { id: number; valor_unitario: number }): Observable<{ success: boolean; message?: string }> {
    const endpoint = `${this.apiUrl}/api/tarifas`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<{ success: boolean; message?: string }>(endpoint, tarifa, { headers }).pipe(
      map(response => ({
        success: true,
        message: 'Tarifa actualizada correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al actualizar la tarifa:', error);
        return throwError({
          success: false,
          message: error.error?.error || 'Hubo un problema al actualizar la tarifa.'
        });
      })
    );
  }


  listarTarifas(): Observable<{ success: boolean; message?: string; tarifas?: Tarifa[] }> {
    const endpoint = `${this.apiUrl}/api/tarifas`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Tarifa[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        tarifas: data,
        message: 'Lista de tarifas obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de tarifas:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de tarifas'
        });
      })
    );
  }


}
