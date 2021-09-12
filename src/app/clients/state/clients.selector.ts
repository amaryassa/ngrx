import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ClientsState, CLIENTS_STATE_NAME } from './clients.state';

const getClientsState = createFeatureSelector<ClientsState>(CLIENTS_STATE_NAME);
export const getClients = createSelector(getClientsState, (state) => {
  return state.clients;
});

export const getClientById = (id: number | string) => {
  return createSelector(getClients, (clients) => {
    return clients ? clients.find((client) => client.id == id) : null;
  });
};
