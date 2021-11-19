import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { DateState } from 'src/app/core/state/app.state';
import {
  decrementDateAction,
  incrementDateAction,
} from 'src/app/core/state/date/date.actions';
import { selectDate } from 'src/app/core/state/date/date.selectors';
import {
  resetModeAction,
  switchModeAction,
} from 'src/app/core/state/header/header.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  date$: Observable<DateState>;
  isEditMode: boolean;

  constructor(
    public categoryService: CategoryService,
    private menuCtrl: MenuController,
    private store: Store
  ) {
    this.date$ = this.store.pipe(select(selectDate));
  }

  ionViewWillEnter() {
    this.categoryService.fetchListedCategories().pipe(take(1)).subscribe();
  }

  ngOnInit() {}

  switchToEdit() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.store.dispatch(switchModeAction({ mode: 'edit' }));
    } else {
      this.store.dispatch(resetModeAction());
    }
  }

  onOpenMenu() {
    this.menuCtrl.toggle('main');
  }

  nextMounth() {
    this.store.dispatch(incrementDateAction());
  }

  previousMounth() {
    this.store.dispatch(decrementDateAction());
  }
}
