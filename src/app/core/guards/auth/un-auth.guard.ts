import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return from(Storage.get({ key: 'userData' })).pipe(
      map((userData) => {
        if (!userData || !userData.value) {
          return true;
        } else {
          this.router.navigateByUrl('/home/categories');
          return false;
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return from(Storage.get({ key: 'userData' })).pipe(
      map((userData) => {
        if (!userData || !userData.value) {
          return true;
        } else {
          this.router.navigateByUrl('/home/categories');
          return false;
        }
      })
    );
  }
}
