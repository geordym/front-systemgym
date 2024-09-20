import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppService } from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const clientGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const appService = inject(AppService);

  // Función para obtener el perfil del usuario
  const getProfile = (): Observable<boolean | UrlTree> => {
        return authService.getProfile().pipe(
      map(user => {
        if (user ) {
            if(user.role == "CLIENTE"){
              return true;
            }else{
              return false;
            }

        } else {
         authService.logout();
          return router.createUrlTree(['/login-client']);
        }
      }),
      catchError(error => {
        authService.logout();
        return of(router.createUrlTree(['/login-client']));
      })
    );
  };

  // Retornamos el observable que verifica el perfil
  return getProfile();
};
