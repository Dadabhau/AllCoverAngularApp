import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  // CANACTIVE
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<any> | Promise<any> {
    const isAuthenticated = localStorage.getItem('token') !== null; // Check if the user is authenticated
    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Deny access to the route
    }
  }
  // CANACTIVECHILD
  canActivateChild(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<any> | Promise<any> {
    return this.canActivate(router, state);
  }
}
