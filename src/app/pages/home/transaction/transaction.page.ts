import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage {
  constructor(public transactionService: TransactionService) {}

  ionViewWillEnter() {
    this.transactionService.fetchTransactions().pipe(take(1)).subscribe();
  }
}
