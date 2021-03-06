import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loader';
export const SET_ERROR_MESSAGE = '[shared state] set error message';
export const DUMMY_ACTION = '[shared state] dummy action';

export const setLoader = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

export const dummyAction = createAction(DUMMY_ACTION);
