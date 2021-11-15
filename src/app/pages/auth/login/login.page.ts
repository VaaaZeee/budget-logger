import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private menuCtrl: MenuController
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  switchToSignUp() {
    this.navCtrl.navigateForward('signup');
  }

  loginWithEmailAndPassword() {
    if (this.loginForm.valid) {
      this.authService
        .loginWithEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .pipe(
          take(1),
          switchMap((resData) =>
            this.userService.fetchUserByIdFromFirevase(resData.id)
          )
        )
        .subscribe((user) => {
          this.userService.storeUserData(user).then(() => {
            this.loginForm.reset();
            this.router.navigateByUrl('/home');
          });
        });
    }
  }
}
