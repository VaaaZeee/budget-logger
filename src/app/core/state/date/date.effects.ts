import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, take } from 'rxjs/operators';
import { CategoryService } from '../../services/category/category.service';
import { GoalService } from '../../services/goal/goal.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import {
  decrementDateAction,
  incrementDateAction,
  setDateAction,
} from './date.actions';

@Injectable()
export class DateEffects {
  setDate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setDateAction),
        mergeMap(() => this.categoryService.fetchCategories()),
        mergeMap(() => this.transactionService.fetchTransactions()),
        mergeMap(() =>
          this.transactionService.getTransactionsInSelectedMounth()
        ),
        mergeMap(() => this.categoryService.fetchListedCategories()),
        mergeMap(() => this.goalService.fetchGoalsFromFirebase())
      ),
    { dispatch: false }
  );

  decrementDate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(decrementDateAction),
        map(() => {
          this.transactionService
            .getTransactionsInSelectedMounth()
            .pipe(take(1))
            .subscribe();
          this.categoryService
            .fetchListedCategories()
            .pipe(take(1))
            .subscribe();
          this.goalService.fetchGoal().pipe(take(1)).subscribe();
        })
      ),
    { dispatch: false }
  );

  incrementDate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(incrementDateAction),
        map(() => {
          this.transactionService
            .getTransactionsInSelectedMounth()
            .pipe(take(1))
            .subscribe();
          this.categoryService
            .fetchListedCategories()
            .pipe(take(1))
            .subscribe();
          this.goalService.fetchGoal().pipe(take(1)).subscribe();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private goalService: GoalService
  ) {}
}
