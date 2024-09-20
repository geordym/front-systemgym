import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

interface Response{
  jwt: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.APIURL; // Asegúrate de definir `apiUrl` en tu archivo `environment.ts`


  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  loginWithEmailClient(username: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/api/auth/login/client`;

    return this.http.post<Response>(endpoint, { username, password }).pipe(
      switchMap(response => {
        if (response.jwt) {
          const token = response.jwt;
          localStorage.setItem('authToken', token);
          return this.getProfile().pipe(
            switchMap(user => {
              if (user.role !== "CLIENTE") {
                return throwError(() => new Error('Login failed: this credentials are not of a client')); // Lanzar el error correctamente
              }


              this.currentUser = user;
              return of(user); // Retornar el usuario si es válido
            }),
            catchError(profileError => {
              console.error('Error fetching profile', profileError);
              return throwError(() => new Error('Error fetching profile')); // Propagar el error al suscriptor
            })
          );
        } else {
          // Si la respuesta no contiene un token, devolver un error
          return throwError(() => new Error('Login failed: invalid credentials only crendentials of client can be used'));
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Login failed, only crendentials of client can be used'));
      })
    );
  }



  loginWithEmail(username: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/api/auth/login`;

    return this.http.post<Response>(endpoint, { username, password }).pipe(
      switchMap(response => {
        // Verificar si el token está en la respuesta
        if (response.jwt) {
          const token = response.jwt;
          localStorage.setItem('authToken', token);

          // Llamar a getProfile() para obtener el usuario
          return this.getProfile().pipe(
            map(user => {

              if(user.role == "ADMINISTRADOR"){
                return throwError(() => new Error('Login failed: this credentials are not of a administrador')); // Lanzar el error correctamente
              }


              this.currentUser = user;
              return user;
            }),
            catchError(profileError => {
              console.error('Error fetching profile', profileError);
              return throwError(() => new Error('Error fetching profile'));
            })
          );
        } else {
          // Si la respuesta no contiene un token, devolver un error
          return throwError(() => new Error('Login failed: invalid credentials, only crendentials of administrator can be used NOT JWT'));
        }
      }),
      catchError(error => {
        return throwError(() => new Error('Login failed, only crendentials of administrator can be used'));
      })
    );
}


  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getProfile(): Observable<any> {
    const token =  this.getAuthToken();
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
