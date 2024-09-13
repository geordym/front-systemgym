// dashboard.component.ts
import { DashboardData } from '@/interfaces/DashboardData';
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

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  public dashboardData: DashboardData | undefined;
  public error: any;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDashboardData();
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
