import { createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import { AppState } from '../app.state';

export const selectUser = createSelector(
  (state: AppState) => state.user,
  (user: User) => user
);
export const selectUserId = createSelector(selectUser, (user) => user.id);
