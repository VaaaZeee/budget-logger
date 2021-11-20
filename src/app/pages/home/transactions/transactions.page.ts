import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { DateState } from 'src/app/core/state/app.state';
import {
  decrementDateAction,
  incrementDateAction,
} from 'src/app/core/state/date/date.actions';
import { selectDate } from 'src/app/core/state/date/date.selectors';
import { Category } from 'src/app/shared/models/category.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { isEqualDates } from 'src/app/shared/utils/date.utils';

interface Data {
  transaction: Transaction;
  category: Category;
  isFirstOfTheDay: boolean;
}

interface DisplayedData {
  date: DateState;
  data: Data[];
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage {
  displayedData$: Observable<DisplayedData>;
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private store: Store,
    private menuCtrl: MenuController
  ) {
    this.displayedData$ = combineLatest([
      this.store.pipe(select(selectDate)),
      this.transactionService.listedTransactions$,
      this.categoryService.listedCategories$,
    ]).pipe(
      map(([date, transactions, categories]) => {
        const data: Data[] = [];
        let prevDate = null;
        transactions.forEach((transaction) => {
          let isFirstOfTheDay = false;
          const category = categories.find(
            (cat) => cat.id === transaction.categoryId
          );
          if (!isEqualDates(prevDate, transaction.date)) {
            isFirstOfTheDay = true;
            prevDate = transaction.date;
            data.push({ transaction, category, isFirstOfTheDay });
          } else {
            data.push({ transaction, category, isFirstOfTheDay });
          }
        });
        return { date, data };
      }),
      filter((res) => !!res.date && !!res.data)
    );
  }

  spentOnDay(day: Date): Observable<number> {
    let res = 0;
    return this.transactionService.listedTransactions$.pipe(
      take(1),
      map((transactions) => {
        transactions.forEach((transaction) => {
          if (isEqualDates(transaction.date, day)) {
            res += transaction.spent;
          }
        });
        return res;
      })
    );
  }

  ionViewWillEnter() {
    this.transactionService
      .getTransactionsInSelectedMounth()
      .pipe(take(1))
      .subscribe();
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
