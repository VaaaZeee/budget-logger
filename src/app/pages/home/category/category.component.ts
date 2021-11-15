import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/auth/category/category.service';
import { Category, GridSlot } from 'src/app/shared/models/category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddCostComponent } from '../add-cost/add-cost.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: Category;
  @Input() slot: GridSlot;
  @Input() currency = 'Ft ';
  @Output() isLoading = new EventEmitter<boolean>();

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) {}

  openAddCategoryModal() {
    this.modalCtrl
      .create({
        component: AddCategoryComponent,
        cssClass: 'add-category-modal',
        id: 'add-category-modal',
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(async (resData) => {
        if (resData.role === 'confirm') {
          this.isLoading.emit(true);
          const newCategory = new Category(
            'new',
            resData.data.categoryName,
            0,
            resData.data.iconName,
            this.slot
          );
          await this.categoryService
            .addCategoryToFireBase(newCategory)
            .then((id) => {
              newCategory.id = id;
              this.categoryService
                .storeCategory(newCategory)
                .pipe(take(1))
                .subscribe(() => {
                  this.isLoading.emit(false);
                });
            });
        }
      });
  }

  openAddCostModal() {
    this.modalCtrl
      .create({
        component: AddCostComponent,
        cssClass: 'add-cost-modal',
        id: 'add-cost-modal',
        componentProps: { category: this.category, currency: this.currency },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resData) => {
        if (
          resData.role === 'confirm' &&
          (resData.data || resData.data.newCost)
        ) {
          this.categoryService.updateCategoryCost(
            this.category.id,
            resData.data.newCost
          );
        }
      });
  }
}
