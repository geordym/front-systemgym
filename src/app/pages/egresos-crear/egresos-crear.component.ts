import { Egreso } from '@/interfaces/Egreso';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EgresoService } from '@services/egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egresos-crear',
  templateUrl: './egresos-crear.component.html',
  styleUrl: './egresos-crear.component.scss'
})
export class EgresosCrearComponent {
  egresoForm: FormGroup;
  message: string | undefined;
  error: string | undefined;

  constructor(
    private fb: FormBuilder,
    private egresoService: EgresoService,
    private router: Router
  ) {
    this.egresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1)]],
      metodo_pago: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  crearEgreso(): void {
    if (this.egresoForm.valid) {
      const nuevoEgreso: Egreso = this.egresoForm.value;
      this.egresoService.guardarEgreso(nuevoEgreso).subscribe(
        response => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Egreso creado correctamente',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.egresoForm.reset();
              this.router.navigate(['/egresos']);
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message || 'Error al crear el egreso',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en el servidor',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Por favor, complete todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
    }
  }


}
