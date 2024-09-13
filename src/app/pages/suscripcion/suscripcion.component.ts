import { Client } from '@/interfaces/client';
import { Membresia } from '@/interfaces/Membresia.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '@services/cliente.service';
import { MembresiasService } from '@services/membresias.service';
import { SuscripcionService } from '@services/suscripcion.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.scss'
})
export class SuscripcionComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
verSuscripciones() {
this.router.navigate(['suscripciones-listar']);
}



  suscripcionForm: FormGroup;
  message: string;
  error: string;

  public submitted = false;

  public membresias: Membresia[] = [];
  public clients: Client[] = [];

  tipoMembresia: string;

  public APIURL = environment.APIURL;

  constructor(private fb: FormBuilder, private membresiaService: MembresiasService,
    private clienteService: ClienteService,
    private suscripcionService: SuscripcionService,
    private router: Router
  ) {


  }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha de hoy en formato YYYY-MM-DD

    this.suscripcionForm = this.fb.group({
      membresia_id: ['', Validators.required],
      cliente_id: ['', Validators.required],
      precio: [{ value: '', disabled: true }, Validators.required],
      fecha_inicio:[{ value: today, disabled: true }, Validators.required],
    });


    this.membresiaService.listarMembresias().subscribe((data) => {
      this.membresias = data.membresias;
    });

    this.clienteService.listarClientes().subscribe((data) => {
      this.clients = data.clients;
    });

    // Listener para actualizar precio y tipo de membresía al seleccionar una membresía
    this.suscripcionForm.get('membresia_id')?.valueChanges.subscribe((selectedMembresiaId) => {
      console.log("Membresia cambiada por " + selectedMembresiaId);
      const selectedMembresia = this.membresias.find(m => m.id === parseInt(selectedMembresiaId));
      console.log(selectedMembresia);
      if (selectedMembresia) {
        console.log(selectedMembresia);
        this.suscripcionForm.patchValue({
          precio: selectedMembresia.precio
        });
        this.tipoMembresia = selectedMembresia.periodicidad;
      }
    });


  }



  getErrorMessage(controlName: string): string {
    const control = this.suscripcionForm.get(controlName);
    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    // Agrega más validaciones si es necesario
    return '';
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.suscripcionForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }


  // Obtener el label del campo para los mensajes de error
  getFieldLabel(controlName: string): string {
    const labels = {
      membresia_id: 'Membresía',
      cliente_id: 'Cliente',
      precio: 'Costo mensual',
      fecha_inicio: 'Fecha Inicio'
    };
    return labels[controlName] || controlName;
  }

  checkFormErrors(): void {
    let errorMessage = '';

    Object.keys(this.suscripcionForm.controls).forEach(key => {
      const control = this.suscripcionForm.get(key);

      if (control && control.invalid && (control.dirty || control.touched)) {
        if (control.errors) {
          if (control.errors.required) {
            errorMessage = `El campo ${this.getFieldLabel(key)} es obligatorio.`;
          }
          // Agregar otros tipos de validaciones si es necesario
        }
      }
    });

    if (errorMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  }


  handleSubmit(): void {
    this.submitted = true;





    if (this.suscripcionForm.valid) {
      const formData = this.suscripcionForm.value;
      this.suscripcionService.suscribirCliente(formData).subscribe(
        response => {
          if (response.success) {
            Swal.fire({
              title: 'Éxito',
              text: 'La suscripcion ha sido registrada satisfactoriamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Descargar factura',
              showCancelButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                // Acción para el botón "Aceptar"
                this.router.navigate(['/']);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Acción para el botón "Descargar factura"
                //const link = document.createElement('a');
               // link.href = `${this.APIURL}/api/facturas/${response.id_factura}`;
                //link.download = `Factura_${response.id_factura}.pdf`;
                window.open(`${this.APIURL}/api/facturas/public/${response.message}`);
                this.router.navigate(['/']);

              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message || 'Algo salió mal',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar la solicitud',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }else {
      this.checkFormErrors();
    }
  }

  handleCustomChange(event: any): void {
    // Lógica personalizada para manejar cambios
  }

  handleClick(): void {
    this.router.navigate(['/suscripciones-listar'])
  }



}
