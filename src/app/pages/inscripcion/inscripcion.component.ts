import { Inscripcion, InscripcionResponse } from '@/interfaces/Inscripcion';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InscripcionService } from '@services/inscripcion.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.scss'
})
export class InscripcionComponent {

  inscripcionForm: FormGroup;

  message: string;
  error: string;

  private APIURL = environment.APIURL;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.inscripcionForm = this.fb.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      primer_apellido: ['', Validators.required],
      segundo_apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion_residencia: ['', Validators.required],
      telefono_personal: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      telefono_contacto_emergencia: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      lesiones: ['', Validators.required],
      enfermedades: ['', Validators.required],
      informacion_medica_relevante: ['', Validators.required],
      tipo_sangre: ['', Validators.required],
      politicas: [false, Validators.requiredTrue],
      consentimiento: [false, Validators.requiredTrue]
    });
  }


  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      const inscripcion: Inscripcion = this.inscripcionForm.value;
      this.inscripcionService.inscribirCliente(inscripcion).subscribe({
        next: (response: InscripcionResponse) => {
          if (response.success) {
            const idFactura = response.id_factura;
            Swal.fire({
              title: 'Éxito',
              text: 'El cliente ha sido registrado satisfactoriamente.',
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
                window.open(`${this.APIURL}/api/facturas/public/${response.id_factura}`);
                this.router.navigate(['/']);

              }
            });
          }
        },
        error: err => {

          console.log(err.message);


          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: err.message, // Mostrar el mensaje de error
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa el formulario correctamente.'
      });
    }
  }



  showAlert(): void {
    Swal.fire({
      title: '¡Éxito!',
      text: 'El cliente ha sido registrado satisfactoriamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: message,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

}
