import { createAction, props } from '@ngrx/store';

export const setDateAction = createAction(
  '[Home Component] Set Date',
  props<{ date: Date }>()
);

export const incrementDateAction = createAction('[Toolbar] Increment Date');

export const decrementDateAction = createAction('[Toolbar] Decrement Date');
