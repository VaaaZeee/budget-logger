import { User } from 'src/app/shared/models/user.model';

export interface DateState {
  selectedDate: Date;
  currentDate: Date;
}
export interface AppState {
  headerMode: string;
  user: User;
  date: DateState;
}
