import { createAction, props } from '@ngrx/store';
import { Client } from '../../models/Client.model';
export const LOAD_CLIENTS_REQUEST = '[clients page] load clients request';
export const LOAD_CLIENTS_SUCCESS = '[clients page] load clients success';
export const LOAD_CLIENTS_FAILLURE = '[clients page] load clients faillure';

export const ADD_CLIENTS_REQUEST = '[clients page] ADD clients request';
export const ADD_CLIENTS_SUCCESS = '[clients page] ADD clients success';
export const ADD_CLIENTS_FAILLURE = '[clients page] ADD clients faillure';

export const UPDATE_CLIENTS_REQUEST = '[clients page] UPDATE clients request';
export const UPDATE_CLIENTS_SUCCESS = '[clients page] UPDATE clients success';
export const UPDATE_CLIENTS_FAILLURE = '[clients page] UPDATE clients faillure';

export const DELETE_CLIENTS_REQUEST = '[clients page] DELETE clients request';
export const DELETE_CLIENTS_SUCCESS = '[clients page] DELETE clients success';
export const DELETE_CLIENTS_FAILLURE = '[clients page] DELETE clients faillure';

export const loadClientsRequest = createAction(LOAD_CLIENTS_REQUEST);
export const loadClientsSuccess = createAction(
  LOAD_CLIENTS_SUCCESS,
  props<{ clients: Client[] }>()
);
export const loadClientsFaillure = createAction(LOAD_CLIENTS_FAILLURE);

export const addClientsRequest = createAction(
  ADD_CLIENTS_REQUEST,
  props<{ client: Client }>()
);
export const addClientsSuccess = createAction(
  ADD_CLIENTS_SUCCESS,
  props<{ client: Client }>()
);
export const addClientsFaillure = createAction(ADD_CLIENTS_FAILLURE);

export const updateClientsRequest = createAction(
  UPDATE_CLIENTS_REQUEST,
  props<{ client: Client }>()
);
export const updateClientsSuccess = createAction(
  UPDATE_CLIENTS_SUCCESS,
  props<{ client: Client }>()
);
export const updateClientsFaillure = createAction(UPDATE_CLIENTS_FAILLURE);

export const deleteClientsRequest = createAction(
  DELETE_CLIENTS_REQUEST,
  props<{ id: number | string }>()
);
export const deleteClientsSuccess = createAction(
  DELETE_CLIENTS_SUCCESS,
  props<{ id: number | string }>()
);
export const deleteClientsFaillure = createAction(DELETE_CLIENTS_FAILLURE);
