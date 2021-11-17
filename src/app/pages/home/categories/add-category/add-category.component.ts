import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IconCreateorComponent } from 'src/app/shared/icon-createor/icon-createor.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  selectedIcon = 'basket';
  selectedColor = '#3ae96f';
  newCategoryForm = new FormGroup({
    categoryName: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required, Validators.maxLength(32)],
    }),
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'add-category-modal');
  }

  createNewGroup() {
    if (this.newCategoryForm.valid && !!this.selectedIcon) {
      this.modalCtrl.dismiss(
        {
          categoryName: this.newCategoryForm.value.categoryName,
          iconName: this.selectedIcon,
          color: this.selectedColor,
        },
        'confirm',
        'add-category-modal'
      );
    }
  }

  openIconListModal() {
    this.modalCtrl
      .create({
        component: IconCreateorComponent,
        cssClass: 'icon-creator-modal',
        id: 'icon-creator-modal',
        componentProps: {
          selectedIcon: this.selectedIcon,
          color: this.selectedColor,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === 'confirm') {
          this.selectedIcon = resData.data.selectedIcon;
          this.selectedColor = resData.data.selectedColor;
        }
      });
  }
}
