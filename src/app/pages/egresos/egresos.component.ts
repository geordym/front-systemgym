import { Egreso } from '@/interfaces/Egreso';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EgresoService } from '@services/egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.scss'
})
export class EgresosComponent implements OnInit{



  egresos: Egreso[] = [];
  message: string | undefined;
  error: string | undefined;

  constructor(private egresoService: EgresoService, private router: Router) {}

  ngOnInit(): void {
    this.listarEgresos();
  }

  listarEgresos(): void {
    this.egresoService.listarEgresos().subscribe({
      next: (response) => {
        if (response.success) {
          this.egresos = response.egresos || [];
        } else {
          this.error = response.message;
        }
      },
      error: (err) => {
        console.error('Error al obtener egresos:', err);
        this.error = 'Hubo un problema al obtener la lista de egresos';
      }
    });
  }

  handleCreate() {
    this.router.navigate(['/egresos-crear']);
    }



    eliminarEgreso(id: number): void {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El egreso será eliminado. Si el egreso es de otro dia, no se podrá eliminar.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.egresoService.eliminarEgreso(id).subscribe(
            response => {
              if (response.success) {
                Swal.fire(
                  'Eliminado!',
                  'El egreso ha sido eliminado correctamente.',
                  'success'
                );
                // Aquí podrías actualizar la vista o realizar otra acción después de la eliminación.
                this.listarEgresos();
              } else {
                Swal.fire(
                  'Error!',
                  response.message || 'No se pudo eliminar el egreso.',
                  'error'
                );
              }
            },
            err => {
              Swal.fire(
                'Error!',
                'Hubo un problema en el servidor al eliminar el egreso.',
                'error'
              );
            }
          );
        }
      });
    }


}
