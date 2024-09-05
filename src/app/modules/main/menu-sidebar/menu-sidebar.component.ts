import { User } from '@/interfaces/User';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';

import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user?: User;
    public menu = MENU;

    constructor(
        public appService: AuthService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {

        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
      name: 'Inscripcion',
      iconClasses: 'fas fa-file',
      path: ['/inscripcion']
  },
  {
    name: 'Clientes',
    iconClasses: 'fas fa-file',
    path: ['/clientes']
},
{
  name: 'Membresias',
  iconClasses: 'fas fa-file',
  path: ['/membresias']
},
{
  name: 'Suscripcion',
  iconClasses: 'fas fa-file',
  path: ['/suscripcion']
},
{
  name: 'Pagos',
  iconClasses: 'fas fa-file',
  path: ['/pagos']
},
{
  name: 'Egresos',
  iconClasses: 'fas fa-file',
  path: ['/egresos']
},
{
  name: 'Tarifas',
  iconClasses: 'fas fa-file',
  path: ['/tarifas']
},


    {
        name: 'Reportes',
        iconClasses: 'fas fa-folder',
        children: [
            {
                name: 'Ingreso/Egreso',
                iconClasses: 'far fa-address-book',
                path: ['/reportes/ingreso-egreso']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    }
];
