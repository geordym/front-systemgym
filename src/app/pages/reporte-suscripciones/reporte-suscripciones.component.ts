import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from '@services/reporte.service';

@Component({
  selector: 'app-reporte-suscripciones',
  templateUrl: './reporte-suscripciones.component.html',
  styleUrl: './reporte-suscripciones.component.scss'
})
export class ReporteSuscripcionesComponent {

  message: string = "";
  error: string = "";

  reportForm: FormGroup;
  constructor(private fb: FormBuilder, private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({

    });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.reporteService.obtenerReporteSuscripciones().subscribe({
        next: () => {
          console.log('Reporte descargado exitosamente.');
        },
        error: (err) => {
          console.error('Error al descargar el reporte:', err);
        }
      });
    } else {
      console.error('El formulario no es válido.');
    }
  }


}
