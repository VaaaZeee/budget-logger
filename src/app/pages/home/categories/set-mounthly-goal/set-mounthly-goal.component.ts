import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-mounthly-goal',
  templateUrl: './set-mounthly-goal.component.html',
  styleUrls: ['./set-mounthly-goal.component.scss'],
})
export class SetMounthlyGoalComponent {
  setGoalForm = new FormGroup({
    goal: new FormControl(null, {
      updateOn: 'change',
      validators: [
        Validators.required,
        Validators.maxLength(32),
        Validators.min(0),
      ],
    }),
  });

  constructor(private modalCtrl: ModalController) {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'set-goal-modal');
  }

  setGoal() {
    if (this.setGoalForm.valid) {
      this.modalCtrl.dismiss(
        {
          goal: this.setGoalForm.value.goal,
        },
        'confirm',
        'set-goal-modal'
      );
    }
  }
}
