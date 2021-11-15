import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/auth/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isEditMode = false;
  isLoading = false;
  constructor(
    public categoryService: CategoryService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.categoryService.fetchListedCategories().pipe(take(1)).subscribe();
  }

  isLoadingEvent(isLoading: boolean) {
    console.log('loading');
    this.isLoading = isLoading;
  }

  switchToEdit() {
    this.menuCtrl.enable(this.isEditMode, 'main');
    this.isEditMode = !this.isEditMode;
    console.log('edit');
  }
}
