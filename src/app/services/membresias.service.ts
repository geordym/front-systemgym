import { Membresia } from '@/interfaces/Membresia.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembresiasService {
  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService:AuthService) {}



  listarMembresias(): Observable<{ success: boolean; message?: string; membresias?: Membresia[] }> {
    const endpoint = `${this.apiUrl}/api/membresias/listar`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<Membresia[]>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        membresias: data,
        message: 'Lista de membresías obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de membresías:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de membresías'
        });
      })
    );
  }

  crearMembresia(membresia: Membresia): Observable<{ success: boolean, message?: string }> {
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean, message?: string }>(`${this.apiUrl}/api/membresias/crear`, membresia, { headers }).pipe(
      map(response => {
        if (response.success) {
          return { success: true, message: response.message };
        } else {
          throw new Error(response.message || 'Error desconocido');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al crear la membresía:', error);
        return throwError({
          success: false,
          message: error.error.message || 'Hubo un problema al crear la membresía'
        });
      })
    );
  }


}
