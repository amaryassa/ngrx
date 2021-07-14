import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, loginFail } from './auth.actions';
import { exhaustMap, map, mergeMap, delay } from 'rxjs';
import { AuthResponseData } from '../../models/AuthResponseData.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          // delay(3000),
          map((user) => {
            return loginSuccess({ user });
            // return loginFail();
          })
        );
      })
    );
  });
}
