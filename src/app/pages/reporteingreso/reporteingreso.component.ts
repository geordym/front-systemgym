import { IngresoEgreso } from '@/interfaces/IngresoEgreso';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReporteService } from '@services/reporte.service';

@Component({
  selector: 'app-reporteingreso',
  templateUrl: './reporteingreso.component.html',
  styleUrl: './reporteingreso.component.scss'
})
export class ReporteingresoComponent {

  message: string = "";
  error: string = "";

  reportForm: FormGroup;
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' }
  ];

  constructor(private fb: FormBuilder, private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      year: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      month: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      // Extraer el año y el mes del formulario
      const { year, month } = this.reportForm.value;

      // Llamar al servicio para obtener y descargar el reporte
      this.reporteService.obtenerReporteIngresos(year, month).subscribe({
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
