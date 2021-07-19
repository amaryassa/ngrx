import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, loginFail } from './auth.actions';
import { exhaustMap, map, mergeMap, delay, catchError, of } from 'rxjs';
import { AuthResponseData } from '../../models/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setLoader, setErrorMessage } from '../../store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
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
            // return loginFail();
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
}
