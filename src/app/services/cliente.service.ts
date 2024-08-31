import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Client } from '@/interfaces/client';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private userService: AuthService) {}

  private apiUrl = environment.APIURL;

  listarClientes(): Observable<{ success: boolean; message?: string; clients?: Client[] }> {
    const endpoint = `${this.apiUrl}/api/cliente/listar`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Client[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        clients: data,
        message: 'Lista de clientes obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de clientes:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de clientes'
        });
      })
    );
  }

}
