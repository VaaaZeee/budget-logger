import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
  NavController,
} from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLoading = false;
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
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
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
      this.loadingCtrl
        .create({
          keyboardClose: true,
          message: 'Bejelentkezés...',
        })
        .then((loadingEl) => {
          loadingEl.present();
          this.authService
            .loginWithEmailAndPassword(
              this.loginForm.value.email,
              this.loginForm.value.password
            )
            .pipe(
              take(1),
              switchMap(() =>
                this.userService.fetchUserByEmailFromFirebase(
                  this.loginForm.value.email
                )
              )
            )
            .subscribe(
              (user) => {
                this.userService.storeUserData(user).then(() => {
                  this.loginForm.reset();
                  loadingEl.dismiss();
                  this.router.navigateByUrl('/home/categories');
                });
              },
              (errRes) => {
                loadingEl.dismiss();
                const code = errRes.error.error.message;
                let message = 'Bejelentkezési hiba.';
                if (code === 'EMAIL_NOT_FOUND') {
                  message = 'Az E-mail cím nem található.';
                } else if (code === 'INVALID_PASSWORD') {
                  message = 'A megadott jelszó helytelen.';
                }
                this.showAlert(message);
              }
            );
        });
    }
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({ header: 'Autentikáció', message, buttons: ['Okay'] })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
