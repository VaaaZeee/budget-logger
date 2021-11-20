import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { GoalService } from 'src/app/core/services/goal/goal.service';
import { setDateAction } from 'src/app/core/state/date/date.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private store: Store, private goalService: GoalService) {}

  ionViewDidEnter() {
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    this.store.dispatch(setDateAction({ date }));
  }
}
