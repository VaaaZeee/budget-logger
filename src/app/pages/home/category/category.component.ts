import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/shared/models/category.model';
import { AddCostComponent } from '../add-cost/add-cost.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() category: Category;
  @Input() currency = 'Ft ';

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) {}

  openAddCostModal() {
    this.modalCtrl
      .create({
        component: AddCostComponent,
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
