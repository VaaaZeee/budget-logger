import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Storage } from '@capacitor/storage';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from './user.service';
import { resetUserAction } from '../state/user/user.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private userService: UserService
  ) {}

  autoLogin() {
    return from(Storage.get({ key: 'userData' })).pipe(
      switchMap((userData) => {
        if (!userData || !userData.value) {
          throw new Error('No user found!');
        }
        const parsedUserData = JSON.parse(userData.value) as { userId: string };
        return this.userService.fetchUserByIdFromFirevase(
          parsedUserData.userId
        );
      })
    );
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(map((resData) => new User(resData.localId, resData.email)));
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(map((resData) => new User(resData.localId, resData.email)));
  }

  async logout(): Promise<void> {
    this.store.dispatch(resetUserAction());
    await Storage.remove({ key: 'userData' });
  }
}
