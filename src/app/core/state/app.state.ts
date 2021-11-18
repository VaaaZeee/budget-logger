import { User } from 'src/app/shared/models/user.model';

export interface AppState {
  headerMode: string;
  user: User;
}
