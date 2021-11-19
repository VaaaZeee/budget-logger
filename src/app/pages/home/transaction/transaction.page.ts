import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { DateState } from 'src/app/core/state/app.state';
import {
  decrementDateAction,
  incrementDateAction,
} from 'src/app/core/state/date/date.actions';
import { selectDate } from 'src/app/core/state/date/date.selectors';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage {
  date$: Observable<DateState>;
  constructor(
    public transactionService: TransactionService,
    private store: Store,
    private menuCtrl: MenuController
  ) {
    this.date$ = this.store.pipe(select(selectDate));
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
