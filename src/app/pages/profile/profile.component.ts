import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    public activeTabSubject = new BehaviorSubject<string>('ACTIVITY');
    activeTab$ = this.activeTabSubject.asObservable();

    public user;
    constructor(private router: Router, private appService: AppService, private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
      this.imageForm = this.fb.group({
        image: [null, Validators.required],
      });
    }




    ngOnInit(): void {
        this.user = this.appService.user;
    }

    setActiveTab(tab: string) {
        this.activeTabSubject.next(tab);
    }

    toggle(tab: string) {
        this.setActiveTab(tab);
    }

    imageForm: FormGroup;
    selectedFile: File | null = null; // Para almacenar la imagen seleccionada


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
