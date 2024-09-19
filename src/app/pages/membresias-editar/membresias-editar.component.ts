import { Component, Input, OnInit } from '@angular/core';
import { Membresia } from '../../interfaces/Membresia.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembresiasService } from '@services/membresias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-membresias-editar',
  templateUrl: './membresias-editar.component.html',
  styleUrl: './membresias-editar.component.scss'
})
export class MembresiasEditarComponent implements OnInit{
  editMembresiaForm: FormGroup;
  selectedMembresia: any;

  public membresiaId!: number;

  public membresia: Membresia;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
    private membresiaService: MembresiasService) {
    this.route.params.subscribe(params => {
      this.membresiaId = params['id'];  // Captura el parámetro de la ruta
      console.log(this.membresiaId);
    });

    this.editMembresiaForm = this.fb.group({
      id: [{ value: ''}],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      periodicidad: ['', [Validators.required]],
      accesos: ['', [Validators.required]]
    });

  }

  cargarMembresia() {
    this.membresiaService.obtenerMembresiaPorId(this.membresiaId).subscribe({
      next: (response) => {
        if (response.success && response.membresia) {
          this.editMembresiaForm.patchValue({
            id: response.membresia.id,
            nombre: response.membresia.nombre,
            precio: response.membresia.precio,
            periodicidad: response.membresia.periodicidad,
            accesos: response.membresia.accesos
          });
          console.log(response.membresia);
        } else {
          alert("Error");
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
this.cargarMembresia()

}


onSubmit() {
  if (this.editMembresiaForm.valid) {
    const updatedMembresia = this.editMembresiaForm.value;
    this.membresiaService.actualizarMembresia(updatedMembresia).subscribe({
      next: (response) => {
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          title: 'Éxito!',
          text: 'La membresía se actualizó correctamente.',
          icon: 'success',
          confirmButtonText: 'Ir a Listado de Membresías',
          // Añade una acción al hacer clic en el botón
          preConfirm: () => {
            this.router.navigate(['/membresias']);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

}
