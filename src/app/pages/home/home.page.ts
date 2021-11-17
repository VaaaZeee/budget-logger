import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/auth/category/category.service';
import { selectUserId } from 'src/app/core/state/user/user.selectors';

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
    this.categoryService.fetchCategories().pipe(take(1)).subscribe();
  }

  isLoadingEvent(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  switchToEdit() {
    this.menuCtrl.enable(this.isEditMode, 'main');
    this.isEditMode = !this.isEditMode;
  }
}
