import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';
export const LOGIN_START = '[auth page] login START';
export const LOGIN_SUCCESS = '[auth page] login SUCCESS';
export const LOGIN_FAIl = '[auth page] login FAIL';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const loginFail = createAction(LOGIN_FAIl);
