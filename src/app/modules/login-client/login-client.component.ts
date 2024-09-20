import { Component, HostBinding, Renderer2 } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.scss'
})
export class LoginClientComponent {


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

        this.authService.loginWithEmailClient(
            this.loginForm.value.email,
            this.loginForm.value.password
        ).subscribe({
            next: (response) => {
              this.appService.setUserSession(response);
                this.isAuthLoading = false;
            },
            error: (error) => {
                this.isAuthLoading = false;
                this.toastr.error(error);
                console.error(error);
            }
        });
    } else {
        this.toastr.error('Form is not valid!');
    }
}




}
