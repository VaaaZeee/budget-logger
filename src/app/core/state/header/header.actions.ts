import { createAction, props } from '@ngrx/store';

export const switchModeAction = createAction(
  '[Home Component] Switch Mode',
  props<{ mode: string }>()
);

export const resetModeAction = createAction('[Home Component] Reset Mode');
