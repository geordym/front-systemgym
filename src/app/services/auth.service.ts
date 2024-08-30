import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';

interface Response{
  jwt: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.APIURL; // Asegúrate de definir `apiUrl` en tu archivo `environment.ts`


  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  loginWithEmail(username: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/api/auth/login`;
    return this.http.post<Response>(endpoint, { username, password }).pipe(
      map(response => {
        const token = response.jwt;
        localStorage.setItem('authToken', token);

        // Opcional: Llama a un método para obtener el perfil del usuario
        return this.getProfile().pipe(
          map(user => {
            this.currentUser = user;
            return user;
          }),
          catchError(error => {
            console.error('Error fetching profile', error);
            return of(null);
          })
        );
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(null);
      })
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(null); // No hay token, no se puede obtener el perfil
    }

    const endpoint = `${this.apiUrl}/api/users/info`;
    return this.http.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      map(response => {
        this.currentUser = response;
        return response;
      }),
      catchError(error => {
        console.error('Profile error', error);
        return of(null);
      })
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('authToken');
  }

  get user() {
    return this.currentUser;
  }
}
