import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/auth/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  isEditMode = false;
  constructor(
    public categoryService: CategoryService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  switchToEdit() {
    this.menuCtrl.enable(this.isEditMode, 'main');
    this.isEditMode = !this.isEditMode;
  }

  ionViewWillEnter() {
    this.categoryService.fetchCategories().pipe(take(1)).subscribe();
  }
}
