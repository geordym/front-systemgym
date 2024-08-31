import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pago } from '@/interfaces/Pago.interface';

@Injectable({
  providedIn: 'root'
})
export class PagosService {


  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService:AuthService) {}


  listarPagos(): Observable<{ success: boolean; message?: string; pagos?: Pago[] }> {
    const endpoint = `${this.apiUrl}/api/pagos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Pago[]>(endpoint, { headers }).pipe(
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

  pagarFactura(pago: { id_factura: number; descripcion: string; metodo_pago: string; monto: number }): Observable<{ success: boolean; message?: string }> {
    const endpoint = `${this.apiUrl}/api/pagos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; message?: string }>(endpoint, pago, { headers }).pipe(
      map(response => ({
        success: true,
        message: 'Pago realizado correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al realizar el pago:', error);
        return throwError({
          success: false,
          message: error.error?.error
        });
      })
    );
  }


}
