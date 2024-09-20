import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userService: AuthService) { }

  public apiUrl = environment.APIURL;


  actualizarImagenUsuario(id: string, image: File): Observable<{ success: boolean; message?: string }> {
    const endpoint = `${this.apiUrl}/api/users/profile-picture-change/${id}`;
    const token = this.userService.getAuthToken();

    // Crear un objeto FormData para manejar el multipart/form-data
    const formData: FormData = new FormData();
    formData.append('image', image); // Adjuntamos la imagen con el nombre 'image'

    // No necesitamos el Content-Type aquí porque FormData lo maneja automáticamente
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<{ success: boolean; message: string }>(endpoint, formData, { headers }).pipe(
      map(response => ({
        success: response.success,
        message: response.message // Aquí tomamos el mensaje de la respuesta
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al actualizar la imagen del usuario', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al actualizar la imagen del usuario'
        });
      })
    );
  }





}
