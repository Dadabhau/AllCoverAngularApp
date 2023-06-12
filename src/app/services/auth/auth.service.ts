import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
interface LoginUser {
  username: string;
  password: string;
  token: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Store token
  user = new Subject<User>();

  token = localStorage.getItem('token');
  apiUrl: string = 'https://fakestoreapi.com/auth/login';

  private authTokenKey = 'auth_token';

  constructor(private http: HttpClient, private route: Router) {}
  loggedIn = false;

  signUp(body: any): Observable<LoginUser[]> {
    return this.http
      .post<LoginUser[]>(`${this.apiUrl}`, body)
      .pipe(catchError(this.handleError));
  }
  logoutUser(): void {
    // Remove the authentication token from the local storage
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  isAuthenticatedUser() {
    // Check if the authentication token exists in the local storage
    if (this.token) {
      true;
    } else {
      false;
    }
    // return !!localStorage.getItem('token');
  }

  private handleAuthentication(
    username: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, id, token, expirationDate);
    this.user.next(user);
  }
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
