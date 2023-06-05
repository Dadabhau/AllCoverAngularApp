import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<any> | Promise<any> {
    return this.authService.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        return;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  canActivateChild(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<any> | Promise<any> {
    return this.canActivate(router, state);
  }
}
