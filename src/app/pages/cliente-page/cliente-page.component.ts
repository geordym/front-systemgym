import { Pago } from '@/interfaces/Pago.interface';
import { Suscripcion } from '@/interfaces-client/Suscripcion';
import { Component, OnInit } from '@angular/core';
import { PagosYSuscripcion } from '../../interfaces-client/PagosYSuscripcion';
import { ClientmoduleService } from '@services/clientmodule.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { User } from '@/interfaces/User';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.scss'
})
export class ClientePageComponent implements OnInit{

  pagosys: PagosYSuscripcion;
  message: string;
  error: string;
  public user: User;


  imageForm: FormGroup;
  selectedFile: File | null = null; // Para almacenar la imagen seleccionada


  constructor(private clientService: ClientmoduleService,
    private router: Router,
    private appService: AppService,
    private fb: FormBuilder,
    private userService: UserService, private authService: AuthService) {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    });
  }


  ngOnInit(): void {
    this.user = this.authService.user;

    console.log(this.user);

    this.clientService.listarPagosYSuscripciones().subscribe({
      next: (data) => {
        if (data.success) {
          this.pagosys = data.pagosysuscripcion ;
          console.log(data);
          this.message = data.message || null;
        } else {
          this.error = data.message || 'Error loading data';
        }
      },
      error: (err) => {
        this.error = err.message || 'Error loading data';
      }
    });



  }



  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Almacenar la imagen seleccionada
      this.imageForm.patchValue({
        image: file,
      });
    }
  }
  onSubmit() {
    console.log("Submited");
    alert("Submiting");
    if (this.imageForm.valid && this.selectedFile) {
      const user = this.authService.user;
      const userId = user.uid;

      this.userService.actualizarImagenUsuario(userId, this.selectedFile).subscribe({
        next: (response) => {
          if (response.success) {
            // SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Imagen actualizada exitosamente',
              text: 'Para poder visualizarla debes cerrar la sesión y volver a ingresar.',
              confirmButtonText: 'Entendido'
            }).then(() => {
              // Redirigir a /dashboard después de que el usuario cierre el SweetAlert
              this.router.navigate(['/dashboard']);
            });
          }
        },
        error: (err) => {
          // SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la imagen',
            text: 'Hubo un problema al actualizar la imagen. Por favor, inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir a /dashboard después de que el usuario cierre el SweetAlert
            this.router.navigate(['/dashboard']);
          });

          console.error('Error al actualizar la imagen:', err);
        }
      });
    }
  }



  }




