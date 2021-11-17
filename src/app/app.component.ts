import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from './core/services/auth/auth.service';
import { CategoryService } from './core/services/auth/category/category.service';
import { UserService } from './core/services/auth/user.service';
import { Category } from './shared/models/category.model';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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

  ngOnInit(): void {}

  logOut() {
    this.authService.logout().then(() => this.router.navigateByUrl('/login'));
  }
}
