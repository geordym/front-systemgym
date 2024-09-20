// dashboard.component.ts
import { DashboardData } from '@/interfaces/DashboardData';
import { EstadisticaMembresia } from '@/interfaces/EstadisticaMembresia';
import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {
    faBookmark,
    faEnvelope,
    faChartSimple,
    faCartShopping,
    faUserPlus,
    faChartPie
} from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from '@services/dashboard.service';
import { MembresiasService } from '@services/membresias.service';
import { Color } from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  public dashboardData: DashboardData | undefined;

  public estadisticas: EstadisticaMembresia[] = [];

  public error: any;
  colorScheme: Color;

  constructor(private dashboardService: DashboardService, private router: Router, private membresiaService: MembresiasService) {}


  public pieChartData: any[] = [
  ];

  ngOnInit(): void {
    this.fetchDashboardData();
    this.obtenerEstadisticaMembresia();
  }

  fetchDashboardData(): void {
    this.dashboardService.generalDashboard().subscribe(
      data => {
        this.dashboardData = data;
      },
      error => {
        this.error = 'Error fetching dashboard data';
        console.error('Error:', error);
      }
    );
  }


  obtenerEstadisticaMembresia(): void {
    this.membresiaService.obtenerEstadisticaMembresia().subscribe({
      next: (response) => {
        if (response.success) {
          this.estadisticas = response.membresias || []; // Guarda la lista de membresías
          this.pieChartData = []; // Asegúrate de inicializar el array
          this.estadisticas.forEach((estadistica) => {
            this.pieChartData.push({ name: estadistica.membresia, value: estadistica.cantidad });
          });
        } else {
          // Manejo de error o mensaje si no se obtienen estadísticas
          console.warn('No se obtuvieron estadísticas de membresías');
        }
      },
      error: (err) => {
        console.error('Error al obtener estadísticas de membresías:', err);
      }
    });
  }



  redirectTo(route: string){
    this.router.navigate([route]);
  }



    faBookmark = faBookmark;
    faEnvelope = faEnvelope;
    faChartSimple = faChartSimple;
    faCartShopping = faCartShopping;
    faUserPlus = faUserPlus;
    faChartPie = faChartPie;
}
