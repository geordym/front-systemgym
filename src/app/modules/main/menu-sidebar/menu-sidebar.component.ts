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
        name: 'Blank',
        iconClasses: 'fas fa-file',
        path: ['/blank']
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
  name: 'Tarifas',
  iconClasses: 'fas fa-file',
  path: ['/tarifas']
},


    {
        name: 'Main Menu',
        iconClasses: 'fas fa-folder',
        children: [
            {
                name: 'Sub Menu',
                iconClasses: 'far fa-address-book',
                path: ['/sub-menu-1']
            },
            {
                name: 'Blank',
                iconClasses: 'fas fa-file',
                path: ['/sub-menu-2']
            }
        ]
    }
];
