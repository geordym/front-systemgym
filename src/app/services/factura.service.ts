import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Factura } from '@/interfaces/Factura.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService:AuthService) {}



  listarFacturasPorClienteId(clientId: number): Observable<{ success: boolean; message?: string; facturas?: Factura[] }> {
    const endpoint = `${this.apiUrl}/api/facturas/clientes/${clientId}`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Factura[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        facturas: data,
        message: 'Lista de facturas obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de facturas:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de facturas'
        });
      })
    );
  }

}
