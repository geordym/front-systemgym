import { DashboardData } from '@/interfaces/DashboardData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { MembresiasService } from './membresias.service';
import { EstadisticaMembresia } from '@/interfaces/EstadisticaMembresia';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.APIURL;
  public membresias: EstadisticaMembresia[] = [];


  constructor(private http: HttpClient, private userService: AuthService) {}
  generalDashboard(): Observable<DashboardData> {
    const endpoint = `${this.apiUrl}/api/dashboard/general`;

    // Obtén el token
    const token = this.userService.getAuthToken();
    console.log("The token is: " + token);

    // Crea los headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Realiza la solicitud HTTP
    return this.http.get<DashboardData>(endpoint, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching dashboard data', error);
        return throwError(error);
      })
    );
  }

}
