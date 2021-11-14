import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.authService
      .autoLogin()
      .pipe(take(1))
      .subscribe(
        (user) => {
          if (user instanceof User) {
            this.userService.storeUserData(user);
          }
        },
        () => {
          this.authService.logout();
        }
      );
  }

  logOut() {
    this.authService.logout().then(() => this.router.navigateByUrl('/login'));
  }
}
