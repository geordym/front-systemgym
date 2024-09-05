import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { InscripcionComponent } from '@pages/inscripcion/inscripcion.component';
import { ClientesComponent } from '@pages/clientes/clientes.component';
import { MembresiasComponent } from '@pages/membresias/membresias.component';
import { SuscripcionComponent } from '@pages/suscripcion/suscripcion.component';
import { PagosComponent } from '@pages/pagos/pagos.component';
import { TarifasComponent } from '@pages/tarifas/tarifas.component';
import { MembresiasCrearComponent } from '@pages/membresias-crear/membresias-crear.component';
import { PagosPagarComponent } from '@pages/pagos-pagar/pagos-pagar.component';
import { EgresosComponent } from '@pages/egresos/egresos.component';
import { EgresosCrearComponent } from '@pages/egresos-crear/egresos-crear.component';
import { IngresoEgresoComponent } from '@pages/ingreso-egreso/ingreso-egreso.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'inscripcion',
                component: InscripcionComponent
            },
            {
                path: 'clientes',
                component: ClientesComponent
            },
            {
                path: 'membresias',
                component: MembresiasComponent
            },
            {
              path: 'membresias-crear',
              component: MembresiasCrearComponent
          },
            {
              path: 'suscripcion',
              component: SuscripcionComponent
          },
          {
            path: 'egresos',
            component: EgresosComponent
         },
          {
          path: 'egresos-crear',
          component: EgresosCrearComponent
           },
           {
            path: 'reportes/ingreso-egreso',
            component: IngresoEgresoComponent
             },
          {
            path: 'pagos',
            component: PagosComponent
        },
        {
          path: 'pagos-pagar',
          component: PagosPagarComponent
      },

        {
          path: 'tarifas',
          component: TarifasComponent
      },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
