import { IngresoEgreso } from '@/interfaces/IngresoEgreso';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReporteService } from '@services/reporte.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrl: './ingreso-egreso.component.scss'
})
export class IngresoEgresoComponent {

  ingresoEgreso: IngresoEgreso = undefined;


  reportForm: FormGroup;

  selectedDate: string = '';
  message: string | null = null;
  error: string | null = null;


  constructor(private fb: FormBuilder, private reporteService: ReporteService) {
    this.reportForm = this.fb.group({
      fecha: ['']
    });
  }

  ngOnInit(): void {
    this.fetchReportData();
  }

  fetchReportData(): void {
    if (this.selectedDate) {
      this.reporteService.listarIngresoEgreso().subscribe(
        response => {
          this.ingresoEgreso = response.ingresoegreso;
          this.message = 'Datos obtenidos correctamente';
        },
        error => {
          this.error = 'Error al obtener los datos';
        }
      );
    }
  }

  fetchReportDataByDate(): void {
    if (this.selectedDate) {
      this.reporteService.listarIngresoEgresoPorFecha(this.selectedDate).subscribe(
        response => {
          this.ingresoEgreso = response.ingresoegreso;
          console.log(response.ingresoegreso);
          this.message = 'Datos obtenidos correctamente';
        },
        error => {
          this.error = 'Error al obtener los datos';
        }
      );
    }
  }


  onFechaChange(fecha: string): void {
    this.selectedDate = fecha;
    this.fetchReportData();
  }

  onSubmit() {
    this.selectedDate = this.reportForm.get('fecha').value;
    this.fetchReportDataByDate();
    //console.log("Fetching");
  }

}
