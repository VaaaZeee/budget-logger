import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/user.model';
import { setUserAction } from '../../state/user/user.actions';

interface CategoryResponseData {
  [key: string]: Category;
}

export interface UserResponseData {
  categories: CategoryResponseData[];
  email: string;
  userName: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private store: Store) {}

  addUserDataToFirebase(user: User): Promise<{ name: string }> {
    return this.http
      .post<{ name: string }>(
        'https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        { ...user, id: null }
      )
      .toPromise();
  }

  fetchUserByIdFromFirebase(id: string): Observable<User> {
    return this.http
      .get<UserResponseData>(
        `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
      )
      .pipe(map((user) => new User(id, user.email, user.userName)));
  }

  fetchUserByEmailFromFirebase(email: string): Observable<User> {
    return this.http
      .get<{ [key: string]: UserResponseData }>(
        `https://budget-loger-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`
      )
      .pipe(
        map((user) => {
          const key = Object.keys(user)[0];
          return new User(key, user[key].email, user[key].userName);
        })
      );
  }

  async storeUserData(user: User): Promise<void> {
    this.store.dispatch(setUserAction({ user }));
    const data = JSON.stringify({ userId: user.id });
    await Storage.set({ key: 'userData', value: data });
  }
}
