import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(): Observable<boolean> {
    return from(Storage.get({ key: 'userData' })).pipe(
      map((userData) => {
        if (!userData || !userData.value) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
