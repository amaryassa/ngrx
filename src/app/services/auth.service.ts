import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  takeUntil,
  timeout,
  timer,
  delay,
  of,
  Observable,
  map,
  tap,
} from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        delay(3000)
        // tap((data) => console.log(data))
      );
    // return of('request data base').pipe(delay(3000));
    // return of('requet data base');
  }
  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        delay(3000),
        tap((data) => console.log(data))
      );
    // return of('request data base').pipe(delay(3000));
    // return of('requet data base');
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found.';
      case 'INVALID_PASSWORD':
        return 'invalid password.';
      case 'USER_DISABLED':
        return 'User disabled.';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.';
      default:
        return 'Unkonown error occured. Please try again';
    }
  }
}
