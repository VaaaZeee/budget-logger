import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectHeaderMode = createSelector(
  (state: AppState) => state.headerMode,
  (headerMode: string) => headerMode
);
