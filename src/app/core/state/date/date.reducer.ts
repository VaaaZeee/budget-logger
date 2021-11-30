import { createReducer, on } from '@ngrx/store';
import {
  decrementDateAction,
  incrementDateAction,
  setDateAction,
} from './date.actions';

const dat = new Date();
const initDate = new Date(dat.getFullYear(), dat.getMonth() + 1, 0);
initDate.setHours(23, 59, 59);
const initialState = { currentDate: initDate, selectedDate: initDate };

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
    increment.setHours(23, 59, 59);
    return { ...state, selectedDate: increment };
  }),
  on(decrementDateAction, (state) => {
    const decrement = new Date(
      state.selectedDate.getFullYear(),
      state.selectedDate.getMonth(),
      0
    );
    decrement.setHours(23, 59, 59);
    return { ...state, selectedDate: decrement };
  })
);
