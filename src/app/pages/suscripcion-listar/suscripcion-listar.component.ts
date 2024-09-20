import { Suscripcion } from '@/interfaces/Suscripcion';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuscripcionService } from '@services/suscripcion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscripcion-listar',
  templateUrl: './suscripcion-listar.component.html',
  styleUrl: './suscripcion-listar.component.scss'
})
export class SuscripcionListarComponent {


  public error:any;
  public message:any;
  public suscripciones:Suscripcion[] = [];

  constructor(private suscripcionService: SuscripcionService, private router: Router){}


  ngOnInit(): void {
    this.getSuscripciones();
  }

  getSuscripciones(): void {
    this.suscripcionService.listarSuscripciones().subscribe({
      next: (response) => {
        if (response.success) {
          this.suscripciones = response.suscripciones || [];
          this.message = response.message || '';
        } else {
          this.error = response.message || 'Error desconocido';
        }
      },
      error: (err) => {
        this.error = 'Error al cargar las suscripciones';
        console.error(err);
      }
    });
  }

  handleClick(): void {
    this.router.navigate(['/membresias/crear']);
  }



  desactivarSuscripcion(id: string) {
    Swal.fire({
      title: '¿Está seguro que desea desactivar esta suscripción?',
      text: 'No se generarán más facturas y tendrá que volver a suscribirlo en caso de querer retomar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.suscripcionService.desactivarSuscripcion(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.message = response.message || '';
              this.getSuscripciones(); // Actualizar la lista de suscripciones
              Swal.fire(
                '¡Desactivada!',
                'La suscripción ha sido desactivada correctamente.',
                'success'
              );
            } else {
              this.error = response.message || 'Error desconocido';
            }
          },
          error: (err) => {
            this.error = 'Error al desactivar la suscripción';
            console.error(err);
            Swal.fire(
              'Error',
              'Hubo un problema al desactivar la suscripción.',
              'error'
            );
          }
        });
      }
    });
  }


}
