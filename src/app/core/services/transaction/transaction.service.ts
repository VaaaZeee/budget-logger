import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { compareDates } from 'src/app/shared/utils/date.utils';
import { selectSelectedDate } from '../../state/date/date.selectors';
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
  private listedTransactions = new BehaviorSubject<Transaction[]>([]);
  private userId$: Observable<string>;
  private date$: Observable<Date>;

  get listedTransactions$() {
    return this.listedTransactions.asObservable();
  }

  get transactions$() {
    return this.transactions.asObservable();
  }

  constructor(private http: HttpClient, private store: Store) {
    this.userId$ = this.store.pipe(select(selectUserId));
    this.date$ = this.store.pipe(select(selectSelectedDate));
  }

  addTransactionToFireBase(newTransaction: Transaction): Promise<string> {
    let generatedId: string;
    return this.userId$
      .pipe(
        take(1),
        switchMap((userId) =>
          this.http.post<{ name: string }>(
            `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions.json`,
            {
              ...newTransaction,
              id: null,
              date: newTransaction.date.toISOString(),
            }
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
          `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions.json`
        )
      ),
      take(1),
      map((resData) => {
        let transactions: Transaction[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            transactions.push(
              new Transaction(
                key,
                resData[key].categoryId,
                resData[key].spent,
                new Date(resData[key].date)
              )
            );
          }
        }
        transactions = transactions.sort((a: Transaction, b: Transaction) =>
          compareDates(a.date, b.date)
        );
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
          `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions/${id}.json`
        )
      ),
      map(
        (transactionData) =>
          new Transaction(
            id,
            transactionData.categoryId,
            transactionData.spent,
            new Date(transactionData.date)
          )
      )
    );
  }

  getTransactionsInSelectedMounth(): Observable<Transaction[]> {
    return combineLatest([this.date$, this.transactions$]).pipe(
      map(([lastDate, transactions]) => {
        return transactions.filter((transaction) => {
          const firstDate = new Date(
            lastDate.getFullYear(),
            lastDate.getMonth(),
            1
          );
          const transactionDate = new Date(transaction.date);
          return firstDate <= transactionDate && transactionDate <= lastDate;
        });
      }),
      tap((listedTransactions) => {
        this.listedTransactions.next(listedTransactions);
      })
    );
  }

  async deleteTransactionsRelatedToCategory(categoryId: string): Promise<void> {
    await this.transactions$
      .pipe(
        map(async (transactions) => {
          const deleteTransactions = transactions.filter(
            (transaction) => transaction.categoryId === categoryId
          );
          await Promise.all(
            deleteTransactions.map(async (transaction) => {
              await this.deleteTransaction(transaction.id);
            })
          );
        })
      )
      .toPromise();
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    this.userId$
      .pipe(
        take(1),
        switchMap((userId) =>
          this.http.delete(
            `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/transactions/${transactionId}.json`
          )
        ),
        switchMap(() => this.transactions$),
        take(1),
        tap((listedTransactions) => {
          const filteredTransactions = listedTransactions.filter(
            (tansaction) => tansaction.id !== transactionId
          );
          this.transactions.next(filteredTransactions);
        })
      )
      .toPromise();
  }
}
