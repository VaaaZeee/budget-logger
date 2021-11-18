import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { selectUserId } from '../../state/user/user.selectors';

interface TransactionData {
  categoryId: string;
  spent: number;
  date: Date;
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions = new BehaviorSubject<Transaction[]>([]);
  private userId$: Observable<string>;

  get transactions$() {
    return this.transactions.asObservable();
  }

  constructor(private http: HttpClient, private store: Store) {
    this.userId$ = this.store.pipe(select(selectUserId));
  }

  addTransactionToFireBase(newTransaction: Transaction): Promise<string> {
    let generatedId: string;
    return this.userId$
      .pipe(
        take(1),
        switchMap((userId) =>
          this.http.post<{ name: string }>(
            `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions.json`,
            { ...newTransaction, id: null }
          )
        ),
        switchMap((resData) => {
          generatedId = resData.name;
          return this.transactions$;
        }),
        take(1),
        map((transactions) => {
          newTransaction.id = generatedId;
          this.transactions.next(transactions.concat(newTransaction));
          return generatedId;
        })
      )
      .toPromise();
  }

  fetchTransactions(): Observable<Transaction[]> {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) =>
        this.http.get<{ [key: string]: Transaction }>(
          `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions.json`
        )
      ),
      take(1),
      map((resData) => {
        const transactions: Transaction[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            transactions.push(
              new Transaction(
                key,
                resData[key].categoryId,
                resData[key].spent,
                resData[key].date
              )
            );
          }
        }
        this.transactions.next(transactions);
        return transactions;
      })
    );
  }

  fetchTransactionById(id: string): Observable<Transaction> {
    return this.userId$.pipe(
      take(1),
      switchMap((userId) =>
        this.http.get<TransactionData>(
          `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions/${id}.json`
        )
      ),
      map(
        (transactionData) =>
          new Transaction(
            id,
            transactionData.categoryId,
            transactionData.spent,
            transactionData.date
          )
      )
    );
  }
}
