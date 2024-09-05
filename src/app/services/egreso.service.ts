import { Egreso } from '@/interfaces/Egreso';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService: AuthService) {}

  listarEgresos(): Observable<{ success: boolean; message?: string; egresos?: Egreso[] }> {
    const endpoint = `${this.apiUrl}/api/egresos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Egreso[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        egresos: data,
        message: 'Lista de egresos obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de egresos:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de egresos'
        });
      })
    );
  }

  guardarEgreso(egreso: { descripcion: string; monto: number; metodo_pago: string }): Observable<{ success: boolean; message?: string }> {
    const endpoint = `${this.apiUrl}/api/egresos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; message?: string }>(endpoint, egreso, { headers }).pipe(
      map(response => ({
        success: true,
        message: 'Egreso guardado correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al guardar el egreso:', error);
        return throwError({
          success: false,
          message: error.error?.message || 'Error desconocido al guardar el egreso'
        });
      })
    );
  }

  eliminarEgreso(id: number): Observable<{ success: boolean; message?: string }> {
    const endpoint = `${this.apiUrl}/api/egresos/${id}`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<{ success: boolean; message?: string }>(endpoint, { headers }).pipe(
      map(response => ({
        success: true,
        message: 'Egreso eliminado correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al eliminar el egreso:', error);
        return throwError({
          success: false,
          message: error.error?.message || 'Error desconocido al eliminar el egreso'
        });
      })
    );
  }


}
