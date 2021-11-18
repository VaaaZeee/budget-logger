import { createReducer, on } from '@ngrx/store';
import { resetModeAction, switchModeAction } from './header.actions';

const initialState = 'default';

export const headerReducer = createReducer(
  initialState,
  on(switchModeAction, (state, { mode }) => mode),
  on(resetModeAction, () => initialState)
);
