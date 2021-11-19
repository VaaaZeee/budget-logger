import { createReducer, on } from '@ngrx/store';
import {
  decrementDateAction,
  incrementDateAction,
  setDateAction,
} from './date.actions';

const initialState = null;

export const dateReducer = createReducer(
  initialState,
  on(setDateAction, (state, { date }) => ({
    currentDate: date,
    selectedDate: date,
  })),
  on(incrementDateAction, (state) => {
    const increment = new Date(
      state.selectedDate.getFullYear(),
      state.selectedDate.getMonth() + 2,
      0
    );
    return { ...state, selectedDate: increment };
  }),
  on(decrementDateAction, (state) => {
    const decrement = new Date(
      state.selectedDate.getFullYear(),
      state.selectedDate.getMonth(),
      0
    );
    return { ...state, selectedDate: decrement };
  })
);
