import { Membresia } from '@/interfaces/Membresia.interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MembresiasService } from '@services/membresias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresias-crear',
  templateUrl: './membresias-crear.component.html',
  styleUrl: './membresias-crear.component.scss'
})
export class MembresiasCrearComponent {


  membresiaForm: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private membresiasService: MembresiasService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.membresiaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      periodicidad: ['', Validators.required],
      accesos: ['', Validators.required]
    });
  }

  public handleSubmit() {
    if (this.membresiaForm.valid) {
      const formData: Membresia = this.membresiaForm.value;
      this.membresiasService.crearMembresia(formData).subscribe(
        response => {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Membresía creada correctamente'
            }).then(() => {
              this.membresiaForm.reset();
              this.modalService.dismissAll(); // Cierra el modal
              this.router.navigate(['/membresias']); // Redirige a la ruta de membresías
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message || 'Error al crear la membresía'
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear la membresía'
          });
        }
      );
    }
  }

  handleClick() {
    this.router.navigate(['/membresias']); // Redirige a la ruta de membresías
  }

}
