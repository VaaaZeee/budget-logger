import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IconListComponent } from 'src/app/shared/icon-list/icon-list.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  selectedIcon = 'basket';
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
        },
        'confirm',
        'add-category-modal'
      );
    }
  }

  openIconListModal() {
    this.modalCtrl
      .create({
        component: IconListComponent,
        cssClass: 'icon-list-modal',
        id: 'icon-list-modal',
        componentProps: { selectedIcon: this.selectedIcon },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resData) => {
        if (resData.role === 'confirm') {
          this.selectedIcon = resData.data.selectedIcon;
        }
      });
  }
}
