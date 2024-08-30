import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private appService: AppService,
        private authService: AuthService
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.getProfile();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.canActivate(next, state);
    }

    getProfile(): Observable<boolean> {
      return this.authService.getProfile().pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            this.authService.logout();
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(error => {
          this.authService.logout();
          this.router.navigate(['/login']);
          return of(false);
        })
      );

    }


}
