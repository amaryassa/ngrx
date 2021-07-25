import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const LOGIN_START = '[auth page] login START';
export const LOGIN_SUCCESS = '[auth page] login SUCCESS';
export const LOGIN_FAIl = '[auth page] login FAIL';

export const SIGNUP_START = '[auth page] signup START';
export const SIGNUP_SUCCESS = '[auth page] signup SUCCESS';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
