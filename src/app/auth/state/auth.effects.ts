import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { exhaustMap, map, mergeMap, delay, catchError, of, tap } from 'rxjs';
import { AuthResponseData } from '../../models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          // delay(3000),
          map((data) => {
            this.store.dispatch(setLoader({ status: false }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errorResponse) => {
            const errorMessage = this.authService.getErrorMessage(
              errorResponse?.error?.error?.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        console.log('jsk signup');
        return this.authService.signup(action.email, action.password).pipe(
          // delay(3000),
          map((data) => {
            this.store.dispatch(setLoader({ status: false }));
            const user = this.authService.formatUser(data);
            return signupSuccess({ user });
          }),
          catchError((errorResponse) => {
            const errorMessage = this.authService.getErrorMessage(
              errorResponse?.error?.error?.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginSignupRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
