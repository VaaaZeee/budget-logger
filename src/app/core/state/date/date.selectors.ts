import { createSelector } from '@ngrx/store';
import { AppState, DateState } from '../app.state';

export const selectDate = createSelector(
  (state: AppState) => state.date,
  (date: DateState) => date
);

export const selectSelectedDate = createSelector(
  selectDate,
  (state) => state.selectedDate
);

export const selectCurrentDate = createSelector(
  selectDate,
  (state) => state.currentDate
);
