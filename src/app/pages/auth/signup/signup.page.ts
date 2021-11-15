import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signUpForm: FormGroup;
  isMatchingPassword = false;

  constructor(
    private navCrl: NavController,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.signUpForm = new FormGroup(
      {
        userName: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required],
        }),
        email: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      { validators: this.checkPassword }
    );
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  switchToLogin() {
    this.navCrl.navigateBack('login');
  }

  //TODO set username
  signUpWithEmailAndPassword() {
    if (this.signUpForm.valid) {
      this.authService
        .signUpWithEmailAndPassword(
          this.signUpForm.value.email,
          this.signUpForm.value.password
        )
        .pipe(take(1))
        .subscribe((user) => {
          user.userName = this.signUpForm.value.userName;
          this.userService.addUserDataToFirebase(user).then(() => {
            this.userService.storeUserData(user).then(() => {
              this.signUpForm.reset();
              this.router.navigateByUrl('/home');
            });
          });
        });
    }
  }

  private checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null;
    } else {
      group.get('confirmPassword').setErrors({ incorrect: true });
      return { notSame: true };
    }
  };
}
