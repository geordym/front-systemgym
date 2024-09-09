import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;


    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private authService: AuthService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    loginByAuth() {
      if (this.loginForm.valid) {
          this.isAuthLoading = true;

          this.authService.loginWithEmail(
              this.loginForm.value.email,
              this.loginForm.value.password
          ).subscribe({
              next: (response) => {
                this.appService.setUserSession(response);
//                  alert("response");
                  this.isAuthLoading = false;
                  // Ejemplo: redireccionar o mostrar mensaje de éxito
              },
              error: (error) => {
                  this.isAuthLoading = false;
                  this.toastr.error('Login failed. Please check your credentials.');
                  console.error(error);
              }
          });
      } else {
          this.toastr.error('Form is not valid!');
      }
  }




    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
