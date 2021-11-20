import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './core/services/auth/auth.service';
import { UserService } from './core/services/auth/user.service';
import { setDateAction } from './core/state/date/date.actions';
import { selectUser } from './core/state/user/user.selectors';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store
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
    this.user$ = this.store.pipe(select(selectUser));
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logout().then(() => this.router.navigateByUrl('/login'));
  }
}
