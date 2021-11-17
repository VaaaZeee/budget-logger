import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IconListComponent } from 'src/app/shared/icon-list/icon-list.component';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  @Input() category: Category;
  selectedIcon: string;

  editCategoryForm = new FormGroup({
    categoryName: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.maxLength(32)],
    }),
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.editCategoryForm.setValue({ categoryName: this.category.name });
    this.selectedIcon = this.category.iconName;
  }

  update() {
    if (this.editCategoryForm.valid) {
      let isChange = false;
      if (this.editCategoryForm.value.categoryName !== this.category.name) {
        this.category.name = this.editCategoryForm.value.categoryName;
        isChange = true;
      }
      if (this.selectedIcon !== this.category.iconName) {
        this.category.iconName = this.selectedIcon;
        isChange = true;
      }
      if (isChange) {
        this.modalCtrl.dismiss(
          { updatedCategory: this.category },
          'confirm',
          'update-category-modal'
        );
      } else {
        this.cancel();
      }
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'update-category-modal');
  }

  deleteCategory() {
    this.modalCtrl.dismiss(null, 'delete', 'update-category-modal');
  }

  openIconListModal() {
    this.modalCtrl
      .create({
        component: IconListComponent,
        cssClass: 'icon-list-modal',
        id: 'icon-list-modal',
        componentProps: { selectedIcon: this.category.iconName },
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
