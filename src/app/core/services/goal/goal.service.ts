import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Goal } from 'src/app/shared/models/goal.model';
import { DateState } from '../../state/app.state';
import { selectDate } from '../../state/date/date.selectors';
import { selectUserId } from '../../state/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private goals = new BehaviorSubject<Goal[]>([]);
  private displayedGoal = new BehaviorSubject<number>(null);
  private userId$: Observable<string>;
  private date$: Observable<DateState>;

  get goals$() {
    return this.goals.asObservable();
  }

  get displayedGoal$() {
    return this.displayedGoal.asObservable();
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.userId$ = this.store.pipe(select(selectUserId));
    this.date$ = this.store.pipe(select(selectDate));
  }

  addGoalToFireBase(goal: number): Promise<{ name: string }> {
    let newGoal: Goal;
    return combineLatest([this.userId$, this.date$])
      .pipe(
        take(1),
        switchMap(([userId, date]) => {
          const mounth = this.datePipe.transform(date.selectedDate, 'yyyy-MM');
          newGoal = new Goal(mounth, goal);
          return this.http.put<{ name: string }>(
            `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/goals/${mounth}.json`,
            {
              ...newGoal,
              mounth: null,
            }
          );
        }),
        tap(() => {
          this.displayedGoal.next(goal);
        })
      )
      .toPromise();
  }

  fetchGoalsFromFirebase(): Observable<Goal[]> {
    let dateState: DateState;
    return combineLatest([this.userId$, this.date$]).pipe(
      take(1),
      switchMap(([userId, date]) => {
        dateState = date;
        return this.http.get<{ [key: string]: { goal: number } }>(
          `https://budget-logger-a26a2-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/goals.json`
        );
      }),
      take(1),
      map((resData) => {
        const goals: Goal[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            goals.push(new Goal(key, resData[key].goal));
          }
        }
        const mounth = this.datePipe.transform(
          dateState.selectedDate,
          'yyyy-MM'
        );
        const goal = goals.find((g) => g.mounth === mounth);
        if (goal) {
          this.displayedGoal.next(goal.goal);
        } else {
          this.displayedGoal.next(-1);
        }
        this.goals.next(goals);
        return goals;
      })
    );
  }

  fetchGoal() {
    let mounth: string;
    return combineLatest([this.date$, this.goals$]).pipe(
      take(1),
      map(([date, goals]) => {
        mounth = this.datePipe.transform(date.selectedDate, 'yyyy-MM');
        return goals.find((goal) => goal.mounth === mounth);
      }),
      take(1),
      map((resData) => {
        if (resData) {
          this.displayedGoal.next(resData.goal);
        } else {
          this.displayedGoal.next(-1);
        }
      })
    );
  }
}
