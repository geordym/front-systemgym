import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {CommonModule, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {SidebarSearchComponent} from './components/sidebar-search/sidebar-search.component';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import {environment} from 'environments/environment';
import {ActivityTabComponent} from './pages/profile/activity-tab/activity-tab.component';
import {TimelineTabComponent} from './pages/profile/timeline-tab/timeline-tab.component';
import {SettingsTabComponent} from './pages/profile/settings-tab/settings-tab.component';
import {PostComponent} from './pages/profile/post/post.component';
import {InfoBoxComponent} from './components/info-box/info-box.component';
import {SmallBoxComponent} from './components/small-box/small-box.component';
import {ContentHeaderComponent} from './components/content-header/content-header.component';
import {LoadingComponent} from './components/loading/loading.component';
import {OverlayLoadingComponent} from './components/overlay-loading/overlay-loading.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { InscripcionComponent } from './pages/inscripcion/inscripcion.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { MembresiasComponent } from './pages/membresias/membresias.component';
import { SuscripcionComponent } from './pages/suscripcion/suscripcion.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
import { MembresiasCrearComponent } from './pages/membresias-crear/membresias-crear.component';
import { PagosPagarComponent } from './pages/pagos-pagar/pagos-pagar.component';
import { EgresosComponent } from './pages/egresos/egresos.component';
import { EgresosCrearComponent } from './pages/egresos-crear/egresos-crear.component';
import { IngresoEgresoComponent } from './pages/ingreso-egreso/ingreso-egreso.component';
import { SuscripcionListarComponent } from './pages/suscripcion-listar/suscripcion-listar.component';
import { MembresiasEditarComponent } from './pages/membresias-editar/membresias-editar.component';
import { LoginClientComponent } from './modules/login-client/login-client.component';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { ReporteingresoComponent } from './pages/reporteingreso/reporteingreso.component';
import { ReporteSuscripcionesComponent } from './pages/reporte-suscripciones/reporte-suscripciones.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        SidebarSearchComponent,
        ActivityTabComponent,
        TimelineTabComponent,
        SettingsTabComponent,
        PostComponent,
        InfoBoxComponent,
        SmallBoxComponent,
        ContentHeaderComponent,
        LoadingComponent,
        OverlayLoadingComponent,
        InscripcionComponent,
        ClientesComponent,
        MembresiasComponent,
        SuscripcionComponent,
        PagosComponent,
        TarifasComponent,
        MembresiasCrearComponent,
        PagosPagarComponent,
        EgresosComponent,
        EgresosCrearComponent,
        IngresoEgresoComponent,
        SuscripcionListarComponent,
        MembresiasEditarComponent,
        LoginClientComponent,
        ClientePageComponent,
        ReporteingresoComponent,
        ReporteSuscripcionesComponent
    ],
    bootstrap: [AppComponent],
    imports: [
      NgxChartsModule,
      HttpClientModule,
        ProfabricComponentsModule,
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.GA_ID),
        FontAwesomeModule
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule {}
