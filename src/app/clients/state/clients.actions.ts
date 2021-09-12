import { createAction, props } from '@ngrx/store';
import { Client } from '../../models/Client.model';
export const LOAD_CLIENTS_REQUEST = '[clients page] load clients request';
export const LOAD_CLIENTS_SUCCESS = '[clients page] load clients success';
export const LOAD_CLIENTS_FAILLURE = '[clients page] load clients faillure';

export const loadClientsRequest = createAction(LOAD_CLIENTS_REQUEST);
export const loadClientsSuccess = createAction(
  LOAD_CLIENTS_SUCCESS,
  props<{ clients: Client[] }>()
);
export const loadClientsFaillure = createAction(LOAD_CLIENTS_FAILLURE);
