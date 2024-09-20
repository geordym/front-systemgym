import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '@/interfaces/IngresoEgreso';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = environment.APIURL;

  constructor(private http: HttpClient, private userService:AuthService) {}

  obtenerReporteSuscripciones(): Observable<void> {
    const endpoint = `${this.apiUrl}/api/reportes/suscripciones`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(endpoint, { headers, responseType: 'blob' }).pipe(
      map((response: Blob) => {
        // Crear un objeto Blob con los datos del PDF
        const blob = new Blob([response], { type: 'application/pdf' });

        // Crear una URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un elemento <a> para realizar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `suscripciones_activas.pdf`;  // Nombre del archivo
        document.body.appendChild(a);  // Añadir el <a> al DOM temporalmente
        a.click();  // Hacer clic en el enlace para descargar el archivo

        // Eliminar el enlace del DOM
        document.body.removeChild(a);

        // Liberar la URL del Blob
        window.URL.revokeObjectURL(url);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al descargar el reporte en PDF:', error);
        return throwError('Hubo un problema al descargar el reporte en PDF.');
      })
    );
  }

  obtenerReporteIngresos(año: number, dia: number): Observable<void> {
    const endpoint = `${this.apiUrl}/api/reportes/ingresos/${año}/${dia}`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(endpoint, { headers, responseType: 'blob' }).pipe(
      map((response: Blob) => {
        // Crear un objeto Blob con los datos del PDF
        const blob = new Blob([response], { type: 'application/pdf' });

        // Crear una URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un elemento <a> para realizar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_ingresos_${año}_${dia}.pdf`;  // Nombre del archivo
        document.body.appendChild(a);  // Añadir el <a> al DOM temporalmente
        a.click();  // Hacer clic en el enlace para descargar el archivo

        // Eliminar el enlace del DOM
        document.body.removeChild(a);

        // Liberar la URL del Blob
        window.URL.revokeObjectURL(url);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al descargar el reporte en PDF:', error);
        return throwError('Hubo un problema al descargar el reporte en PDF.');
      })
    );
  }



  listarIngresoEgreso(): Observable<{ success: boolean; message?: string; ingresoegreso?: IngresoEgreso }> {
    const endpoint = `${this.apiUrl}/api/reportes/ingresos-egresos`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<IngresoEgreso[]>(endpoint, { headers }).pipe(
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


  listarIngresoEgresoPorFecha(fecha: string): Observable<{ success: boolean; message?: string; ingresoegreso?: IngresoEgreso }> {
    const endpoint = `${this.apiUrl}/api/reportes/ingresos-egresos/${fecha}`;
    const token = this.userService.getAuthToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<IngresoEgreso>(endpoint, { headers }).pipe(
      map(data => ({
        success: true,
        ingresoegreso: data,
        message: 'Lista de ingresos y egresos obtenida correctamente'
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Hubo un problema al obtener la lista de Ingresos y Egresos:', error);
        return throwError({
          success: false,
          message: 'Hubo un problema al obtener la lista de Ingresos y Egresos'
        });
      })
    );
  }
}




