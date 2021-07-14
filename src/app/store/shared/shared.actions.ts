import { createAction, props } from '@ngrx/store';
export const SET_LOADING_ACTION = '[shared state] set loader';

export const setLoader = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);
