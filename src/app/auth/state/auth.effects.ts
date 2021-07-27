import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginStart,
  loginSuccess,
  LOGOUT_ACTION,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { exhaustMap, map, mergeMap, delay, catchError, of, tap } from 'rxjs';
import { AuthResponseData } from '../../models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';
import { Router } from '@angular/router';
import { autoLogin } from './auth.actions';

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
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true });
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
        return this.authService.signup(action.email, action.password).pipe(
          // delay(3000),
          map((data) => {
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return signupSuccess({ user, redirect: true });
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
          this.store.dispatch(setLoader({ status: false }));
          // if (action.redirect) this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        if (user) {
          return of(loginSuccess({ user, redirect: false }));
        } else {
          return of();
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LOGOUT_ACTION),
        tap((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
