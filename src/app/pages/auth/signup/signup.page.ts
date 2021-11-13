import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signUpForm: FormGroup;
  isMatchingPassword = false;

  constructor(private navCrl: NavController) {
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

  switchToLogin() {
    this.navCrl.navigateBack('login');
  }

  signUpWithEmailAndPassword() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      this.signUpForm.reset();
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
