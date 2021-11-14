import { createReducer, on, State } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import { resetUserAction, setUserAction } from './user.actions';

const initialState: User = null;

export const userReducer = createReducer(
  initialState,
  on(setUserAction, (state, { user }) => user),
  on(resetUserAction, (state) => ({ ...state, user: null }))
);
