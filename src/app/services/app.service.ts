import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {sleep} from '@/utils/helpers';

import {createUserWithEmailAndPassword} from '@firebase/auth';

import {GoogleAuthProvider} from 'firebase/auth';
import {firebaseAuth} from '@/firebase';
import { AuthService } from './auth.service';
import { User } from '@/interfaces/User';

const provider = new GoogleAuthProvider();

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user?: User | null = null;

    constructor(
        private router: Router,
        private toastr: ToastrService,
     private authService: AuthService
    ) {

    }





    loginWithEmail(email: string, password: string) {
      this.authService.loginWithEmail(email, password).subscribe({
        next: (result: any) => {
          // Maneja el resultado exitoso
          console.log(result);
          this.user = result.user;
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          // Maneja los errores
          this.toastr.error(error);
        }
      });
    }




    async logout() {
        await firebaseAuth.signOut();
        this.user = null;
        this.router.navigate(['/login']);
    }
}
