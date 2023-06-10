import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = 'https://fakestoreapi.com/users';
  constructor(private http: HttpClient) {}
  getAlluser(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: any): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: any, body: any): Observable<User[]> {
    return this.http.put<User[]>(`${this.apiUrl}/${id}`, body);
  }

  addUser(body: any): Observable<User[]> {
    return this.http.post<User[]>(`${this.apiUrl}`, body);
  }

  deleteUser(id: any): Observable<User[]> {
    return this.http.delete<User[]>(`${this.apiUrl}/${id}`);
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
