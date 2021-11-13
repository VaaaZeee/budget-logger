import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private navCtrl: NavController) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  switchToSignUp() {
    this.navCtrl.navigateForward('signup');
  }

  loginWithEmailAndPassword() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.email, this.loginForm.value.password);

      this.loginForm.reset();
    }
  }
}
