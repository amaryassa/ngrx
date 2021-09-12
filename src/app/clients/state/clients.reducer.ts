import { createReducer, Action, on } from '@ngrx/store';
import { ClientsState, initialState } from './clients.state';
import { deleteClientsSuccess } from './clients.actions';
import {
  loadClientsSuccess,
  addClientsSuccess,
  updateClientsSuccess,
} from './clients.actions';

const _clientsReducer = createReducer(
  initialState,
  on(loadClientsSuccess, (state, action) => {
    return {
      ...state,
      clients: action.clients,
    };
  }),
  on(addClientsSuccess, (state, action) => {
    let client = { ...action.client };

    return {
      ...state,
      clients: [...state.clients, client],
    };
  }),
  on(updateClientsSuccess, (state, action) => {
    let client = { ...action.client };
    const id = action.client.id;
    let updatedClients = [...state.clients];
    const indexOfUpdate = updatedClients.findIndex((client) => client.id == id);
    if (indexOfUpdate != -1) {
      const updatedClient_NEW = {
        ...updatedClients[+indexOfUpdate],
        ...action.client,
      };
      updatedClients[+indexOfUpdate] = updatedClient_NEW;
    }

    return {
      ...state,
      clients: [...updatedClients],
    };
  }),
  on(deleteClientsSuccess, (state, action) => {
    const updatedClients = state.clients.filter(
      (client) => client.id != action.id
    );

    return {
      ...state,
      clients: updatedClients,
    };
  })
);

export function clientsReducer(
  state: ClientsState | undefined,
  action: Action
) {
  return _clientsReducer(state, action);
}
