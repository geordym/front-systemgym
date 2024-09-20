import { User } from '@/interfaces/User';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '@services/app.service';
import { AuthService } from '@services/auth.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user: User;

    constructor(private appService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.user = this.appService.user;
    }

    logout() {
        this.appService.logout();
        window.location.reload();
      }

    formatDate(date) {
        return DateTime.fromRFC2822(date).toFormat('dd LLL yyyy');
    }
}
