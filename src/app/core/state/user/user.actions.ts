import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const setUserAction = createAction(
  '[Auth API] Set User',
  props<{ user: User }>()
);

export const resetUserAction = createAction('[Auth API] Reset User');
