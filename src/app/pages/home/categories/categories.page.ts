import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { GoalService } from 'src/app/core/services/goal/goal.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
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
import { Category } from 'src/app/shared/models/category.model';
import { SetMounthlyGoalComponent } from './set-mounthly-goal/set-mounthly-goal.component';

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
    private store: Store,
    private modalCtrl: ModalController,
    public goalService: GoalService
  ) {
    this.date$ = this.store.pipe(select(selectDate));
  }

  ionViewWillEnter() {
    this.goalService.fetchGoal().pipe(take(1)).subscribe();
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

  getPercentage(categories: Category[], goal: number) {
    let sum = 0;
    categories.forEach((category) => {
      sum += category.spent;
    });

    return Math.round((sum / goal) * 100);
  }

  openSetGoalMoadl() {
    this.modalCtrl
      .create({
        component: SetMounthlyGoalComponent,
        cssClass: 'set-goal-modal',
        id: 'set-goal-modal',
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(async (resData) => {
        if (resData.role === 'confirm' && (resData.data || resData.data.goal)) {
          await this.goalService.addGoalToFireBase(resData.data.goal);
        }
      });
  }
}
